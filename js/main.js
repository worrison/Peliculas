//import films from './films.js' 
const URL_IMAGE = "http://image.tmdb.org/t/p/w185/";
const API_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '9ec2c792cfa94b0acb15cb59b0051990';
const API_POPULAR_URL = 'movie/popular';
const API_CATEGORIES = 'genre/movie/list';
let peliculas;
let idOption=document.querySelector('#ordenar');
window.addEventListener('load', onLoad);

// async function onLoad() {
//   let generos;
//   let btnbuscar = document.querySelector('#btnBuscar');
//   let inputText = document.getElementById("textBuscar");
//   inputText.addEventListener("keyup", function (event) {
//     document.getElementById("btnBuscar").click();
//   });
//   btnbuscar.addEventListener('click', buscar);

//   let films=await axios.get(API_URL + API_POPULAR_URL + '?api_key=' + API_KEY)
//     //console.log(response.data.results);
//     peliculas = films.data.results;
//     showFilms(peliculas);
//     //generos 
//     let genre=await axios.get(API_URL + API_CATEGORIES + '?api_key=' + API_KEY)
//       generos = genre.data.genres;
//       console.log(generos);
//       peliculas = peliculas.map((peliculas) => {
//         let arrayGeneros = peliculas['genre_ids'].map((id) => {
//           return generos.find((genero) => genero.id === id);
//         });
//         peliculas.genres = arrayGeneros; //asigna la propiedad genres cn los datos de arry generos
//         //peliculas["poster_path"]=URL_IMAGE + peliculas["poster_path"];
//         peliculas.stars = Math.round(peliculas["vote_average"] / 2);
//         return peliculas;
//       });
// }
async function onLoad() {
    let generos;
    let btnbuscar = document.querySelector('#btnBuscar');
	let inputText = document.getElementById("textBuscar");
	idOption.addEventListener("change",sortPeliculas);

    inputText.addEventListener("keyup", function (event) {
		document.getElementById("btnBuscar").click();
    });
    btnbuscar.addEventListener('click', buscar);
    //peliculas
    let films = axios.get(API_URL + API_POPULAR_URL + '?api_key=' + API_KEY)
    //generos 
    let genre = axios.get(API_URL + API_CATEGORIES + '?api_key=' + API_KEY)

    let result = await Promise.all([films, genre])
    try {
        peliculas = result[0].data.results;
        //sortPeliculas();
        showFilms(peliculas);
        generos = result[1].data.genres;

        peliculas = peliculas.map((peliculas) => {
            let arrayGeneros = peliculas['genre_ids'].map((id) => {
                return generos.find((genero) => genero.id === id);
            });
            peliculas.genres = arrayGeneros; //asigna la propiedad genres cn los datos de arry generos
            peliculas.stars = Math.round(peliculas["vote_average"] / 2);
            return peliculas;
        });

    } catch (error) {
        console.log("error")
    };
    sortPeliculas();
}

function showFilms(filmsToPrint) {
    let content = document.querySelector('#list-films');
    content.innerHTML = "";

    if (filmsToPrint.length <= 0) {
        content.innerHTML = "<h1>Ningun resultado válido</h1>";
    }

    for (let film of filmsToPrint) {
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
//ordenación alfabeticamente
function sortPeliculas() {
	let option=idOption.options[idOption.selectedIndex].value;
	console.log(idOption,option);

	switch (option) {
	  case "alfa":
			  peliculas.sort((a,b) => a.title > b.title? 1:-1);
			  showFilms(peliculas);
			  break;
	  case "date":
			  peliculas.sort((a,b) => a.release_date < b.release_date? 1:-1);
			  showFilms(peliculas);
			  break;
	  case "popu":
			  peliculas.sort((a,b) => a.popularity < b.popularity? 1:-1);
			  showFilms(peliculas);
			  break;
	   case "vote":
			  peliculas.sort((a,b) => a.vote_average < b.vote_average? 1:-1)
			  showFilms(peliculas);
			  break;
	  
	  default:
			  showFilms(peliculas);
		break;
	}
	
    //peliculas.sort((a,b) => a.title > b.title? 1:-1)//Ordenacion alfabetica:es lo mismo que lo de abajo
    //peliculas.sort((a,b) => a.release_date < b.release_date? 1:-1)//ordenacion por fecha de la mas actual a la mas antigua
    //peliculas.sort((a,b) => a.popularity < b.popularity? 1:-1)//ordenacion popularidad
    //peliculas.sort((a,b) => a.vote_average < b.vote_average? 1:-1)
    
    //   peliculas.sort(function (a, b) {
    //     if (a.title > b.title) {
    //       return 1;
    //     }
    //     if (a.title < b.title) {
    //       return -1;
    //     }
    //     return 0;
    //   });
    //   console.log(peliculas);
      //showFilms(peliculas);
}