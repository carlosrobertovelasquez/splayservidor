async function nuevoFavorito(input) {
	try {
		const favoirto = new Favorito(input);
		//almacenar en la bs
		const resultado = await favoirto.save();
		return resultado;
	} catch (error) {
		console.log(error);
	}
}
async function actualizarFavorito(input) {
	let favorito = await Favorito.findById(id);
	if (!favorito) {
		throw new Error('Favorito no existe');
	}
	// guardar en base de datos
	favorito = await Favorito.findOneAndUpdate({ _id: id }, input, { new: true });
	return favorito;
}
async function eliminarFavorito(id) {
	let favorito = await Favorito.findById(id);

	if (!favorito) {
		throw new Error('Favorito no existe');
	}
	//eliminar
	await Favorito.findOneAndDelete({ _id: id });

	return 'Favorito Eliminado';
}

module.exports = {
	nuevoFavorito,
	actualizarFavorito,
	eliminarFavorito
};
