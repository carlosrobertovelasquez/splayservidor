const userController = require('../controlles/User');
const User = require('../models/User');
const resolvers = {
	Query: {
		obtenerUsuario: (_, args, { usuarioActual }) => {
			if (!usuarioActual) {
				return null;
			}
			console.log(usuarioActual);
			//Obtner el usuario Actual del request del jwt
			const user = User.finOne({ id: usuarioActual.id });
			return user;
		}
	},
	Mutation: {
		newUser: async (_, { input }) => userController.newUser(input),
		authenticateUser: async (_, { input }) => userController.authenticateUser(input),
		updateAvatar: (_, { file }) => userController.updateAvatar(file)
	}
};

module.exports = resolvers;
