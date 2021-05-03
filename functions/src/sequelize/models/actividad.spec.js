

const { expect } = require("chai");
const {
    sequelize,
    dataTypes,
    checkModelName,
    checkUniqueIndex,
    checkPropertyExists 
  } = require('sequelize-test-helpers')
//Funcion que espera un parametro db
const ActividadModel = require("./Actividad")
//Se vincula modelo a la db de turno

describe("Actividad", ()=>{
  const Actividad = ActividadModel(sequelize)
  const actividad = new Actividad()
  checkModelName(Actividad)('Actividad')
  checkPropertyExists(actividad)("Id")
  checkPropertyExists(actividad)("Nombre")
  checkPropertyExists(actividad)("Dificultad")
  checkPropertyExists(actividad)("Duracion")
  checkPropertyExists(actividad)("Temporada")
})



