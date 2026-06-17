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
                <td class="align-middle">${curso.idCurso}</td>
                <td class="align-middle">${curso.nombre}</td>
                <td class="align-middle">${curso.descripcion}</td>
                <td class="align-middle text-center">${new Date(curso.fechaInicio).toLocaleDateString()}</td>
                <td class="align-middle text-center">${curso.cantidadHoras}</td>
                <td class="align-middle text-center">${curso.inscriptosMax}</td>
                <td class="align-middle text-center">
                    <a href="cursos-detalle.html?id=${curso.idCurso}" class="btn btn-info text-white" style="width:90px" title="Detalles">Detalles</a>
                    <a href="cursos-editar.html?id=${curso.idCurso}" class="btn btn-warning" style="width:90px" title="Editar">Editar</a>
                    <button onclick="eliminarCurso(${curso.idCurso})" class="btn btn-danger" style="width:90px" title="Eliminar">Eliminar</button>
                </td>
                `; 
            tabla.appendChild(fila);
        });
    } catch (error) {
        document.getElementById("error").innerHTML = "<p>Error al cargar los cursos.</p>";
        document.getElementById("error").style.display = "block";
    }
}

window.eliminarCurso = async (id) => {
    const token = localStorage.getItem('token');
    if (!token){
        window.location.href = 'login.html';
        return;
    }

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
                const errorData = await respuesta.json();
                alert(errorData.error || "Hubo un error al intentar eliminar el curso.");
            }
        } catch (error) {
            console.error(error);
            alert("Error de conexion con el servidor.");
        }
    }
};

document.addEventListener("DOMContentLoaded", cargarCursos);