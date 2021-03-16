const axios = require("axios");
const {models} = require('../../sequelize/db');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
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

function buscarPaises(nombre){
	let salida = []
	return buscarPaisesLocal(nombre)
	.then(res=>{
		if(res){
			salida = [...salida, ...res]
		}
		return buscarPaisesRemoto(nombre)
	})
	.then(paisesRemotos=>{
		salida = [...salida, ...paisesRemotos]
		//Eliminar duplicados
		//https://stackoverflow.com/questions/2218999/how-to-remove-all-duplicates-from-an-array-of-objects?noredirect=1
		salida = salida.filter((v,i,a)=>a.findIndex(t=>(t.Id === v.Id))===i)
		//V es el elemento, i es el index del elemento actual, a es el arreglo original
		return salida
	})
	.catch(err=>{
		return {error:"Error al buscar pais por nombre",details:err}
	})

	function buscarPaisesLocal(nombre){
		return models.Pais.findAll({
			attributes:["Id","Nombre","Continente","Bandera"],
			where:{
				Nombre:{[Sequelize.Op.iLike]: nombre}
			}
		})
		.then(res=>{
			if(res.length === 0){
				return null
			}else{
				return res.map(pais=>pais.dataValues)
			}
		})
	}
	function buscarPaisesRemoto(nombre){
		return axios.get("https://restcountries.eu/rest/v2/name/"+nombre)
		.then(res=>res.data)
		.then(res=>{
			return res.map(pais=>{
				return {
					id:pais.alpha3Code,
					nombre:pais.name,
					continente:pais.region,
					bandera:pais.flag,
					capital:pais.capital
				}
			})
		})
		.then(paisesBasicos=>{
			return _agregarPaisesBasico(paisesBasicos)
		})
	}
    
}

/**
 * Se agrega un nuevo pais en su version basica
 */
function _agregarPaisesBasico(paises){
		return Promise.all(paises.map(pais=>{
			return models.Pais.findOrCreate({
				where:{
					Id: pais.id,
					Nombre: pais.nombre,
					Continente: pais.continente,
					Bandera: pais.bandera,
					Capital: pais.capital
				},
				default:{
					Id: pais.id,
					Nombre: pais.nombre,
					Continente: pais.continente,
					Bandera: pais.bandera,
					Capital: pais.capital
				}
			})
		}))
		
		//Si todo fue correcto y se agrego, entonces se retorna data
		.then(res=>{
			//Como queda envuelto en un arreglo cada pais (por el promise) y ademas en otro por el find toca reorganizar
			return res.map(el=>el[0].dataValues)
		})
		.then((res)=>{
			return res.map(pais=>{
				return {
					Id:pais.Id, 
					Nombre:pais.Nombre, 
					Continente:pais.Continente, 
					Bandera:pais.Bandera, 
					Capital:pais.Capital}
			})
		})
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

module.exports = {agregar10Primeros, buscarPaises, buscarPorId, getActividadesPais}