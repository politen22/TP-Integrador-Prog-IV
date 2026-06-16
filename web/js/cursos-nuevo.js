const iniciar = () => {
    const formulario = document.getElementById("formulario"); 
    
    formulario.addEventListener("submit", async (evt) => {
        evt.preventDefault();
        evt.stopPropagation();

        const token = localStorage.getItem('token');
        if(!token){
            window.location.href = 'login.html';
            return;
        }

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
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(obj)
            });

            if (respuesta.ok) {
                alert("¡Curso creado con exito!");
                window.location.href = "cursos.html"; 
            } else {
                const errorData = await respuesta.json();
                let mensajeError = "";
                
                if (errorData.errores) {
                    mensajeError = errorData.errores.map(e => e.msg).join('<br>');
                } else if (errorData.error) {
                    mensajeError = errorData.error;
                } else {
                    mensajeError = "Ocurrió un error desconocido.";
                }

                document.getElementById("error").innerHTML = `<p>${mensajeError}</p>`;
                document.getElementById("error").style.display = "block";
            }

            } catch (error) {
            console.error(error);
            document.getElementById("error").innerHTML = "<p>Error de conexion con el servidor.</p>";
            document.getElementById("error").style.display = "block";
        }
        
    });
};

document.addEventListener("DOMContentLoaded", iniciar);