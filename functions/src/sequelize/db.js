/**
 * En este archivo se configura la conexion 
 * a la base de datos, se obtienen los modelos
 * y se vinculan a esta.
 */


require('dotenv').config();
const {
	Sequelize
} = require('sequelize');

const path = require('path');
const {
	generarRelaciones
} = require('./relaciones');
const {
	inEmulator,
	getDatabaseURL
} = require('../config/db');


const sequelize = new Sequelize(getDatabaseURL(), {
	logging: false, // set to 
	native: false, // lets Sequelize know we can use pg-native for ~30% more speed
	dialect: "postgres",
	protocol: "postgres",
	dialectOptions: {
		native: true,
		ssl: inEmulator() ? "" : {
			require: true,
			rejectUnauthorized: false
		},
	}

});

const modelDefiners = [
	require("./models/Actividad"),
	require("./models/Pais")
];

// Injectamos la conexion (sequelize) a todos los modelos
for (const model of modelDefiners) {
	model(sequelize)
}

generarRelaciones(sequelize)

//Se cambia el export ya que es mas comodo usarlo asi.
//Base  en : https://github.com/sequelize/express-example
module.exports = sequelize