const bcryptjs = require('bcryptjs');
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const Usuario = require('../models/Usuario');
require('dotenv').config({ path: 'variables.env' });

async function nuevoUsuario(input) {
	const newUser = input;
	newUser.email = newUser.email.toLowerCase();

	const { email, password } = newUser;
	//Revisar si el Correo ya existe en la base de datos
	const existeEmail = await Usuario.findOne({ email });
	if (existeEmail) {
		throw new Error('El Correo ya esta registrado');
	}
	//Encriptar su password
	const salt = await bcryptjs.genSaltSync(10);
	newUser.password = await bcryptjs.hash(password, salt);
	try {
		//Guardar en la base de Datos
		const usuario = new Usuario(newUser);
		usuario.save(); //guardado
		return usuario;
	} catch (error) {
		console.log(error);
	}
}

const crearToken = (usuario, secreta, expiresIn) => {
	const { id, email, nombre, apellido } = usuario;
	return jwt.sign({ id, email, nombre, apellido }, secreta, { expiresIn });
};

async function autenticarUsuario(input) {
	//Si el usuario existe
	const { email, password } = input;
	const existeUsuario = await Usuario.findOne({ email: email.toLowerCase() });
	if (!existeUsuario) {
		throw new Error('El Usuario no existe');
	}
	// Revisar si el password es correcto
	const passwordCorrecto = await bcryptjs.compare(password, existeUsuario.password);
	if (!passwordCorrecto) {
		throw new Error('El Password es Incorrecto');
	}
	//Crear el token
	return {
		token: crearToken(existeUsuario, process.env.SECRETA, '24h')
	};
}
module.exports = { nuevoUsuario, autenticarUsuario };
