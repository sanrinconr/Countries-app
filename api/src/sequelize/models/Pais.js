const {
	DataTypes
} = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define('Pais', {
		Id: {
			type: DataTypes.STRING(3),
			primaryKey: true
		},
		Nombre: {
			type: DataTypes.STRING(55),
			allowNull: false,
		},
		Continente: {
			type: DataTypes.STRING(25),
			allowNull: false,
		},
		Capital: {
			type: DataTypes.STRING(70),
			allowNull: false,
		}
	},{freezeTableName: true,});
};