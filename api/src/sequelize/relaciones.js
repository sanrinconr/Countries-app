//Hecho con base en  https://github.com/sequelize/express-example
function generarRelaciones(sequelize) {
	const { Actividad, Pais } = sequelize.models;

	Actividad.belongsToMany(Pais , {foreignKey:"Actividad_id", through: "Actividad_tiene_pais"});
	Pais.belongsToMany(Actividad , {foreignKey:"Pais_id", through: "Actividad_tiene_pais"});
    sequelize.sync({force:true})
}

module.exports = { generarRelaciones };
