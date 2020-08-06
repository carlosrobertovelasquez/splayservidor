const usuarioController = require('../controlles/Usuario');
const favoritoControlle = require('../controlles/Favorito');
const Usuario = require('../models/Usuario');
const resolvers = {
	Query: {
		obtenerUsuario: (_, args, { usuarioActual }) => {
			if (!usuarioActual) {
				return null;
			}
			console.log(usuarioActual);
			//Obtner el usuario Actual del request del jwt
			const usuario = Usuario.finOne({ id: usuarioActual.id });
			return usuario;
		},
		obtenerFavoritos: async () => {
			try {
				const favoritos = await Favorito.find({});
				return favoritos;
			} catch (error) {
				console.log(error);
			}
		},
		obtenerFavorito: async (_, { id }) => {
			// revisar si el  favorito existe
			const favorito = await Favorito.findById(id);
			if (!favorito) {
				throw new Error('Favorito no encontrado');
			}
			return favorito;
		}
	},
	Mutation: {
		nuevoUsuario: async (_, { input }) => usuarioController.nuevoUsuario(input),
		autenticarUsuario: async (_, { input }) => usuarioController.autenticarUsuario(input),
		nuevoFavorito: async (_, { input }) => favoritoControlle.nuevoUsuario(input),
		actualizarFavorito: async (_, { id, input }) => favoritoControlle.actualizarFavorito(input),
		eliminarFavorito: async (_, { id }) => favoritoControlle.eliminarFavorito(id)
	}
};

module.exports = resolvers;
