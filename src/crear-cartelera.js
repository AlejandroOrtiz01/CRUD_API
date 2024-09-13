import { API_HOST } from "./config.js";

const createForm = document.getElementById("create-cartelera-form");

createForm.addEventListener("submit", async (e) => {
  e.preventDefault(); // Evitar recargar la página inmediatamente

  // Obtener los datos del formulario
  const title = document.getElementById("title").value;
  const year = document.getElementById("year").value;
  const type = document.getElementById("type").value;
  const poster = document.getElementById("poster").value;
  const description = document.getElementById("description").value;
  const ubication = document.getElementById("ubication").value;

  // Crear un objeto para enviar al servidor
  const newMovie = {
    imdbID: Date.now().toString(), // Generar un ID único
    Title: title,
    Year: year,
    Type: type,
    Poster: poster,
    Estado: true,
    description: description,
    Ubication: ubication,
  };

  try {
    // Enviar la solicitud POST al servidor
    const response = await fetch(`${API_HOST}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMovie),
    });

    if (response.ok) {
      alert("Cartelera creada con éxito.");
      window.location.reload(); // Recargar la página
    } else {
      const errorData = await response.json();
      console.error("Error al crear la cartelera:", errorData);
      alert("No se pudo crear la cartelera.");
    }
  } catch (error) {
    console.error("Error al crear la cartelera:", error);
    alert("Error de conexión al crear la cartelera.");
  }
});
