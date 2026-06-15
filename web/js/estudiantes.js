const cargarEstudiantes = async () => {
    try {
        const respuesta = await fetch("http://localhost:3000/api/estudiantes");
        const datos = await respuesta.json();

        const tabla = document.getElementById("tbody");
        tabla.innerHTML = ""; 

        datos.forEach(estudiante => {
            const fila = document.createElement("tr");
            
            fila.innerHTML = `
                <td class="align-middle">${estudiante.idEstudiante}</td>
                <td class="align-middle">${estudiante.nombres}</td> 
                <td class="align-middle">${estudiante.apellido}</td>
                <td class="align-middle">${estudiante.documento}</td> 
                <td class="align-middle">${estudiante.email}</td>
                <td class="align-middle text-center">${new Date(estudiante.fechaNacimiento).toLocaleDateString('es-AR')}</td>
                <td class="text-center align-middle">
                    <div class="d-flex justify-content-center gap-2">
                        <a href="estudiantes-detalle.html?id=${estudiante.idEstudiante}" class="btn btn-info text-white" style="width: 90px;" title="Detalles">Detalles</a>
                        <a href="estudiantes-editar.html?id=${estudiante.idEstudiante}" class="btn btn-warning" style="width: 90px;" title="Editar">Editar</a>
                        <button onclick="eliminarEstudiante(${estudiante.idEstudiante})" class="btn btn-danger" style="width: 90px;" title="Eliminar">Eliminar</button>
                    </div>
                </td>
            `;
            tabla.appendChild(fila);
        });
    } catch (error) {
        document.getElementById("error").innerHTML = "<p>Error al cargar los estudiantes.</p>";
        document.getElementById("error").style.display = "block";
    }
}

window.eliminarEstudiante = async (id) => {
    const confirmacion = confirm(`¿Seguro que deseas borrar el estudiante con el ID: ${id}?`);
    
    if (confirmacion) {
        try {
            const respuesta = await fetch(`http://localhost:3000/api/estudiantes/${id}`, {
                method: 'DELETE'
            });

            if (respuesta.ok) {
                alert("Estudiante eliminado con exito");
                window.location.reload(); 
            } else {
                alert("Hubo un error al intentar eliminar el estudiante.");
            }
        } catch (error) {
            console.error(error);
            alert("Error de conexión con el servidor.");
        }
    }
};

document.addEventListener("DOMContentLoaded", cargarEstudiantes);