/**
 * En este archivo se configura la conexion 
 * a la base de datos, se obtienen los modelos
 * y se vinculan a esta.
*/


require('dotenv').config();
const {
	Sequelize
} = require('sequelize');

const fs = require('fs');
const path = require('path');
const {DB_USER,DB_PASSWORD, DB_HOST, DB_NAME} = process.env;
const { generarRelaciones } = require('./relaciones');

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
	logging: false, // set to console.log to see the raw SQL queries
	native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});

const basename = path.basename(__filename);
const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
	.filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
	.forEach((file) => {
		modelDefiners.push(require(path.join(__dirname, '/models', file)));
	});

// Injectamos la conexion (sequelize) a todos los modelos
for(const model of modelDefiners){
	model(sequelize)
}

generarRelaciones(sequelize)

//Se cambia el export ya que es mas comodo usarlo asi.
//Base  en : https://github.com/sequelize/express-example
module.exports = sequelize