const cargarDetalle = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }
    const urlParams = new URLSearchParams(window.location.search);
    const idEstudiante = urlParams.get('id');

    if (!idEstudiante) {
        mostrarError("No se especificó ningún ID.");
        return;
    }

    try {
        const respuesta = await fetch(`http://localhost:3000/api/estudiantes/${idEstudiante}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (respuesta.status === 401) {
            localStorage.removeItem('token');
            window.location.href = 'login.html';
            return;
        }

        if (respuesta.ok) {
            const estudiante = await respuesta.json();
            
            document.getElementById("det-id").innerText = estudiante.idEstudiante;
            document.getElementById("det-nombre-completo").innerText = `${estudiante.apellido}, ${estudiante.nombres}`;
            document.getElementById("det-documento").innerText = estudiante.documento;
            document.getElementById("det-email").innerText = estudiante.email;
            
            const fechaFormateada = new Date(estudiante.fechaNacimiento).toLocaleDateString('es-AR');
            document.getElementById("det-fecha-nac").innerText = fechaFormateada;            
            document.getElementById("card-detalle").style.display = "block";
        } else {
            const errorData = await respuesta.json();
            mostrarError(errorData.error || "Error al cargar el detalle del estudiante.");
        }
    } catch (error) {
        console.error(error);
        mostrarError("Error de conexion al servidor.");
    }
};

const mostrarError = (mensaje) => {
    const errorDiv = document.getElementById("error");
    errorDiv.innerHTML = `<p class="mb-0">${mensaje}</p><div class="mt-3"><a href="estudiantes.html" class="btn btn-outline-danger btn-sm">Volver al listado</a></div>`;
    errorDiv.style.display = "block";
};

document.addEventListener("DOMContentLoaded", cargarDetalle);