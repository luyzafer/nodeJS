const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;
const cursoSchema = new Schema({
	nombre : {
		type : String,
		required : true	,
		trim : true
	},
	id : {
		type : Number,
		required : true	,
		trim : true
	},
	descripcion :{
		type : String,
		required : true
	},
	valor : {
		type : Number,
		required : true	,
		trim : true
	},
	modalidad : {
		type : String,
		required : false	,
		trim : true
	},
	intensidadHoraria : {
		type : Number,
		required : false	,
		trim : true
	},
	estado : {
		type : String,
		required : true	,
		trim : true
	}
});

cursoSchema.plugin(uniqueValidator);

const Curso = mongoose.model('Curso', cursoSchema);

module.exports = Curso