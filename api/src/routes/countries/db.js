const axios = require("axios")
const {models} = require('../../sequelize/db');

function agregar10Primeros() {
	return axios.get("https://restcountries.eu/rest/v2/all")
		.then(response => {
                let data = []
				//Se toman los 10 primeros y se agrega id nombre continente bandera
				for (let i = 0; i < 10; i++) {
					data.push({
						Id: response.data[i].alpha3Code,
						Nombre: response.data[i].name,
						Continente: response.data[i].region,
						Bandera: response.data[i].flag
					})
				}
				//Se crean 10 promesas, cada una agrega un pais
				//https://stackoverflow.com/questions/57599494/sequelize-findorcreate-loop-not-finding-newly-created-rows
				return Promise.all(data.map(country => {
					return models.Pais.findOrCreate({
						where: {
							Id: country.Id,
							Nombre: country.Nombre,
							Continente: country.Continente,
							Bandera: country.Bandera,
						},
						default: {
							Id: country.Id,
							Nombre: country.Nombre,
							Continente: country.Continente,
							Bandera: country.Bandera,
						}
					})
				}))
                //Si todo fue correcto y se agrego, entonces se retorna data
                .then(()=>{
                    return data
                })
                .catch(err=>{
                    return {error:"error", detail:err}
                })
		})
}

function buscarPais(nombre){
	function buscarPaisLocal(nombre){
		return models.Pais.findAll({
			attributes:["Id","Nombre","Continente","Bandera"],
			where:{
				Nombre:nombre
			}
		})
		.then(res=>{
			if(res.length === 0){
				return null
			}else{
				return res.map(pais=>pais.dataValues)
			}
		})
		.catch(err=>console.log(err))
	}
	function buscarPaisRemoto(nombre){
		console.log("Entrando a buscar en api")
	}
	return buscarPaisLocal(nombre)
    
}

module.exports = {agregar10Primeros, buscarPais}