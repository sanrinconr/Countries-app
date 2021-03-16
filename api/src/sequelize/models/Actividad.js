const {
	DataTypes
} = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define('Actividad', {
		Id: {
			type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
		},
		Nombre: {
			type: DataTypes.STRING(60),
			allowNull: false,
			unique:true
		},
		Dificultad: {
			type: DataTypes.STRING(1),
			allowNull: false,
		},
		Duracion: {
			type: DataTypes.SMALLINT,
			allowNull: false,
		},
        Temporada:{
            type: DataTypes.STRING(12),
            allowNull: false,
        }
	},{
        freezeTableName: true,
		timestamps:false
    });
};