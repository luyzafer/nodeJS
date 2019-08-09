const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')
const Estudiante = require('./../models/estudiante')
const Curso = require('./../models/curso')
const Inscrito = require('./../models/inscritos')
const dirViews = path.join(__dirname, '../../template/views')
const dirPartials = path.join(__dirname, '../../template/partials')
const bcrypt = require('bcrypt');
const sgMail = require('@sendgrid/mail');
const multer = require('multer')
const iow = require('../server')

var io = iow.server();



require('./../helpers/helpers')

//hbs
app.set('view engine', 'hbs')
app.set('views', dirViews)
hbs.registerPartials(dirPartials)



//importando helpers
const directoriohelpers = path.join(__dirname, '../helpers');
require(directoriohelpers + '/helpers_cursos');
require(directoriohelpers + '/helpers_cursos_estudiantes');


const SENDGRID_API_KEY = "";


hbs.registerHelper('ifCond', function (v1, v2, options) {
	if (v1 === v2) {
		return options.fn(this);
	}
	return options.inverse(this);
});


app.get('/', (req, res) => {
	res.render('index', {
		titulo: 'Inicio',
	})
});

var upload = multer({
	limits: {
		fileSize: 10000000
	},
	fileFilter(req, file, cb) {
		if (!file.originalname.match(/\.(jpg|png|jpeg)$/)) {
			return cb(new Error('Error'))
		}
		cb(null, true)
	}
})


app.post('/', upload.single('archivo'), (req, res) => {

	sgMail.setApiKey(SENDGRID_API_KEY);
	const msg = {
		to: req.body.email,
		from: 'luigifer1@gmail.com',
		subject: 'Bienvenido al Portal de cursos',
		text: "Bienvenido al portal de cursos, recuerde que su usuario es " + req.body.nombre

	};

	Estudiante.findOne({ documento: req.body.documento }, (err, resultado) => {
		if (err) {
			return console.log(err)
		}
		console.log(resultado)
		if (resultado) {
			res.render('indexpost', {
				mostrar: "El Usuario " + req.body.nombre + " ya existe "
			})
		}

		let estudiante = new Estudiante({
			nombre: req.body.nombre,
			password: bcrypt.hashSync(req.body.password, 10),
			email: req.body.email,
			documento: req.body.documento,
			telefono: req.body.telefono,
			tipoUsuario: req.body.tipoUsuario,
			photo: req.file.buffer

		})

		estudiante.save((err, resultado) => {
			if (err) {
				return res.render('indexpost', {
					mostrar: err
				})
			}
			sgMail.send(msg);
			res.render('indexpost', {
				mostrar: "El Usuario " + resultado.nombre + " fue creado exitosamente"
			})
		})
	})
});

app.post('/ingresar', (req, res) => {
	Estudiante.findOne({ nombre: req.body.usuario }, (err, resultados) => {
		if (err) {
			return console.log(err)
		}
		if (!resultados) {
			return res.render('error', {
				mensaje: "Usuario no encontrado"
			})
		}
		if (!bcrypt.compareSync(req.body.password, resultados.password)) {
			return res.render('error', {
				mensaje: "Contraseña no es correcta"
			})
		}
		//Para crear las variables de sesión
		req.session.usuario = resultados._id
		req.session.nombre = resultados.nombre
		req.session.tipoUsuario = resultados.tipoUsuario
		req.session.documento = resultados.documento
		req.session.email = resultados.email
		req.session.telefono = resultados.telefono
		photo = resultados.photo.toString("base64")


		res.render('ingresar', {
			mensaje: resultados.nombre,
			nombre: resultados.nombre,
			tipoUsuario: resultados.tipoUsuario,
			documento: resultados.documento,
			email: resultados.email,
			telefono: resultados.telefono,
			sesion: true,
			photo: photo
		})
	})
})

app.get('/salir', (req, res) => {
	req.session.destroy((err) => {
		if (err) return console.log(err)
	})
	// localStorage.setItem('token', '');
	res.redirect('/')
})

app.get('/listCourses', (req, res) => {
	Curso.find().exec(
		(err, listaCursos) => {
			if (err) {
				console.log(err)
				res.render('listCourses', {
					mensaje: err
				})
			}
			res.render('listCourses', {
				listaCursos: listaCursos
			});
		});
});


app.get('/adicionarCursoForm', (req, res) => {
	res.render('adicionarCursoForm');
});

//Init Add Courses Methods
app.post('/addCourses', (req, res) => {

	Curso.findOne({ nombre: req.body.idCurso }, (err, resultados) => {
		if (err) {
			return console.log(err)
		}
		if (resultados) {
			return res.render('error', {
				mensaje: "El curso " + req.body.nombreCurso + " ya existe"
			})

		}

		let curso = new Curso({
			nombre: req.body.nombreCurso,
			id: req.body.idCurso,
			descripcion: req.body.descripcion,
			valor: req.body.valor,
			modalidad: req.body.modalidad,
			intensidadHoraria: req.body.intensidadHoraria,
			estado: req.body.estado

		})

		curso.save((err, resultado) => {
			if (err) {
				return res.render('indexpost', {
					mostrar: err
				})
			}
			res.render('courses', {
				curso: resultado.nombre
			})
		})
	})
});

