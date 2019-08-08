const hbs = require('hbs')

hbs.registerHelper('obtenerPromedio', (nota1, nota2, nota3)=> {
    return (nota1+nota2+nota3)/3
});

hbs.registerHelper('listar',() =>{
    listaEstudiantes = require('./listado.json');
    let texto = "<table class='table'> \
                <thead class='thead-dark'> \
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