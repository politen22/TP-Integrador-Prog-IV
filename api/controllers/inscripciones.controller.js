import InscripcionesService from "../services/inscripciones.services.js";
import InscripcionesRepository from "../repositories/inscripciones.repository.js";
import PDFDocument from 'pdfkit';

export default class InscripcionesController {
    constructor() {
        this.service = new InscripcionesService();
        this.repository = new InscripcionesRepository();
    }

    async getAll(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const search = req.query.search || '';

            const inscripciones = await this.service.getAll(page, limit, search);
            res.json(inscripciones);
        } catch (error) {
            console.error('Error al obtener inscripciones:', error);
            res.status(500).json({ message: 'Error al obtener inscripciones' });
        }
    }

    async getById(req, res) {
        try {
            const id = req.params.id;
            const inscripcion = await this.service.getById(id);

            if (!inscripcion) {
                return res.status(404).json({error: `No se encontro la inscripcion con el ID ${id}`});
            }
            res.json(inscripcion);
        } catch (error) {
            console.error("Error al obtener inscripcion", error);
            res.status(500).json({error: "Error interno"});
        }
    }

    async create(req, res) {
        try {
            const data = req.body;
            if (!data.id_curso || !data.id_estudiante) {
                return res.status(400).json({error: "El id_curso y el id_estudiante son obligatorios."});
            }

            const nuevaInscripcion = await this.service.create(data);
            res.status(201).json(nuevaInscripcion);
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    }

    async delete(req, res) {
        try {
            const id = req.params.id;
            const inscripcionEliminada = await this.service.delete(id);

            if (!inscripcionEliminada) {
                return res.status(404).json({error: `No se encontro la inscripcion ${id} o ya está cancelada.`});
            }
            res.json({mensaje: 'Inscripcion cancelada con exito', inscripcion: inscripcionEliminada});
        } catch (error) {
            console.error('Error al cancelar:', error);
            res.status(500).json({error: 'Error al intentar cancelar la inscripcion'});
        }
    }

    async generarComprobante(req, res) {
        try {
            const { id } = req.params;            
            const inscripcion = await this.repository.obtenerDetallePorId(id);
            
            if (!inscripcion) {
                return res.status(404).json({ error: 'Inscripcion no encontrada' });
            }

            const doc = new PDFDocument({ margin: 50 });

            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename=comprobante_${id}.pdf`);

            doc.pipe(res);

            doc.fontSize(22).font('Helvetica-Bold').text('Comprobante de Inscripcion', { align: 'center' });
            doc.moveDown(2); 

            const fechaFormateada = new Date(inscripcion.fechaHoraInscripcion).toLocaleDateString('es-AR');
            
            doc.fontSize(14).font('Helvetica-Bold').text('Detalles de la operacion:');
            doc.moveDown(0.5);
            doc.font('Helvetica').fontSize(12);
            doc.text(`Número de Operación: #${inscripcion.idInscripcion}`);
            doc.text(`Fecha de Registro: ${fechaFormateada}`);
            doc.moveDown(1);

            doc.fontSize(14).font('Helvetica-Bold').text('Datos del Estudiante:');
            doc.moveDown(0.5);
            doc.font('Helvetica').fontSize(12);
            doc.text(`Alumno: ${inscripcion.estudianteApellido}, ${inscripcion.estudianteNombres}`);
            doc.text(`Documento (DNI): ${inscripcion.estudianteDocumento}`);
            doc.moveDown(1);

            doc.fontSize(14).font('Helvetica-Bold').text('Datos del Curso:');
            doc.moveDown(0.5);
            doc.font('Helvetica').fontSize(12);
            doc.text(`Curso asignado: ${inscripcion.cursoNombre}`);

            doc.moveDown(3);
            doc.fontSize(10).font('Helvetica-Oblique').text('Documento generado automaticamente por el Sistema de Gestion FCAD - UNER.', { align: 'center' });

            doc.end();

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error interno al generar el PDF' });
        }
    }
}