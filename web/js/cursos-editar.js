const urlParams = new URLSearchParams(window.location.search);
const idCurso = urlParams.get('id');

const cargarDatosActuales = async () => {
    const token = localStorage.getItem('token');
    if(!token){
        window.location.href = 'login.html'
        return;
    }
    if (!idCurso) {
        mostrarError("No se especifico ningun ID");
        return;
    }

    try {
        const respuesta = await fetch(`http://localhost:3000/api/cursos/${idCurso}`, {
        headers:{
            "Authorization": `Bearer ${token}`
        }
    });

    if (respuesta.status === 401){
        localStorage.removeItem('token');
        window.location.href = 'login.html';
        return;
    }

        if (respuesta.ok) {
            const curso = await respuesta.json();

            document.getElementById("idCurso").value = curso.idCurso;
            document.getElementById("nombre").value = curso.nombre;
            document.getElementById("descripcion").value = curso.descripcion;
            
            const fechaFormateada = new Date(curso.fechaInicio).toISOString().split('T')[0];
            document.getElementById("fechaInicio").value = fechaFormateada;            
            document.getElementById("cantidadHoras").value = curso.cantidadHoras;
            document.getElementById("cantidadInscriptos").value = curso.inscriptosMax;
            document.getElementById("formulario-edicion").style.display = "block";
        } else {
            mostrarError("Error al cargar los datos del curso.");
        }
    } catch (error) {
        mostrarError("Error de conexion con el servidor.");
    }
};

const manejarEnvio = async (evt) => {
    evt.preventDefault();
    evt.stopPropagation();

    const token = localStorage.getItem('token');
    if(!token){
        window.location.href = 'login.html';
        return;
    }

    const objModificado = {
        nombre: document.getElementById("nombre").value,
        descripcion: document.getElementById("descripcion").value,
        fechaInicio: document.getElementById("fechaInicio").value,
        cantidadHoras: document.getElementById("cantidadHoras").value,
        cantidadInscriptos: document.getElementById("cantidadInscriptos").value
    };

    try {
        const respuesta = await fetch(`http://localhost:3000/api/cursos/${idCurso}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(objModificado)
        });

        if (respuesta.ok) {
            alert("¡Curso actualizado con exito!");
            window.location.href = "cursos.html";
        } else {
            const errorData = await respuesta.json();
            mostrarError(errorData.error);
        }
    } catch (error) {
        mostrarError("Error de conexion al intentar guardar los cambios.");
    }
};

const mostrarError = (mensaje) => {
    const errorDiv = document.getElementById("error");
    errorDiv.innerHTML = `<p>${mensaje}</p>`;
    errorDiv.style.display = "block";
};

document.addEventListener("DOMContentLoaded", () => {
    cargarDatosActuales();
    document.getElementById("formulario-edicion").addEventListener("submit", manejarEnvio);
});