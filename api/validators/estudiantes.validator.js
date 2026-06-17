import { body, validationResult } from 'express-validator';

export const validarEstudiante = [
    body('documento')
        .notEmpty().withMessage('El documento es obligatorio')
        .isLength({max: 9}).withMessage('El documento no puede superar los 9 caracteres'),
    
    body('apellido')
        .notEmpty().withMessage('El apellido es obligatorio')
        .isLength({max: 100}).withMessage('El apellido no puede superar los 100 caracteres'),
    
    body('nombres')
        .notEmpty().withMessage('Los nombres son obligatorios')
        .isLength({max: 100}).withMessage('Los nombres no pueden superar los 100 caracteres'),
    
    body('email')
        .notEmpty().withMessage('El email es obligatorio')
        .isEmail().withMessage('Debe ser un formato de email valido')
        .isLength({max: 255}).withMessage('El email no puede superar los 255 caracteres'),

    body('fecha_nacimiento')
        .notEmpty().withMessage('La fecha de nacimiento es obligatoria')
        .isISO8601().withMessage('Debe ser una fecha válida (AAAA-MM-DD)'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errores: errors.array()});
        }
        next(); 
    }
];