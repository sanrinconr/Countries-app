const axios = require("axios");
const {models} = require('../../sequelize/db');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


function cargarDatosDB() {
	return _tienePaisesCargados()
	.then(cant=>{
		if(cant<=5){
			return _cargarDesdeApi()
		}
		return true
	})
	.catch(err=>{
		return {error:"hubo un error al cargar datos a la base de datos",detail:err}
	})
	
}
function _tienePaisesCargados(){
	return models.Pais.findAll({
		attributes:[
			[Sequelize.fn("COUNT",Sequelize.col("Id")),"cant_paises"]
		]
	})
	.then(res=>res[0].dataValues.cant_paises)
}
function _cargarDesdeApi(){
	return axios.get("https://restcountries.eu/rest/v2/all")
		.then(response => {
                let data = response.data.map(pais=>{
					return {
						Id: pais.alpha3Code,
						Nombre: pais.name,
						Continente: pais.region,
						Bandera: pais.flag
					}
				})
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
                .then(()=>{
                    return true
                })
                .catch(err=>{
                    return {error:"error", detail:err}
                })
		})
}
/**
 * Obtencion de los paises deacuerdo a los filtros que se envien
 * Pagina es el numero del paginado, 0,1,2,3,4,5
 * Actividad si se debe filtrar por alguna actividad, si llega null no se tendra en cuenta
 * Nombre si se debe filtrar por algun nombre, se llega null no se tendran en cuenta
 */
function getPaises(pagina, orden, actividad, nombre){	
	let paginado = pagina*10
	//https://sequelize.org/master/manual/eager-loading.html
	//https://sequelize.org/master/manual/naming-strategies.html
	return models.Pais.findAll({
		attributes:["Id","Nombre","Continente","Bandera"],
		offset:paginado,
		limit:10,
		where:nombre? {
			Nombre:{[Sequelize.Op.iLike]: `%${nombre}%`}
		} : "",
		include: { 
			association: 'Actividades' , 
			//Atributos tabla de rompimiento
			through: {
				attributes: []
			},
			//Atributos tabla actividad
			attributes:["Nombre"],
			where:actividad? {Nombre:actividad}:""
		},
		order: orden==="DESC" ? [['Nombre', "DESC"]]:[["Nombre"]],
	})
	.then(res=>{
		return res
		return res.map(pais=>pais.dataValues)})
	.catch(err=>{
		return {error:"No se pudo obtener los paises", details:err}
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
		return pais.getActividades()
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

module.exports = {cargarDatosDB,getPaises, buscarPorId, getActividadesPais}