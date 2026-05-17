const iniciar = () => {
    const envio = document.getElementById("btnGuardar");
    envio.addEventListener("click", async (evt) => {
        evt.preventDefault();
        evt.stopPropagation();

        const obj = {
            nombre: document.getElementById("nombre").value,
            descripcion: document.getElementById("descripcion").value,
            fechaInicio: document.getElementById("fechaInicio").value,
            cantidadHoras: document.getElementById("cantidadHoras").value,
            cantidadInscriptos: document.getElementById("cantidadInscriptos").value
        };

        console.log(obj);

    });
};
document.addEventListener("DOMContentLoaded", iniciar);