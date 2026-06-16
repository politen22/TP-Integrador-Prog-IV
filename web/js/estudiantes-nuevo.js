const iniciar = () => {
    const formulario = document.getElementById("formulario"); 
    
    formulario.addEventListener("submit", async (evt) => {
        evt.preventDefault();
        evt.stopPropagation();

        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = 'login.html';
            return;
        }

        const obj = {
            nombres: document.getElementById("nombres").value,
            apellido: document.getElementById("apellido").value,
            documento: document.getElementById("documento").value,
            email: document.getElementById("email").value,
            fecha_nacimiento: document.getElementById("fecha_nacimiento").value
        };

        try {
            const respuesta = await fetch("http://localhost:3000/api/estudiantes", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(obj)
            });

            if (respuesta.ok) {
                alert("¡Estudiante registrado con exito!");
                window.location.href = "estudiantes.html"; 
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