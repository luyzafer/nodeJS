const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;
const estudianteSchema = new Schema({
	nombre : {
		type : String,
		required : true	,
		trim : true
	},
	email : {
		type : String,
		required : true	,
		trim : true
	},
	password :{
		type : String,
		required : true
	},
	documento : {
		type : Number,
		required : true	,
		trim : true
	},
	telefono : {
		type : Number,
		required : true	,
		trim : true
	},
	tipoUsuario : {
		type : String,
		required : true	,
		trim : true
	},
	photo : {
		type : Buffer
	}
});

estudianteSchema.plugin(uniqueValidator);

const Estudiante = mongoose.model('Estudiante', estudianteSchema);

module.exports = Estudiante