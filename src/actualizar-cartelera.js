import { API_HOST } from "./config.js";

// Obtener los parámetros de la URL
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("id");

// Función para cargar los datos de la cartelera al formulario
async function loadMovieData(movieId) {
  const url = `${API_HOST}?imdbID=${movieId}`;

  try {
    const response = await fetch(url);
    const movie = await response.json();

    // Rellenar los campos del formulario con los datos actuales
    document.getElementById("movie-title").value = movie.Title;
    document.getElementById("movie-year").value = movie.Year;
    document.getElementById("movie-type").value = movie.Type;
    document.getElementById("movie-poster").value = movie.Poster;
    document.getElementById("movie-description").value = movie.description;
    document.getElementById("movie-ubication").value = movie.Ubication;
  } catch (error) {
    console.log("Error al cargar los datos de la película:", error);
  }
}

// Función para actualizar la cartelera
async function updateMovie(movieId) {
  const url = `${API_HOST}?imdbID=${movieId}`;

  // Obtener los datos del formulario
  const updatedMovie = {
    imdbID: movieId,
    Title: document.getElementById("movie-title").value,
    Year: document.getElementById("movie-year").value,
    Type: document.getElementById("movie-type").value,
    Poster: document.getElementById("movie-poster").value,
    description: document.getElementById("movie-description").value,
    Ubication: document.getElementById("movie-ubication").value,
    Estado: true,
  };

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedMovie),
    });

    if (response.ok) {
      alert("Cartelera actualizada con éxito.");
      window.location.href = `movie-details.html?id=${movieId}`;
    } else {
      const errorData = await response.json();
      console.log("Error al actualizar la película:", errorData);
      alert("No se pudo actualizar la cartelera.");
    }
  } catch (error) {
    console.log("Error al actualizar la película:", error);
  }
}

// Evento de clic para guardar cambios
document.getElementById("save-button").addEventListener("click", () => {
  if (confirm("¿Estás seguro de que deseas guardar los cambios?")) {
    updateMovie(movieId);
  }
});

// Cargar los datos de la película al cargar la página
if (movieId) {
  loadMovieData(movieId);
} else {
  console.log("ID de película no encontrado en la URL.");
}
