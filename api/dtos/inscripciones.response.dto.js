export default class InscripcionResponseDTO {
    constructor(inscripcion) {
        this.idInscripcion = inscripcion.id_inscripcion;
        this.idCurso = inscripcion.id_curso;
        this.cursoNombre = inscripcion.curso_nombre;
        this.idEstudiante = inscripcion.id_estudiante;
        this.estudianteNombres = inscripcion.estudiante_nombres;
        this.estudianteApellido = inscripcion.estudiante_apellido;
        this.estudianteDocumento = inscripcion.estudiante_documento;
        this.fechaHoraInscripcion = inscripcion.fecha_hora_inscripcion;
        this.idInscripcionEstado = inscripcion.id_inscripcion_estado;
    }
}