const nombre = {
    demand: true,
    alias: 'n'
}

const matematicas = {
    demand: true,
    alias: 'm'
}

const ingles = {
    demand: true,
    alias: 'i'
}

const programacion = {
    demand: true,
    alias: 'p'
}

const creacion = {
    nombre,
    matematicas,
    ingles,
    programacion
}

// const crearCurso = {
//     nombreCurso,
//     idCurso,
//     descripcion,
//     valor,
//     modalidad,
//     intensidadHoraria,
//     estado
// }

// const enrollCourseStudent = {
//     idEstudiante, 
//     idCurso
// }

const argv = require('yargs')
            .command('crear', 'Crear un estudiante', creacion)
            // .command('crearCurso', 'Crear curso', crearCurso)
            // .command('enrollCurso', 'Enroll curso', enrollCourseStudent)
            .argv;

module.exports = {
    argv
}