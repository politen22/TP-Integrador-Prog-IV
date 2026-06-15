export const transformarDatosEstudiante = (req, res, next) => {
    if (req.body.nombres) {
        req.body.nombres = req.body.nombres.trim().replace(/\s+/g, ' ');
    }
    
    if (req.body.apellido) {
        req.body.apellido = req.body.apellido.trim().replace(/\s+/g, ' ');
    }

    if (req.body.documento) {
        req.body.documento = req.body.documento.trim();
    }

    if (req.body.email) {
        req.body.email = req.body.email.trim().toLowerCase();
    }

    next();
};