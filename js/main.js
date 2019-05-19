//import films from './films.js' 
const URL_IMAGE = "http://image.tmdb.org/t/p/w185/";
const API_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '9ec2c792cfa94b0acb15cb59b0051990';
const API_POPULAR_URL = 'movie/popular';
const API_CATEGORIES = 'genre/movie/list';
let peliculas;

window.addEventListener('load', onLoad);

function onLoad() {
  let generos;
  let btnbuscar = document.querySelector('#btnBuscar');
  let inputText = document.getElementById("textBuscar");
  inputText.addEventListener("keyup", function (event) {
    document.getElementById("btnBuscar").click();
  });
  btnbuscar.addEventListener('click', buscar);

  axios.get(API_URL + API_POPULAR_URL + '?api_key=' + API_KEY).then((response) => {
    //console.log(response.data.results);
    peliculas = response.data.results;
    showFilms(peliculas);
    //generos 
    axios.get(API_URL + API_CATEGORIES + '?api_key=' + API_KEY).then((response) => {
      generos = response.data.genres;
      console.log(generos);
      peliculas = peliculas.map((peliculas) => {
        let arrayGeneros = peliculas['genre_ids'].map((id) => {
          return generos.find((genero) => genero.id === id);
        });
        peliculas.genres = arrayGeneros; //asigna la propiedad genres cn los datos de arry generos
        //peliculas["poster_path"]=URL_IMAGE + peliculas["poster_path"];
        peliculas.stars = Math.round(peliculas["vote_average"] / 2);
        return peliculas;
      });
    }).catch((err) => {
      console.log(err.message, 'ha habido un error');
    });
  });
}


function showFilms(filmsToPrint) {
  console.log(filmsToPrint);
  let content = document.querySelector('#list-films');
  content.innerHTML = "";

  if (filmsToPrint.length <= 0) {
    content.innerHTML = "<h1>Ningun resultado válido</h1>";
  }

  for (let film of filmsToPrint) {
    console.log(film.title);
    let card = document.createElement("div");
    card.classList.add('card');
    let {
      id: id,
      poster_path: image,
      title,
      vote_average: vote,
      release_date: date
    } = film; //desestructuracion de objetos.

    let detalle = "detalle.html?id=" + id;
    
    card.innerHTML = `<a href="${detalle}">
        <img src="${URL_IMAGE+image}"class="card-img-top">
        <div class="card-body">
          <p class="card-text text-light"><i class="fa fa-star"></i>${vote}</p>
          <p class="card-text text-light text-center">${title}</p>
          <p class="card-text text-light">${date.substr(0,4)}</p>
        </div>
        </a>`;
    content.appendChild(card);
  }
}

function buscar() {
  let textoBuscar = document.querySelector('#textBuscar').value.toLowerCase();
  let resultBusqueda = peliculas.filter(pelicula => pelicula.title.toLowerCase().includes(textoBuscar));
  showFilms(resultBusqueda);
}