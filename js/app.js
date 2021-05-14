var limit = 20;
var offset = 0;
var curentPage = 1;
var totalPages = '';

function render(limit, offset) {
   var url = `https://gateway.marvel.com:443/v1/public/characters?ts=1&limit=${limit}&offset=${offset}&apikey=b4941a700ed8f793be8facb530b0761a&hash=e809159539dce99b8cc72a57fe2e50af`;
   const container = document.querySelector('#cards-container');
   let contentHTML = '';
   fetch(url)
      .then((response) => response.json())
      .then((json) => {
         totalPages = json.data.total / 20;
         console.log(json);
         for (const hero of json.data.results) {
            contentHTML += `
               <div class="hero-card" id=${hero.id}>
                    <div class="img-thumbnail__container">  
                        <img src=${hero.thumbnail.path}.${hero.thumbnail.extension} alt=${hero.name} class="img-thumbnail">
                    </div>
                    <div class="hero-name__container"> 
                    <h3 class="hero-name">${hero.name}</h3>
                    </div>
                </div>
               `;
         }

         container.innerHTML = contentHTML;
      });
}

render(limit, offset);

$('.previous-button').click(function () {
   if (curentPage > 1) {
      curentPage -= 1;
      offset -= 20;
   }
   render(limit, offset);
});

$('.next-button').click(function () {
   if (Math.ceil(totalPages) >= curentPage) {
      curentPage = curentPage + 1;
      offset = offset + 20;
      render(limit, offset);
   } else {
      return;
   }
});

$(document).on('click', '.hero-card', function () {
   const id = $(this).attr('id');
   console.log(id);
   window.document.location = './herodetail.html' + '?id=' + id;
});
