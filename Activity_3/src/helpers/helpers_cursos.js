const hbs = require('hbs')


hbs.registerHelper('listar', () => {
    listaEstudiantes = require('./listado.json');
    let texto = "<table> \
                <thead> \
                <th>Nombre </> \
                <th>Matematicas </> \
                </thead>\
                <tbody>";

    listaEstudiantes.forEach(estudiante => {
        texto = texto +
            '<tr>' +
            '<td>' + estudiante.nombre + '</td>' +
            '<td>' + estudiante.matematicas + '</td> </tr>';


    });
    texto = texto + '</body></table>';
    return texto;
});


hbs.registerHelper('listarCursos', (listaCursos) => {

    let texto = "<table class=\"table table-striped\"> \
                <thead> \
                <tr> \
                <th scope=\"col\">Nombre </> \
                <th scope=\"col\">Descripcion </> \
                <th scope=\"col\">Valor </> \
                <th scope=\"col\">Estado </> \
                <th scope=\"col\">Acciones </> \
                </tr> \
                </thead>\
                <tbody>";

    listaCursos.forEach(curso => {
        texto = texto +
            '<tr>' +
            '<td>' + curso.nombre + '</td>' +
            '<td>' + curso.descripcion + '</td>' +
            '<td>' + curso.valor + '</td> ' +
            '<td>' + curso.estado+'</td> ' +
            '<td>'+"<form action=\"/cambiarEstado\" method=\"post\"> <input type=\"hidden\" name=\"nombreCurso\" value=\""+curso.nombre + "\"> <input type=\"hidden\" name=\"estado\" value=\""+curso.estado + "\"> <button>Cambiar Estado Curso</button> </form>"+'</td></tr>';


    });
    texto = texto + '</body></table>';
    return texto;
});

hbs.registerHelper('listCoursesEstudiante', (listaCursos) => {
    console.log('entre')
    console.log(listaCursos)

    let texto = "<table class=\"table table-striped\"> \
                <thead> \
                <th>Nombre </> \
                <th>Descripcion </> \
                <th>Valor </> \
                <th>Acciones </> \
                </thead>\
                <tbody>";

    listaCursos.forEach(curso => {
        texto = texto +
            '<tr>' +
            '<td>' + curso.nombre + '</td>' +
            '<td>' + curso.descripcion + '</td>' +
            '<td>' + curso.valor + '</td> ' +
            '<td>' + "<form action=\"/detailCourse\" method=\"post\"> <input type=\"hidden\" name=\"nombreCurso\" value=\"" + curso.nombre + "\"> <button>View Detail</button> </form>" + '</td></tr>';


    });
    texto = texto + '</body></table>';
    return texto;
});


hbs.registerHelper('misCursos', (miscursosList) => {

    let texto = "<table class=\"table table-striped\"> \
                <thead> \
                <tr> \
                <th scope=\"col\">Nombre </> \
                <th scope=\"col\">Descripcion </> \
                </tr> \
                </thead>\
                <tbody>";

                console.log(miscursosList)
        miscursosList.forEach(curso => {
        texto = texto +
            '<tr>' +
            '<td>' + curso.nombre + '</td>' +
            '<td>' + curso.descripcion + '</td></tr>';


    });
    texto = texto + '</body></table>';
    return texto;
});