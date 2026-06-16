const cargarCursos = async () => {
    const token = localStorage.getItem('token');
    if (!token){
        window.location.href = 'login.html'
        return;
    }

    try {
        const respuesta = await fetch("http://localhost:3000/api/cursos", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (respuesta.status === 401){
            localStorage.removeItem('token');
            window.location.href = 'login.html';
            return;
        }

        const datos = await respuesta.json();
        const tabla = document.getElementById("tbody");
        tabla.innerHTML = "";

        datos.forEach(curso => {
            const fila = document.createElement("tr");
            
            fila.innerHTML = `
                <td>${curso.idCurso}</td>
                <td>${curso.nombre}</td>
                <td>${curso.descripcion}</td>
                <td class="text-center">${new Date(curso.fechaInicio).toLocaleDateString()}</td>
                <td class="text-center">${curso.cantidadHoras}</td>
                <td class="text-center">${curso.inscriptosMax}</td>
                <td class="text-center">
                    <a href="cursos-detalle.html?id=${curso.idCurso}" class="btn btn-info" style="width:90px" title="Detalles">Detalles</a>
                    <a href="cursos-editar.html?id=${curso.idCurso}" class="btn btn-warning" style="width:90px" title="Editar">Editar</a>
                    <button onclick="eliminarCurso(${curso.idCurso})" class="btn btn-danger" style="width:90px" title="Eliminar">Eliminar</button>
                </td>
                <td>
            `;
            tabla.appendChild(fila);
        });
    } catch (error) {
        document.getElementById("error").innerHTML = "<p>Error al cargar los cursos.</p>";
        document.getElementById("error").style.display = "block";
    }
}

window.eliminarCurso = async (id) => {
    const confirmacion = confirm(`¿Estas seguro de queres eliminar el curso con ID ${id}?`);
    
    if (confirmacion) {
        try {
            const respuesta = await fetch(`http://localhost:3000/api/cursos/${id}`, {
                method: 'DELETE',
                headers: {
                    "Authorization" : `Bearer ${token}`
                }
            });

            if (respuesta.ok) {
                alert("Curso eliminado con exito");
                window.location.reload(); 
            } else {
                alert("Hubo un error al intentar eliminar el curso.");
            }
        } catch (error) {
            console.error(error);
            alert("Error de conexion con el servidor.");
        }
    }
};

document.addEventListener("DOMContentLoaded", cargarCursos);