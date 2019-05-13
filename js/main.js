import films from './films.js'
let urlImage="http://image.tmdb.org/t/p/w185/";
window.addEventListener('load',event)
{
    for (let film of films) {
      console.log(film.vote_average);
      console.log(film.release_date);
      let content=document.querySelector('#list-films');
      let card=document.createElement("div");
      card.classList.add('card');
      content.appendChild(card);
      card.innerHTML=`<div class="image"><img src="${urlImage+film.poster_path}"></div>
      <div class="title"><h2>${film.title}</h2></div><div class="vote"><p>${film.vote_average}</p><p>${film.release_date}</p></div>`;
      //content.appendChild(titleFilm);
  }
}