const hbs = require('hbs')
listaCursos = [];
listaEstudiantes = [];
listaEstudiantesCursos = [];

const listar = () =>{
    listaCursos = require('../listadoCursos.json')
};

const listarEstudiantes = () =>{
    listaEstudiantes = require('../listado.json')
};

const listarEstudiantesCursos = () =>{
    listaEstudiantesCursos = require('../listaEstudiantesCursos.json')
};



hbs.registerHelper('listarCursosEstudiantes',() =>{
    listarEstudiantes();
    listar();
    listarEstudiantesCursos();

    let texto = "<table class=\"tablaBorder\"> \
    <thead> \
    <th>Nombre Curso </> \
    <th>Nombre Estudiante </> \
    <th>Acciones </> \
    </thead>\
    <tbody>";

    listaEstudiantesCursos.forEach(item => {
        console.log("item " + item.idEstudiante + item.idCurso)
        let estudiante = listaEstudiantes.find(est => est.idEstudiante == item.idEstudiante);
        let curso = listaCursos.find(cur => cur.idCurso == item.idCurso);
        if(estudiante != undefined && curso!= undefined){
            texto = texto+  '<tr>'+    
            '<td>'+curso.nombreCurso+'</td>' +
            '<td>'+estudiante.nombreestudiante+'</td>'+
            '<td>'+"<form action=\"/removeEnroll\" method=\"post\"> <input type=\"hidden\" name=\"idCurso\" value=\""+curso.idCurso + "\"> <input type=\"hidden\" name=\"idEstudiante\" value=\""+estudiante.idEstudiante + "\"><button>Eliminar inscripcion</button> </form>"+'</td></tr>';
        }
    });
    return texto;
});



hbs.registerHelper('listarCursosComoWithoutDetail',() =>{
    listaCursos = require('../listadoCursos.json');
    
   
    let texto = "<table class=\"tablaBorder\"> \
                <thead> \
                <th>Nombre </> \
                <th>Descripcion </> \
                <th>Valor </> \
                <th>Estado </> \
                <th>Acciones </> \
                </thead>\
                <tbody>";

                listaCursos.forEach(curso => {
        texto = texto+
                '<tr>'+    
                    '<td>'+curso.nombreCurso+'</td>' +
                    '<td>'+curso.descripcion+'</td>' +
                    '<td>'+curso.valor+'</td> ' +
                    '<td>'+curso.estado+'</td> ' +
                    '<td>'+"<form action=\"/cambiarEstado\" method=\"post\"> <input type=\"hidden\" name=\"nombreCurso\" value=\""+curso.nombreCurso + "\"> <button>Cambiar Estado Curso</button> </form>"+'</td></tr>';

        
    });
    texto = texto + '</body></table>';
    return texto;
});