const iniciar = () => {
    const formulario = document.getElementById("formulario"); 
    
    formulario.addEventListener("submit", async (evt) => {
        evt.preventDefault();
        evt.stopPropagation();

        const obj = {
            nombre: document.getElementById("nombre").value,
            descripcion: document.getElementById("descripcion").value,
            fechaInicio: document.getElementById("fechaInicio").value,
            cantidadHoras: document.getElementById("cantidadHoras").value,
            cantidadInscriptos: document.getElementById("cantidadInscriptos").value
        };

        try {
            const respuesta = await fetch("http://localhost:3000/api/cursos", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            });

            if (respuesta.ok) {
                alert("¡Curso creado con exito!");
                window.location.href = "cursos-nuevo.html"; 
            } else {
                const errorData = await respuesta.json();
                document.getElementById("error").innerHTML = `<p>${errorData.error}</p>`;
                document.getElementById("error").style.display = "block";
            }
        } catch (error) {
            document.getElementById("error").innerHTML = "<p>Error de conexion con el servidor.</p>";
            document.getElementById("error").style.display = "block";
        }
    });
};
document.addEventListener("DOMContentLoaded", iniciar);