import jwt from 'jsonwebtoken';

export const verificarToken = (req, res, next) => {
    const headerAuth = req.header('Authorization');

    if (!headerAuth) {
        return res.status(401).json({ error: 'Acceso denegado. No se proporciono un token de seguridad.' });
    }

    try {
        const token = headerAuth.split(' ')[1];
        const verificado = jwt.verify(token, process.env.JWT_SECRET);
        
        req.usuario = verificado;
        next(); 
    } catch (error) {
        res.status(401).json({ error: 'Token invalido o expirado. Vuelva a iniciar sesion.' });
    }
};