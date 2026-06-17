const cargarSelectores = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    try {
        const [resCursos, resEstudiantes] = await Promise.all([
            fetch("http://localhost:3000/api/cursos?limit=100", {
                headers: { "Authorization": `Bearer ${token}` }
            }),
            fetch("http://localhost:3000/api/estudiantes?limit=100", {
                headers: { "Authorization": `Bearer ${token}` }
            })
        ]);

        if (resCursos.status === 401 || resEstudiantes.status === 401) {
            localStorage.removeItem('token');
            window.location.href = 'login.html';
            return;
        }

        const cursos = await resCursos.json();
        const estudiantes = await resEstudiantes.json();

        const selectCurso = document.getElementById("id_curso");
        selectCurso.innerHTML = '<option value="">-- Seleccione un Curso --</option>';
        cursos.forEach(c => {
            const opt = document.createElement("option");
            opt.value = c.idCurso;
            opt.innerText = c.nombre;
            selectCurso.appendChild(opt);
        });

        const selectEstudiante = document.getElementById("id_estudiante");
        selectEstudiante.innerHTML = '<option value="">-- Seleccione un Estudiante --</option>';
        estudiantes.forEach(e => {
            const opt = document.createElement("option");
            opt.value = e.idEstudiante;
            opt.innerText = `${e.apellido}, ${e.nombres} (DNI: ${e.documento})`;
            selectEstudiante.appendChild(opt);
        });

    } catch (error) {
        console.error(error);
        mostrarError("Error al inicializar los formularios. Verifique la API");
    }
};

const guardarInscripcion = async (evt) => {
    evt.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    const idCurso = document.getElementById("id_curso").value;
    const idEstudiante = document.getElementById("id_estudiante").value;

    if (!idCurso || !idEstudiante) {
        mostrarError("Debe seleccionar obligatoriamente un curso y un estudiante.");
        return;
    }

    const payload = {
        id_curso: parseInt(idCurso),
        id_estudiante: parseInt(idEstudiante)
    };

    try {
        const respuesta = await fetch("http://localhost:3000/api/inscripciones", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        });

        if (respuesta.ok) {
            alert("¡Inscripcion realizada con exito");
            window.location.href = "inscripciones.html";
        } else {
            const errorData = await respuesta.json();
            mostrarError(errorData.error || "Ocurrio un error al procesar la inscripcion.");
        }
    } catch (error) {
        console.error(error);
        mostrarError("Error de comunicacion con el servidor backend.");
    }
};

const mostrarError = (mensaje) => {
    const errorDiv = document.getElementById("error");
    errorDiv.innerHTML = `<p class="mb-0 fw-bold">${mensaje}</p>`;
    errorDiv.style.display = "block";
};

document.addEventListener("DOMContentLoaded", () => {
    cargarSelectores();
    document.getElementById("formulario-inscripcion").addEventListener("submit", guardarInscripcion);
});