//Requires
require('./config/config');
const express = require('express')
const app = express ()
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
//### Para usar las variables de sesión
const session = require('express-session')
var MemoryStore = require('memorystore')(session)
const server = require('http').createServer(app);
const Estudiante = require('./models/estudiante')
const iow = require('./server')

iow.init(server);
// var io = iow.server();

// io.on('connection', function (socket) {
// 	Estudiante.countDocuments({tipoUsuario : 'Estudiante'}, function(error, numOfDocs) {
// 		console.log('Actualmente la plataforma tiene '+numOfDocs+' estudiantes activos en cursos');
// 		io.emit('news', numOfDocs);
// 	});

//   });


//Paths
const dirPublic = path.join(__dirname, "../public")
const dirNode_modules = path.join(__dirname , '../node_modules')


if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}


//Static
app.use(express.static(dirPublic))
// app.use('/css', express.static(dirNode_modules + '/bootstrap/dist/css'));
app.use('/js', express.static(dirNode_modules + '/jquery/dist'));
app.use('/js', express.static(dirNode_modules + '/popper.js/dist'));
// app.use('/js', express.static(dirNode_modules + '/bootstrap/dist/js'));


//### Para usar las variables de sesión
app.use(session({
	cookie: { maxAge: 86400000 },
 	store: new MemoryStore({
      	checkPeriod: 86400000 // prune expired entries every 24h
    	}),
  	secret: 'keyboard cat',
  	resave: true,
  	saveUninitialized: true
}))


app.use((req, res, next) =>{
	
	//En caso de usar variables de sesión
	if(req.session.usuario){		
		res.locals.sesion = true
		res.locals.nombre = req.session.nombre
		res.locals.tipoUsuario = req.session.tipoUsuario
	}	
	next()
})


//BodyParser
app.use(bodyParser.urlencoded({ extended: false }));

//Routes
app.use(require('./routes/index'));

const port = process.env.PORT || 3000;
const URLDB = process.env.URLDB || 'mongodb://localhost:27017/asignaturas';


mongoose.connect(URLDB, {useNewUrlParser: true, useFindAndModify: false }, (err, result) => {
    if (err) {
        return console.log(err)
    }
    console.log('conectado')
});

server.listen(port, () => {
	console.log ('servidor en el puerto ' + port)
});


//module.exports = io