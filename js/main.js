//import films from './films.js'
const URL_IMAGE="http://image.tmdb.org/t/p/w185/";
const API_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '9ec2c792cfa94b0acb15cb59b0051990';
const API_POPULAR_URL = 'movie/popular';
const API_CATEGORIES = 'genre/movie/list';
let peliculas;
/*https://api.themoviedb.org/3/genre/movie/list?api_key=9ec2c792cfa94b0acb15cb59b0051990*/


window.addEventListener('load',onLoad);
function onLoad()
{
  let generos;
  let btnbuscar=document.querySelector('#btnBuscar');
  btnbuscar.addEventListener('click',buscar);
  //showFilms(films);
  axios.get(API_URL + API_POPULAR_URL + '?api_key='+ API_KEY).then((response)=>
  {
    //console.log(response.data.results);
    peliculas=response.data.results;
    showFilms(peliculas);
    //generos 
      axios.get(API_URL + API_CATEGORIES + '?api_key='+ API_KEY).then((response)=>
      {
        generos=response.data.genres;
        console.log(generos);
        peliculas=peliculas.map((peliculas)=>{
          let arrayGeneros=peliculas['genre_ids'].map((id)=>{
            return generos.find((genero)=>genero.id===id);
          });
          peliculas.genres=arrayGeneros;//asigna la propiedad genres cn los datos de arry generos
          //peliculas["poster_path"]=URL_IMAGE + peliculas["poster_path"];
          peliculas.stars=Math.round(peliculas["vote_average"]/2);
          return peliculas;
        });
      }).catch((err)=>{
        console.log(err.message,'ha habido un error');
      });
  });
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
      console.log(film.title);
        let card=document.createElement("div");
        card.classList.add('card');
        content.appendChild(card);
        let{poster_path:image,title,vote_average:vote,release_date:date}=film;//desestructuracion de objetos.
        card.innerHTML=`<div class="image"><img src="${URL_IMAGE+image}"></div>
        <div class="title"><h2>${title}</h2></div><div class="vote"><p>${vote}</p><p>${date.substr(0,4)}</p></div>`; 
    }
  
}
function buscar()
{
  let textoBuscar=document.querySelector('#textBuscar').value;
  let resultBusqueda=peliculas.filter(pelicula =>pelicula.title.toLowerCase().includes(textoBuscar.toLowerCase()));
  console.log(resultBusqueda);
  showFilms(resultBusqueda);
}

