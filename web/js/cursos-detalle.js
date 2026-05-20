const cargarDetalle = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const idCurso = urlParams.get('id');

    if (!idCurso) {
        mostrarError("No se especifico ningun ID.");
        return;
    }

    try {
        const respuesta = await fetch(`http://localhost:3000/api/cursos/${idCurso}`);

        if (respuesta.ok) {
            const curso = await respuesta.json();
            document.getElementById("det-id").innerText = curso.idCurso;
            document.getElementById("det-nombre").innerText = curso.nombre;
            document.getElementById("det-descripcion").innerText = curso.descripcion;
            document.getElementById("det-fecha").innerText = new Date(curso.fechaInicio).toLocaleDateString();
            document.getElementById("det-horas").innerText = `${curso.cantidadHoras} horas`;
            document.getElementById("det-inscriptos").innerText = `${curso.inscriptosMax} alumnos`;
            document.getElementById("card-detalle").style.display = "block";
        } else {
            const errorData = await respuesta.json();
            mostrarError(errorData.error || "Error al cargar el detalle del curso.");
        }
    } catch (error) {
        console.error(error);
        mostrarError("Error de conexion al servidor.");
    }
};

const mostrarError = (mensaje) => {
    const errorDiv = document.getElementById("error");
    errorDiv.innerHTML = `<p class="mb-0">${mensaje}</p><div class="mt-3"><a href="cursos.html" class="btn btn-outline-danger btn-sm">Volver al listado</a></div>`;
    errorDiv.style.display = "block";
};

document.addEventListener("DOMContentLoaded", cargarDetalle);