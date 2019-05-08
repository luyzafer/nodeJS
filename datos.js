const {estudiante, obtenerPromedio} = require ('./calculos');
const fs= require('fs');
console.log("El nombre del estudiante es: " + estudiante.nombre) 
console.log("El promedio del estudiante es: " + obtenerPromedio(estudiante.notas.ingles, estudiante.notas.matematicas, estudiante.notas.programacion))

let {nombre, edad : anos, notas: {matematicas, ingles, programacion}} = estudiante
console.log("Nombre del estudiante es: " + nombre)
console.log("El promedio del estudiante es: " + obtenerPromedio(ingles, matematicas, programacion))
console.log("La edad del estudiante es: " + anos)


let createArchivo = (estudiante) => {
    texto= 'El nombre del estudiante es: ' +estudiante.nombre + '\n' + 
    "ha obtenido un promedio de: " + obtenerPromedio (ingles, matematicas, programacion);

    fs.writeFile('promedio.txt', texto, (err) => {
        if(err) throw (err);
        console.log("se ha creado el archivo")
    });
}

createArchivo(estudiante)