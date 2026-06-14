export const transformarDatosCurso = (req, res, next) => {
    if (req.body.nombre) {
        req.body.nombre = req.body.nombre.trim().replace(/\s+/g, ' ');
    }
    
    if (req.body.descripcion) {
        req.body.descripcion = req.body.descripcion.trim();
    }

    if (req.body.cantidadHoras) {
        req.body.cantidadHoras = parseInt(req.body.cantidadHoras, 10);
    }
    
    if (req.body.cantidadInscriptos) {
        req.body.cantidadInscriptos = parseInt(req.body.cantidadInscriptos, 10);
    }

    next();
};