import {body, validationResult} from 'express-validator';

export const validarCurso = [
    body('nombre')
        .notEmpty().withMessage('El nombre es obligatorio')
        .isLength({max: 45}).withMessage('El nombre no puede superar los 45 caracteres'),
    
    body('descripcion')
        .notEmpty().withMessage('La descripcion es obligatoria')
        .isString().withMessage('La descripcion debe ser texto'),
    
    body('fechaInicio')
        .notEmpty().withMessage('La fecha de inicio es obligatoria')
        .isISO8601().withMessage('Debe ser una fecha valida (AAAA-MM-DD)'),
    
    body('cantidadHoras')
        .isInt({min: 1}).withMessage('La cantidad de horas debe ser mayor a 0'),
    
    body('cantidadInscriptos')
        .isInt({min: 1}).withMessage('El cupo maximo de inscriptos debe ser mayor a 0'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errores: errors.array()});
        }
        next();
    }
];