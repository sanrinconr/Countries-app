//Hecho con base en  https://github.com/sequelize/express-example
function generarRelaciones(sequelize) {
	const { Actividad, Pais } = sequelize.models;

	Actividad.belongsToMany(Pais , 
		{timestamps:false,foreignKey:"Actividad_id", through: "Actividad_Pais", as: {
			singular: 'Pais',
			plural: 'Paises'
		  }},
		);
	Pais.belongsToMany(Actividad , {timestamps:false, foreignKey:"Pais_id", through: "Actividad_Pais", as: {
		singular: 'Actividad',
		plural: 'Actividades'
	  }});
    sequelize.sync({alter:true})
}

module.exports = { generarRelaciones };
