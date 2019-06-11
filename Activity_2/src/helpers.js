const hbs = require('hbs')

hbs.registerHelper('obtenerPromedio', (nota1, nota2, nota3)=> {
    return (nota1+nota2+nota3)/3
});

hbs.registerHelper('listar',() =>{
    listaEstudiantes = require('./listado.json');
    let texto = "<table> \
                <thead> \
                <th>Nombre </> \
                <th>Matematicas </> \
                </thead>\
                <tbody>";

    listaEstudiantes.forEach(estudiante => {
        texto = texto+
                '<tr>'+    
                    '<td>'+estudiante.nombre+'</td>' +
                    '<td>'+estudiante.matematicas+'</td> </tr>';

        
    });
    texto = texto + '</body></table>';
    return texto;
});


hbs.registerHelper('listarCursos',() =>{
    listaCursos = require('../listadoCursos.json');
    let texto = "<table> \
                <thead> \
                <th>Nombre </> \
                <th>Descripcion </> \
                <th>Valor </> \
                </thead>\
                <tbody>";

                listaCursos.forEach(curso => {
        texto = texto+
                '<tr>'+    
                    '<td>'+curso.nombreCurso+'</td>' +
                    '<td>'+curso.descripcion+'</td>' +
                    '<td>'+curso.valor+'</td> </tr>';

        
    });
    texto = texto + '</body></table>';
    return texto;
});