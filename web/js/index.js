const cargarDashboard = async () => {
    const token = localStorage.getItem('token');
    
    const panelControl = document.getElementById("panel-control");
    const msjPublico = document.getElementById("mensaje-publico");

    if (!token) {
        panelControl.style.display = "none";
        msjPublico.style.display = "block";
        return;
    }

    panelControl.style.display = "block";
    msjPublico.style.display = "none";

    try {
        const respuesta = await fetch("http://localhost:3000/api/dashboard", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (respuesta.status === 401) {
            localStorage.removeItem('token');
            window.location.reload();
            return;
        }

        const datos = await respuesta.json();

        document.getElementById("dash-estudiantes").innerText = datos.totalEstudiantes;
        document.getElementById("dash-cursos").innerText = datos.totalCursos;
        document.getElementById("dash-borradores").innerText = datos.totalBorradores || 0;
        
        const listaCursos = document.getElementById("lista-cursos-activos");
        listaCursos.innerHTML = ""; 

        if (datos.cursosActivos.length === 0) {
            listaCursos.innerHTML = '<li class="list-group-item text-muted text-center py-3">No hay cursos disponibles en este momento.</li>';
        } else {
            datos.cursosActivos.forEach(curso => {
                const li = document.createElement("li");
                li.className = "list-group-item d-flex justify-content-between align-items-center py-3";
                li.innerHTML = `
                    <div>
                        <h6 class="mb-0 fw-bold">${curso.nombre}</h6>
                        <small class="text-muted">${curso.descripcion}</small>
                    </div>
                    <a href="cursos-detalle.html?id=${curso.id_curso}" class="btn btn-sm btn-outline-dark fw-bold px-3">Ver detalles</a>
                `;
                listaCursos.appendChild(li);
            });
        }

        const listaCerrados = document.getElementById("lista-cursos-cerrados");
        listaCerrados.innerHTML = ""; 

        if (!datos.cursosCerrados || datos.cursosCerrados.length === 0) {
            listaCerrados.innerHTML = '<li class="list-group-item text-muted text-center py-3">No hay cursos cerrados o finalizados.</li>';
        } else {
            datos.cursosCerrados.forEach(curso => {
                listaCerrados.innerHTML += `
                    <li class="list-group-item d-flex justify-content-between align-items-center py-3 bg-light text-muted">
                        <div>
                            <h6 class="mb-0 fw-bold text-secondary">${curso.nombre}</h6>
                            <small>${curso.descripcion}</small>
                        </div>
                        <a href="cursos-detalle.html?id=${curso.id_curso}" class="btn btn-sm btn-secondary fw-bold px-3">Ver detalles</a>
                    </li>
                `;
            });
        }

        
    } catch (error) {
        console.error("Error al cargar el dashboard:", error);
        document.getElementById("dash-estudiantes").innerText = "Error";
        document.getElementById("dash-cursos").innerText = "Error";
    }

    
};

document.addEventListener("DOMContentLoaded", cargarDashboard);