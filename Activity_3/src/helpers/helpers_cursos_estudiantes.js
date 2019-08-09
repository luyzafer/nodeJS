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



hbs.registerHelper('listarCursosEstudiantes',(listaInscritos, listaCursos, listaEstudiantes) =>{
    let texto = "<table class=\"table table-striped\"> \
    <thead> \
    <th>Nombre Curso </> \
    <th>Nombre Estudiante </> \
    <th>Acciones </> \
    </thead>\
    <tbody>";

   

    listaInscritos.forEach(item => {
        let estudiante = listaEstudiantes.find(est => est.documento == item.idEstudiante);
        let curso = listaCursos.find(cur => cur.id == item.idCurso);

        console.log(estudiante)
        if(estudiante != undefined && curso!= undefined){
            texto = texto+  '<tr>'+    
            '<td>'+curso.nombre+'</td>' +
            '<td>'+estudiante.nombre+'</td>'+
            '<td>'+"<form action=\"/removeEnroll\" method=\"post\"> <input type=\"hidden\" name=\"idCurso\" value=\""+curso.id + "\"> <input type=\"hidden\" name=\"idEstudiante\" value=\""+estudiante.documento + "\"><button>Eliminar inscripcion</button> </form>"+'</td></tr>';
        }
    });
    texto = texto + '</body></table>';
    return texto;
});



