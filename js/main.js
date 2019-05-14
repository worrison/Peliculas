import films from './films.js'
const URL_IMAGE="http://image.tmdb.org/t/p/w185/";
window.addEventListener('load',onLoad);
function onLoad()
{
  let btnbuscar=document.querySelector('#btnBuscar');
  btnbuscar.addEventListener('click',buscar);
  showFilms(films);
}

function showFilms(filmsToPrint)
{
  console.log(filmsToPrint);
  let content=document.querySelector('#list-films');
  content.innerHTML="";
  if(filmsToPrint.length<=0)
  {
    content.innerHTML="<h1>Ningun resultado válido</h1>";
  }
  for (let film of filmsToPrint) 
    {
        let card=document.createElement("div");
        card.classList.add('card');
        content.appendChild(card);
        let{poster_path:image,title,vote_average:vote,release_date:date}=film;//desestructuracion de objetos.
        card.innerHTML=`<div class="image"><img src="${URL_IMAGE+image}"></div>
        <div class="title"><h2>${title}</h2></div><div class="vote"><p>${vote}</p><p>${date.substr(0,4)}</p></div>`;
        /*card.innerHTML=`<img src="${URL_IMAGE+image}">
       <h2>${title}</h2><p>${vote}</p><p>${date.substr(0,4)}</p>`;*/
      
    }
  
}
function buscar()
{
  let textoBuscar=document.querySelector('#textBuscar').value;
  let resultBusqueda=films.filter(pelicula =>pelicula.title.toLowerCase().includes(textoBuscar.toLowerCase()));
  showFilms(resultBusqueda);
}
