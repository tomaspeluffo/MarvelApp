const id = document.location.search.replace(/^.*?\=/, '');

function render() {
   var url = `https://gateway.marvel.com:443/v1/public/characters/${id}?ts=1&apikey=b4941a700ed8f793be8facb530b0761a&hash=e809159539dce99b8cc72a57fe2e50af`;
   const container = document.querySelector('#hero-id-container');
   let contentHTML = '';
   fetch(url)
      .then((response) => response.json())
      .then((json) => {
         console.log(json.data.results[0]);
         for (const hero of json.data.results) {
            contentHTML += `
                    <div class="hero-detail">
                        <h2 class="hero-detail_name"> ${hero.name} </h2>
                        <img src="${hero.thumbnail.path}.jpg" alt="${hero.name}" class="hero-img-id">
                        <p class="hero-id_description">${hero.description}</p>
                    </div>
                `;
         }

         container.innerHTML = contentHTML;
      });
}
render();

$('.test-button').click(function () {
   console.log(id);
});
