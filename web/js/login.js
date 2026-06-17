document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem('token')) {
        window.location.href = 'index.html';
    }

    const formulario = document.getElementById("formulario-login");

    formulario.addEventListener("submit", async (e) => {
        e.preventDefault();

        const nombre_usuario = document.getElementById("nombre_usuario").value;
        const contrasenia = document.getElementById("contrasenia").value;
        const divError = document.getElementById("error-login");

        try {
            const respuesta = await fetch("http://localhost:3000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({nombre_usuario, contrasenia})
            });

            const datos = await respuesta.json();

            if (respuesta.ok) {
                localStorage.setItem("token", datos.token);
                window.location.href = "index.html";
            } else {
                divError.innerText = datos.error || "Error al iniciar sesión";
                divError.style.display = "block";
            }
        } catch (error) {
            console.error("Error de red:", error);
            divError.innerText = "Error de conexión con el servidor.";
            divError.style.display = "block";
        }
    });

    const btnRegistro = document.getElementById("btn-registro");
    
    btnRegistro.addEventListener("click", async () => {
        const nombre_usuario = document.getElementById("nombre_usuario").value;
        const contrasenia = document.getElementById("contrasenia").value;
        const divError = document.getElementById("error-login");

        if (!nombre_usuario || !contrasenia) {
            divError.innerText = "Llená los campos arriba para crear una cuenta.";
            divError.style.display = "block";
            return;
        }

        try {
            const respuesta = await fetch("http://localhost:3000/api/registro", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nombre_usuario, contrasenia })
            });

            const datos = await respuesta.json();

            if (respuesta.ok) {
                alert("¡Cuenta creada con éxito! Ahora hacé clic en 'Ingresar al Sistema' para loguearte.");
                divError.style.display = "none";
            } else {
                divError.innerText = datos.error || "Error al crear la cuenta";
                divError.style.display = "block";
            }
        } catch (error) {
            console.error("Error de red:", error);
            divError.innerText = "Error de conexión con el servidor.";
            divError.style.display = "block";
        }
    }); 
});