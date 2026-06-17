document.addEventListener("DOMContentLoaded", () => {
    const cajaUsuario = document.getElementById("caja-usuario");
    const token = localStorage.getItem("token");

    if (token) {
        try {
            const payloadDecodificado = JSON.parse(atob(token.split('.')[1]));
            const nombreUsuario = payloadDecodificado.nombreUsuario;

            cajaUsuario.innerHTML = `
                <div class="d-flex flex-column align-items-end me-4">
                    <span class="fw-bold text-white lh-2 mb-1" style="font-size: 1.5em;">${nombreUsuario}</span>
                    <a href="#" onclick="cerrarSesion()" class="text-danger text-decoration-none fw-bold" style="font-size: 0.85em;">Cerrar Sesion</a>
                </div>
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