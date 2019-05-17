import films from './films.js';
const IMG_PATH = 'http://image.tmdb.org/t/p/w185/';
window.addEventListener('load',load);
function load()
{
    let url=new URL(window.location.href);
    let result = url.searchParams.get('id');
    let pelicula = films.find((iteracion) => result == iteracion.id);
    let divFilm = document.createElement('article');
    divFilm.innerHTML = `
  <img src="${IMG_PATH}${pelicula.poster_path}" alt="${pelicula.title}">
    <p class="title">${pelicula.title}</p>
    <p class="ratio">${pelicula.vote_average}</p>
    <p class="overview">${pelicula.overview}</p>
    `;

    body.appendChild(divFilm);

}
