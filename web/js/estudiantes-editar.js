const urlParams = new URLSearchParams(window.location.search);
const idEstudiante = urlParams.get('id');

const cargarDatosActuales = async () => {
    if (!idEstudiante) {
        mostrarError("No se especificó ningún ID");
        return;
    }

    try {
        const respuesta = await fetch(`http://localhost:3000/api/estudiantes/${idEstudiante}`);

        if (respuesta.ok) {
            const estudiante = await respuesta.json();

            document.getElementById("idEstudiante").value = estudiante.idEstudiante;
            document.getElementById("nombres").value = estudiante.nombres;
            document.getElementById("apellido").value = estudiante.apellido;
            document.getElementById("documento").value = estudiante.documento;
            document.getElementById("email").value = estudiante.email;
            
            const fechaFormateada = new Date(estudiante.fechaNacimiento).toISOString().split('T')[0];
            document.getElementById("fecha_nacimiento").value = fechaFormateada;            
            
            document.getElementById("formulario-edicion").style.display = "block";
        } else {
            mostrarError("Error al cargar los datos del estudiante.");
        }
    } catch (error) {
        mostrarError("Error de conexión con el servidor.");
    }
};

const manejarEnvio = async (evt) => {
    evt.preventDefault();
    evt.stopPropagation();

    const objModificado = {
        nombres: document.getElementById("nombres").value,
        apellido: document.getElementById("apellido").value,
        documento: document.getElementById("documento").value,
        email: document.getElementById("email").value,
        fecha_nacimiento: document.getElementById("fecha_nacimiento").value
    };

    try {
        const respuesta = await fetch(`http://localhost:3000/api/estudiantes/${idEstudiante}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(objModificado)
        });

        if (respuesta.ok) {
            alert("¡Estudiante actualizado con exito!");
            window.location.href = "estudiantes.html";
        } else {
            const errorData = await respuesta.json();
            let mensajeError = "";
            
            if (errorData.errores) {
                mensajeError = errorData.errores.map(e => e.msg).join('<br>');
            } else if (errorData.error) {
                mensajeError = errorData.error;
            } else {
                mensajeError = "Ocurrio un error desconocido.";
            }
            mostrarError(mensajeError);
        }
    } catch (error) {
        mostrarError("Error de conexion al intentar guardar los cambios.");
    }
};

const mostrarError = (mensaje) => {
    const errorDiv = document.getElementById("error");
    errorDiv.innerHTML = `<p class="mb-0">${mensaje}</p>`;
    errorDiv.style.display = "block";
};

document.addEventListener("DOMContentLoaded", () => {
    cargarDatosActuales();
    document.getElementById("formulario-edicion").addEventListener("submit", manejarEnvio);
});