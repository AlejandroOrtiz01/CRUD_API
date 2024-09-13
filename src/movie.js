import { API_HOST } from "./config.js";

function redirectToMovieDetails(movieId) {
  const movieDetailsUrl = `./movie-details.html?id=${movieId}`;

  // Redirigir a la página de detalles de la película
  window.location.href = movieDetailsUrl;
}

function makeCard(movies) {
  const { imdbID, Poster, Title } = movies;
  const cardsContainer = document.querySelector(".cards-container");

  const cardContainer = document.createElement("div");
  cardContainer.className =
    "max-w-md mx-auto overflow-hidden rounded-lg shadow-lg";

  // Crear la imagen de la película
  const moviesImage = document.createElement("img");
  moviesImage.className = "object-cover w-full h-50 cursor-pointer";
  moviesImage.src = `${Poster}`;
  moviesImage.alt = "Imagen de la película";

  // Agregar evento de clic a la imagen
  moviesImage.addEventListener("click", () => {
    redirectToMovieDetails(imdbID);
  });

  // Titulo de la imagen
  const movieTitle = document.createElement("span");
  movieTitle.textContent = `${Title}`;

  // Añadir la imagen al contenedor de la tarjeta
  cardContainer.appendChild(moviesImage);
  //   cardContainer.appendChild(movieTitle);

  // Añadir la tarjeta al contenedor de tarjetas
  cardsContainer.appendChild(cardContainer);
}

async function getNewsMoviesApi(title = "") {
  // https://movie.azurewebsites.net/api/cartelera?title=&ubication=
  // const url = `${API_HOST}?title=&ubication=`;
  const url = `${API_HOST}?title=${encodeURIComponent(title)}&ubication=`;

  try {
    const response = await fetch(url);
    const results = await response.json();

    const cardsContainer = document.querySelector(".cards-container");
    cardsContainer.innerHTML = ""; // Limpiar las tarjetas anteriores
    
    for (let i = 0; i < results.length; i++) {
      makeCard(results[i]);
    }
  } catch (error) {
    console.log(error);
  }
}

// Escucha los cambios en el input de búsqueda
document.getElementById("search-input").addEventListener("input", (event) => {
  const searchTerm = event.target.value;
  getNewsMoviesApi(searchTerm); // Llamar a la API con el término de búsqueda
});

getNewsMoviesApi();