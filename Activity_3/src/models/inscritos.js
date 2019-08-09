const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;
const inscritosSchema = new Schema({
	idCurso : {
		type : Number,
		required : true	,
		trim : true
	},
	idEstudiante : {
		type : Number,
		required : true	,
		trim : true
	}
});

inscritosSchema.plugin(uniqueValidator);

const Inscrito = mongoose.model('Inscrito', inscritosSchema);

module.exports = Inscrito