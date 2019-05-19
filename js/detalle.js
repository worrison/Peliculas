const URL_IMAGE_LARGE = "http://image.tmdb.org/t/p/w600_and_h900_bestv2/";//ampliada
const URL_IMAGE_BACKGROUND = "http://image.tmdb.org/t/p/w1400_and_h450_face/";//imagen de fondo
const URL_IMAGE = "http://image.tmdb.org/t/p/w300_and_h450_bestv2/";//Imagen normal para el detalle
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
  let detailFilm = document.querySelector('#detailFilm');
  let divFilm = document.createElement('article');
  detailFilm.style.backgroundImage='radial-gradient(circle at 20% 50%, rgba(3.14%, 14.51%, 40.39%, 0.98) 0%, rgba(3.14%, 14.51%, 40.39%, 0.88) 100%),url('+URL_IMAGE_BACKGROUND+''+film.poster_path+')';
  divFilm.setAttribute("class", "container");//añado la clase container al elemento article
  divFilm.innerHTML = `
  <div class="img-fluid"><img src="${URL_IMAGE}${film.poster_path}" alt="${film.title}"></div>
  <div class="detail"><h1 class="title">${film.title}<span>(${film.release_date.substr(0,4)})</span></h1>
  <p class="ratio"><i class="fa fa-star"></i>${film.vote_average}</p>
  <p class="overview">${film.overview}</p></div>
  `;
  detailFilm.appendChild(divFilm);
}
