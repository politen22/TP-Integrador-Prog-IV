const cargarInscripciones = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }
    
    try {
        const respuesta = await fetch("http://localhost:3000/api/inscripciones", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (respuesta.status === 401) {
            localStorage.removeItem('token');
            window.location.href = 'login.html';
            return;
        }


        const datos = await respuesta.json();
        const tabla = document.getElementById("tbody");
        tabla.innerHTML = ""; 

        if (datos.length === 0) {
            tabla.innerHTML = `<tr><td colspan="6" class="text-center text-muted py-3">No hay inscripciones activas registradas.</td></tr>`;
            return;
        }

        datos.forEach(ins => {
            const fila = document.createElement("tr");

            const fechaFormateada = new Date(ins.fechaHoraInscripcion).toLocaleString('es-AR');
            fila.innerHTML = `
                <td class="text-center fw-bold">${ins.idInscripcion}</td>
                <td>${ins.cursoNombre}</td>
                <td>${ins.estudianteApellido}, ${ins.estudianteNombres}</td>
                <td class="text-center">${ins.estudianteDocumento}</td>
                <td class="text-center">${fechaFormateada}</td>
                <td class="text-center">
                    <button onclick="cancelarInscripcion(${ins.idInscripcion})" class="btn btn-danger btn-sm border-dark fw-bold" style="width: 110px;">Baja Inscripcion</button>
                </td>
            `;
            tabla.appendChild(fila);
        });
    } catch (error) {
        console.error(error);
        const errorDiv = document.getElementById("error");
        errorDiv.innerText = "Error de conexion al cargar las inscripciones.";
        errorDiv.style.display = "block";
    }
};

const cancelarInscripcion = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    if (!confirm(`¿Está seguro de que desea cancelar de forma definitiva la inscripción ID ${id}?`)) {
        return;
    }

    try {
        const respuesta = await fetch(`http://localhost:3000/api/inscripciones/${id}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (respuesta.ok) {
            alert("Inscripcion dada de baja con exito.");
            cargarInscripciones();
        } else {
            const errorData = await respuesta.json();
            alert(errorData.error || "No se pudo cancelar la inscripción.");
        }
    } catch (error) {
        console.error(error);
        alert("Error de conexion al intentar procesar la baja.");
    }
};

document.addEventListener("DOMContentLoaded", cargarInscripciones);