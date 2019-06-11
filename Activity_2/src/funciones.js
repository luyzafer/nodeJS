const fs = require('fs');
listaEstudiantes = [];
listaCursos = [];

const crear = (estudiante) => {
    let est = {
        nombre: estudiante.nombre,
        matematicas: estudiante.matematicas,
        ingles : estudiante.ingles,
        programacion : estudiante.programacion
    };
    listaEstudiantes.push(est);
    guardar();
}


const guardar = () => {
    let datos = JSON.stringify(listaEstudiantes);
    fs.writeFile('listado.json', datos, (err)=> {
        if(err) throw(err);
        console.log('Archivo creado con exito');
    })
}


module.exports = {
    crear
}