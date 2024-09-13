import { API_HOST } from "./config.js";

// Extraer el ID de la película de la URL
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("id");

// Verificar si el ID está presente en la URL
if (movieId) {
  // Llamar a la función getMovieIdApi con el ID de la película
  getMovieIdApi(movieId);
} else {
  console.log("ID de película no encontrado en la URL.");
}

function makeCard(movies) {
  const {
    imdbID,
    description,
    Poster,
    Title,
    Ubication,
    Type,
    Year,
  } = movies;
  const cardsContainer = document.querySelector(".cards-container");

  const imageContainer = document.createElement("div");
  imageContainer.className = "w-100";

  const moviesImage = document.createElement("img");
  moviesImage.className = "object-cover w-full rounded-lg shadow-lg";
  moviesImage.src = `${Poster}`;
  moviesImage.alt = "Imagen de la película";

  const movieContainer = document.createElement("div");
  movieContainer.className = "w-full pl-8";

  const movieTitle = document.createElement("h1");
  movieTitle.textContent = `${Title}`;
  movieTitle.className = "text-3xl font-bold mb-4";

  const movieDescription = document.createElement("p");
  movieDescription.textContent = `${description}`;
  movieDescription.className = "text-gray-400 mb-4";

  const movieEtiqueta = document.createElement("div");
  movieEtiqueta.className = "mb-4";

  const movieDuration = document.createElement("span");
  movieDuration.textContent = `Ubicación: ${Ubication}`;
  movieDuration.className = "flex items-center text-gray-400";

  const movieGenero = document.createElement("span");
  movieGenero.textContent = `Género: ${Type}`;
  movieGenero.className = "flex items-center text-gray-400";

  const movieEstreno = document.createElement("span");
  movieEstreno.textContent = `Año: ${Year}`;
  movieEstreno.className = "flex items-center text-gray-400";

  imageContainer.appendChild(moviesImage);

  movieContainer.appendChild(movieTitle);
  movieContainer.appendChild(movieDescription);
  movieContainer.appendChild(movieEtiqueta);

  movieEtiqueta.appendChild(movieDuration);
  movieEtiqueta.appendChild(movieGenero);
  movieEtiqueta.appendChild(movieEstreno);

  // Añadir contenido
  cardsContainer.appendChild(imageContainer);
  cardsContainer.appendChild(movieContainer);
}

async function getMovieIdApi(movieId) {
  const url = `${API_HOST}?imdbID=${movieId}`;

  try {
    const response = await fetch(url);
    const result = await response.json();

    makeCard(result);
  } catch (error) {
    console.log(error);
  }
}

// Función para eliminar la película
async function deleteMovie(movieId) {
  const url = `${API_HOST}?imdbID=${movieId}`;

  try {
    const response = await fetch(url, {
      method: 'DELETE'
    });

    if (response.ok) {
      alert("Película eliminada con éxito.");
      window.location.href = "index.html"; // Redirigir a la página principal
    } else {
      const errorData = await response.json();
      console.log("Error al eliminar la película:", errorData);
      alert("No se pudo eliminar la película.");
    }
  } catch (error) {
    console.log("Error al eliminar la película:", error);
  }
}

// Añadir un evento de clic al botón de eliminar
document.getElementById("delete-button").addEventListener("click", () => {
  if (confirm("¿Estás seguro de que deseas eliminar esta película?")) {
    deleteMovie(movieId);
  }
});