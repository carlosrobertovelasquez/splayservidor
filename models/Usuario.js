import mongoose from 'mongoose';

const UsuarioSchema = mongoose.Schema({
	email: {
		type: String,
		required: true,
		trim: true,
		unique: true
	},
	telefono: {
		type: String,
		trim: true
	},
	password: {
		type: String,
		trim: true
	},
	nombre: {
		type: String,
		trim: true
	},
	apellido: {
		type: String,
		trim: true
	},
	genero: {
		type: String,
		trim: true
	},
	cumpleanoDia: {
		type: String
	},
	cumpleanoMes: {
		type: String
	},
	cumpleanoAno: {
		type: String
	},
	pais: {
		type: String
	},
	ciudad: {
		type: String
	},
	latitud: {
		type: String
	},
	longitud: {
		type: String
	},
	foto: {
		type: String
	},
	seguidores: Array,
	favoritos: Array,
	activo: {
		type: String,
		default: 'N'
	},
	confirmado: {
		type: String,
		default: 'N'
	},
	creado: {
		type: Date,
		default: Date.now()
	}
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
