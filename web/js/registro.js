document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem('token')) {
        window.location.href = 'index.html';
    }

    const formulario = document.getElementById("formulario-registro");

    formulario.addEventListener("submit", async (e) => {
        e.preventDefault();

        const nombres = document.getElementById("nombres").value;
        const apellido = document.getElementById("apellido").value;
        const nombre_usuario = document.getElementById("nombre_usuario").value;
        const contrasenia = document.getElementById("contrasenia").value;
        const divError = document.getElementById("error-registro");

        try {
            const respuesta = await fetch("http://localhost:3000/api/registro", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({nombres, apellido, nombre_usuario, contrasenia})
            });

            const datos = await respuesta.json();

            if (respuesta.ok) {
                alert("Usuario creado con exito! ya podes iniciar sesion.");
                window.location.href = "login.html";
            } else {
                divError.innerText = datos.error || "Error al registrar el usuario";
                divError.style.display = "block";
            }
        } catch (error) {
            console.error("Error de red:", error);
            divError.innerText = "Error de conexion con el servidor.";
            divError.style.display = "block";
        }
    });
});