const {
	Router
} = require('express');
const {
	models
} = require('../sequelize/db');

const router = Router();
const axios = require("axios")
router.get("/", function (req, res) {
	agregar10Primeros()
		.then((resp) => {
			res.send(resp)
		})
    //No se coloca catch pues en la funcion se maneja el error
})

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
module.exports = router;