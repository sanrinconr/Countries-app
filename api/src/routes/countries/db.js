const axios = require("axios");
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
	return buscarPaisLocal(nombre)
	.then(res=>{
		if(res){
			return res
		}else{
			return buscarPaisRemoto(nombre)
		}
	})

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
		
	}
    
}
function buscarPorId(idPais){
	return buscarPorIdLocal(idPais)
	.then(paisDetallado=>{
		if(paisDetallado){
			return paisDetallado
		}else{
			return buscarPorIdRemoto(idPais)
		}
	})
	.catch(err=>{
		return {error:"error al buscar el id",details:err}
	})
	/**
	 * Con esta funcion se valida que ya existan los detalles del pais en local
	 * sino se devuelve null
	 */
	function buscarPorIdLocal(idPais){
		return models.Pais.findOne({
			attributes:["Id","Nombre","Continente","Bandera","Capital","SubRegion","Area","Poblacion"],
			where:{
				Id:idPais
			}
		})
		.then(res=>{
			if(res.dataValues){
				return res.dataValues
			}else{
				return null
			}
		})
		.then(res=>{
			if(res.Poblacion !== null){
				return res
			}else{
				return null
			}
		})
		.catch(()=>null)
	}
	/**
	 * Se obtienen los detalles de la api y se meten a la base de datos
	 */
	function buscarPorIdRemoto(idPais){
		return axios.get(`https://restcountries.eu/rest/v2/alpha/${idPais}`)
		.then(res=>res.data)
		.then(res=>{
			return {
				id:idPais,
				nombre:res.name,
				continente:res.region,
				bandera:res.flag,
				capital:res.capital,
				subRegion:res.subregion,
				area:res.area,
				poblacion:res.population
			}
		})
		.then(res=>_agregarDetallePais(res))
	}



}

/**
 * Se agregan los detalles de un pais ya existente o no
 */
function _agregarDetallePais(paisDetalle){
	return models.Pais.findOrCreate({
		where:{
			Id: paisDetalle.id,
			Nombre: paisDetalle.nombre,
			Continente: paisDetalle.continente,
			Bandera: paisDetalle.bandera,
		},
		default:{
			Id: paisDetalle.id,
			Nombre: paisDetalle.nombre,
			Continente: paisDetalle.continente,
			Bandera: paisDetalle.bandera,
		}
	})
	.then(res=>res[0])
	.then(res=>{
		res.Capital=paisDetalle.capital
		res.SubRegion= paisDetalle.subRegion
		res.Area = paisDetalle.area
		res.Poblacion = paisDetalle.poblacion
		res.save()
		return res.dataValues
	})
	.catch(err=>{
		return {error:"error al agregar detalles del pais",detail:err}
	})
}

/**
 * Se obtiene el arreglo de las categorias que tiene un pais
 */
function getActividadesPais(idPais){
	return models.Pais.findOne({
		where:{
			Id:idPais
		}
	})
	.then(pais=>{
		//La s es por que sequelize espera un nombre el plural, pero como eso esta desactivado en
		//el modelo por motivos esteticos se le mete a la mala
		return pais.getActividads()
	})
	.then(actividades=>{
		let data = actividades.map(acti=>{
			let data = acti.dataValues
			return {Id:data.Id,
				Nombre:data.Nombre,
				Dificultad:data.Dificultad,
				Duracion:data.Duracion,
				Temporada:data.Temporada
			}
		})
		return data
	})
	.catch(err=>{
		return {error:"error al obtener actividades",detail:err}
	})
}

module.exports = {agregar10Primeros, buscarPais, buscarPorId, getActividadesPais}