app.get('/listCoursesEstudiantes', (req, res) => {
	Curso.find({ estado: 'disponible' }).exec(
		(err, listaCursos) => {
			if (err) {
				console.log(err)
				res.render('listCoursesEstudiantes', {
					mensaje: err
				})
			}
			res.render('listCoursesEstudiantes', {
				listaCursos: listaCursos
			});
		});
});

app.get('/misCursos', (req, res) => {
	Inscrito.find({ idEstudiante: req.session.documento }).exec(
		(err, cursos) => {
			if (err) {
				res.render('error'), {
					mensaje: err
				}
			}
			cursos.forEach(curso => {
				Curso.find({ id: curso.idCurso }).exec(
					(err, misCursos) => {
						if (err) {
							res.render('error'), {
								mensaje: err
							}
						}
						console.log(misCursos)
						res.render('misCursos', {
							miscursosList: misCursos
						})
					})
			})
		})
})


app.post('/detailCourse', (req, res) => {

	Curso.findOne({ nombre: req.body.nombreCurso }).exec(
		(err, curso) => {
			if (err) {
				res.render('detailCourse'), {
					mensaje: err
				}
			}

			req.session.idCurso = curso.id

			res.render('detailCourse', {
				name: curso.nombre,
				description: curso.descripcion,
				value: curso.valor,
				modality: curso.modalidad,
				schedule: curso.intensidadHoraria,
				documento: req.session.documento,
				email: req.session.email,
				telefono: req.session.telefono
			});
		});
});


app.post('/cambiarEstado', (req, res) => {


	console.log(req.body.nombreCurso)
	console.log(req.body.estado)
	console.log(req.body)
	Curso.findOneAndUpdate({ nombre: req.body.nombreCurso }, req.body.estado == 'disponible' ? { $set: { estado: "cerrado" } } : { $set: { estado: "disponible" } }, { new: true }, (err, result) => {
		if (err) {
			res.render('error'), {
				mensaje: err
			}
		}

		//Ojo Refactorizar
		Curso.find().exec(
			(err, listaCursos) => {
				if (err) {
					console.log(err)
					res.render('listCourses', {
						mensaje: err
					})
				}
				res.render('listCourses', {
					listaCursos: listaCursos
				});
			});
	})
});





//Init Enroll Course
app.post('/enrollCourse', (req, res) => {

	Inscrito.findOne({ idCurso: req.session.idCurso, idEstudiante: req.session.documento }).exec(
		(err, resultados) => {
			if (err) {
				return console.log(err)
			}
			if (resultados) {
				res.render('error', {
					mensaje: "Actualmente se encuentra inscrito en el curso " + req.session.idCurso
				})
				return console.log()
			}

			let inscrito = new Inscrito({
				idCurso: req.session.idCurso,
				idEstudiante: req.session.documento
			})

			inscrito.save((err, resultado) => {
				if (err) {
					return res.render('indexpost', {
						mostrar: err
					})
				}

				Estudiante.findOneAndUpdate({ documento: req.session.documento }, { $set: { tipoUsuario: 'Estudiante' } }, { new: true }, (err, result) => {
					if (err) {
						return console.log(err)
					}

					io.on('connection', function (socket) {
						Estudiante.countDocuments({ tipoUsuario: 'Estudiante' }, function (error, numOfDocs) {
							io.emit('news', numOfDocs);
						});
					
					});
					
					res.render('enrollCourse', {
						inscrito: resultado.idCurso
					})
				}
				)
			})
		})



});

//End Enroll Course


app.get('/cursosEstudiantes', (req, res) => {

	Inscrito.find().exec(
		(err, listaInscritos) => {
			if (err) {
				console.log(err)
			}

			if (listaInscritos) {

				Curso.find().exec(
					(err, listaCursos) => {
						if (err) {
							console.log(err)
						}

						Estudiante.find().exec(
							(err, listaEstudiantes) => {
								if (err) {
									console.log(err)
								}
								res.render('cursosEstudiantes', {
									listaInscritos: listaInscritos,
									listaCursos: listaCursos,
									listaEstudiantes: listaEstudiantes
								})
							})
					});
			}
		});

});

app.post('/removeEnroll', (req, res) => {
	console.log(req.body.idCurso)

	Inscrito.findOneAndRemove({ idCurso: req.body.idCurso }, { idEstudiante: req.body.idEstudiante }, (err, result) => {
		if (err) {
			console.log(err)
		}

		//Refactorizar
		Inscrito.find().exec(
			(err, listaInscritos) => {
				if (err) {
					console.log(err)
				}

				if (listaInscritos) {

					Curso.find().exec(
						(err, listaCursos) => {
							if (err) {
								console.log(err)
							}

							Estudiante.find().exec(
								(err, listaEstudiantes) => {
									if (err) {
										console.log(err)
									}
									res.render('cursosEstudiantes', {
										listaInscritos: listaInscritos,
										listaCursos: listaCursos,
										listaEstudiantes: listaEstudiantes
									})
								})
						});
				}
			});


	})

	io.on('connection', function (socket) {
		Estudiante.countDocuments({ tipoUsuario: 'Estudiante' }, function (error, numOfDocs) {
			console.log('Actualmente la plataforma tiene ' + numOfDocs + ' estudiantes activos en cursos');
			io.emit('news', numOfDocs);
		});

	});
});


app.get('*', (req, res) => {
	res.render('error', {
		titulo: "Error 404",
	})
});


module.exports = app