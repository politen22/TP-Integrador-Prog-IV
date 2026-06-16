document.addEventListener("DOMContentLoaded", () => {
    const cajaUsuario = document.getElementById("caja-usuario");
    const token = localStorage.getItem("token");

    if (token) {
        try {
            const payloadDecodificado = JSON.parse(atob(token.split('.')[1]));
            const nombreUsuario = payloadDecodificado.nombreUsuario;

            cajaUsuario.innerHTML = `
                <span class="fw-bold me-2 text-white">${nombreUsuario}</span>
                <a href="#" onclick="cerrarSesion()" class="text-danger text-decoration-none fw-bold">(Cerrar Sesion)</a>
            `;
        } catch (error) {
            mostrarBotonAcceder(cajaUsuario);
        }
    } else {
        mostrarBotonAcceder(cajaUsuario);
    }
});

const mostrarBotonAcceder = (contenedor) => {
    contenedor.innerHTML = `
        <a href="login.html" class="btn btn-primary fw-bold border-dark">Acceder</a>
    `;
};

window.cerrarSesion = () => {
    localStorage.removeItem('token');
    window.location.href = 'index.html';
};