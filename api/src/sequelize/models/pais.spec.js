

const { expect } = require("chai");
const {
    sequelize,
    dataTypes,
    checkModelName,
    checkUniqueIndex,
    checkPropertyExists 
  } = require('sequelize-test-helpers')
//Funcion que espera un parametro db
const PaisModel = require("./Pais")
//Se vincula modelo a la db de turno

describe("Pais", ()=>{
  const Pais = PaisModel(sequelize)
  const pais = new Pais()
  checkModelName(Pais)('Pais')
  checkPropertyExists(pais)("Id")
  checkPropertyExists(pais)("Nombre")
  checkPropertyExists(pais)("Continente")
  checkPropertyExists(pais)("Bandera")
  checkPropertyExists(pais)("Capital")
  checkPropertyExists(pais)("SubRegion")
  checkPropertyExists(pais)("Area")
  checkPropertyExists(pais)("Poblacion")
})



