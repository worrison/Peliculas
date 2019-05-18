const URL_IMAGE = "http://image.tmdb.org/t/p/w185/";
const API_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '9ec2c792cfa94b0acb15cb59b0051990';
const API_DETAILS = 'movie/';
let film;
window.addEventListener('load',onLoad);


function onLoad()
{
    let url=new URL(window.location.href);
    let paramIdFilm = url.searchParams.get('id');
    console.log(paramIdFilm);

    axios.get(API_URL + API_DETAILS + paramIdFilm + '?api_key=' + API_KEY).then((response) => {
      console.log(response.data);
      film=response.data;
      showDetails();

    }).catch((err) => {
      console.log(err.message, 'ha habido un error');
    });
}


function showDetails()
{
  let body = document.querySelector('body');
  let divFilm = document.createElement('article');
    divFilm.innerHTML = `
  <img src="${URL_IMAGE}${film.poster_path}" alt="${film.title}">
    <p class="title">${film.title}</p>
    <p class="ratio">${film.vote_average}</p>
    <p class="overview">${film.overview}</p>
    `;
    body.appendChild(divFilm);
}
