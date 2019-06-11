const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs')
const bodyParser = require('body-parser')
require('./helpers') 
const fs = require('fs');
//require('./yargs')

listaCursos = [];
listaEstudiantes = [];
listaEstudiantesCursos = [];
courseSelected = '';
estudiantedSelected = '';
cursoEstudiante = '';

const directorioPublico = path.join(__dirname, '../public');
const directorioPartials = path.join(__dirname,'../partials');
app.use(express.static(directorioPublico));
hbs.registerPartials(directorioPartials);
app.use(bodyParser.urlencoded({extended:false}))

app.set ('view engine', 'hbs')

app.get('/', (req, res) => {
    res.render('index', {
        estudiante : 'Luisa'
    });
});

app.get('*', (req, resp) => {
    resp.render('error', {
        estudiante: 'error'
    });
})

app.post('/calculos', (req, res) =>{
    res.render('calculos', {
        estudiante: req.body.nombre,
        nota1 : parseInt(req.body.nota1),
        nota2: parseInt(req.body.nota2),
        nota3 : parseInt(req.body.nota3)
    });
});

app.post('/coordinador', (req,res) => {
    res.render('coordinador');
});

app.post('/estudiante', (req,res) => {
    res.render('estudiante');
});

app.post('/adicionarCursoForm', (req, res) => {
    res.render('adicionarCursoForm');
});


app.post('/cursosEstudiantes', (req,res) => {
    listarEstudiantes();
    listar();
    listarEstudiantesCursos();
    let texto = "";
    listaEstudiantesCursos.forEach(item => {
        let estudiante = listaEstudiantes.find(est => est.idEstudiante == item.idEstudiante);
        let curso = listaCursos.find(cur => cur.idCurso == item.idCurso);
        if(estudiante != undefined && curso!= undefined){
            texto = texto + "<b>Nombre Curso:</b>  " + curso.nombreCurso + "<b>    Id Curso:</b>  " + curso.idCurso + "             |           <b>Nombre estudiante:</b>   "  + estudiante.nombreestudiante + "      <b>Id estudiante:</b>   "  + estudiante.idEstudiante   + "<br>"
            
        }
    });
    res.render('cursosEstudiantes', {
        texto : texto
    });
});


app.post('/removeEnroll', (req, res)=> {
    listarEstudiantesCursos();
    let remove = listaEstudiantesCursos.filter(estCur => !((estCur.idEstudiante === req.body.idEstudiante) && (estCur.idCurso === req.body.idCurso)))
    if(remove.length == listaEstudiantesCursos.length){
        console.log("No existen esas condiciones para eliminar inscripcion");
    }else{
        listaEstudiantesCursos = remove;
        guardarEnroll();
        let texto = "";
        listaEstudiantesCursos.forEach(item => {
        let estudiante = listaEstudiantes.find(est => est.idEstudiante == item.idEstudiante);
        let curso = listaCursos.find(cur => cur.idCurso == item.idCurso);
        if(estudiante != undefined && curso!= undefined){
            texto = texto + "<b>Nombre Curso:</b>  " + curso.nombreCurso + "<b>      Id Curso:</b>  " + curso.idCurso + "             |           <b>Nombre estudiante:</b>   "  + estudiante.nombreestudiante + "      <b>Id estudiante:</b>   "  + estudiante.idEstudiante   + "<br>"
            
        }
    });
    res.render('cursosEstudiantes', {
        texto : texto
    });
    }
});



//Init Add Courses Methods
app.post('/addCourses', (req, res) =>{
    listar();
    let duplicado = listaCursos.find(curso => curso.idCurso == req.body.idCurso)
    if(!duplicado){
        crearCurso(req.body)
         res.render('courses', {
        curso: req.body.nombreCurso
     });
    }else{
        console.log('Duplicados')
    }
});

const crearCurso = (curso) => {
    listaCursos.push(curso);
    guardarCurso();
};

const guardarCurso = () => {
    let datos = JSON.stringify(listaCursos);
    fs.writeFile('listadoCursos.json', datos, (err)=> {
        if(err) throw(err);
        console.log('Curso adicionado con exito');
    })
};
//End Add Courses Methods

//Init List Available curses
app.post('/listCourses', (req, res) =>{
    res.render('listCourses');
});
//End List Available curses


//Init View Detail Course
app.post('/detailCourse', (req, res)=>{
    listar();
    let course = listaCursos.find(curso=> curso.nombreCurso == req.body.nombreCurso);
    courseSelected = course;
    res.render('detailCourse', {
         name: course.nombreCurso,
         description: course.descripcion,
         value: course.valor,
         modality: course.modalidad,
         schedule: course.intensidadHoraria
    });
});
//End View Detail Course


//Init Enroll Course
app.post('/enrollCourse', (req, res) => {
    listarEstudiantes();
    listarEstudiantesCursos();
    let findEstudiante = listaEstudiantes.find(estudiante => estudiante.idEstudiante == req.body.idEstudiante);
    if(!findEstudiante){
        crearEstudiante(req.body);
    }else{
        estudiantedSelected = findEstudiante;
    }

    validarCursoEstudiante();
    
     res.render('calculos');
});

const validarCursoEstudiante = () =>{
    let existe = false;
    console.log(estudiantedSelected.idEstudiante);
    listaEstudiantesCursos.forEach(element => {
        if(element.idEstudiante == estudiantedSelected.idEstudiante && element.idCurso == courseSelected.idCurso){
            console.log("existe");
            existe = true;
            return;
        }
    });
    if(!existe){
        enrollCourseStudentF();
    }else{
        console.log("Ya esta inscrito");
    }
}

const enrollCourseStudentF = () => {
    let enrollCourseStudent =`{
        "idEstudiante" : "${estudiantedSelected.idEstudiante}",
        "idCurso" : "${courseSelected.idCurso}"
        }`;
    listaEstudiantesCursos.push(JSON.parse(enrollCourseStudent));
    guardarEnroll();
}

const guardarEnroll = () => {
    let datos = JSON.stringify(listaEstudiantesCursos);
    fs.writeFile('listaEstudiantesCursos.json', datos, (err)=> {
        if(err) throw(err);
        console.log('Inscripcion exitosa');
    })
};
//End Enroll Course

//Init crear estudiante
const crearEstudiante = (estudiante) => {
    console.log(estudiante);
    listaEstudiantes.push(estudiante);
    estudiantedSelected=estudiante;
    guardarEstudiante();
};

const guardarEstudiante = () => {
    let datos = JSON.stringify(listaEstudiantes);
    fs.writeFile('listado.json', datos, (err)=> {
        if(err) throw(err);
        console.log('Estudiante adicionado con exito');
    })
};
//End crear estudiante

const listar = () =>{
    listaCursos = require('../listadoCursos.json')
};

const listarEstudiantes = () =>{
    listaEstudiantes = require('../listado.json')
};

const listarEstudiantesCursos = () =>{
    listaEstudiantesCursos = require('../listaEstudiantesCursos.json')
};

app.listen(3000, () => {
    console.log('Escuchando en el puerto 3000')
});