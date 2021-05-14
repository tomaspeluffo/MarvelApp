const inputValue = document.querySelector('input[name=buscador]');
// name=${inputValue.value}

function render() {
   var url = `https://gateway.marvel.com:443/v1/public/characters?ts=1&&nameStartsWith=${inputValue.value}&apikey=b4941a700ed8f793be8facb530b0761a&hash=e809159539dce99b8cc72a57fe2e50af`;

   const container = document.querySelector('#card-search-container');
   let contentHTML = '';

   fetch(url)
      .then((response) => response.json())
      .then((json) => {
         console.log(json);
         if (json.data.results.length > 0) {
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
         } else {
            contentHTML += `
               <div class="text-container">
                       <h3>No se han encontrado Super Heroes intente denuevo </h3>
                </div>
               `;
         }
         container.innerHTML = contentHTML;
      });
}

$('.buscar-button').click(function () {
   if (inputValue.value) {
      console.log(inputValue.value);
      render();
   } else {
      return;
   }
});

$(document).on('click', '.hero-card', function () {
   const id = $(this).attr('id');
   console.log(id);
   window.document.location = './herodetail.html' + '?id=' + id;
});
