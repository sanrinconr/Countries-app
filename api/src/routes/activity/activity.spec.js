const supertest = require("supertest");

const app = require("../../app");
const dbConnection = require("../../sequelize/db")

const dataDelete = {
	nombre: "testing"
}
const dataInsert = {
	nombre: "testing",
	dificultad: "1",
	duracion: "12",
	temporada: "Invierno",
	paises: ["COL"]
}
describe("Actividad", () => {
	//Se elimina testing antes por si ya existe
	beforeEach(async () => {
		await supertest(app).post('/activity/delete').send(dataDelete)
	})
	//Se elimina testing luego de ser creado
	afterEach(async () => {
		await supertest(app).post('/activity/').send(dataInsert)
	})
	test("Agregar", async(done)=>{
		await supertest(app).post('/activity').send(dataInsert)
		.expect(200)
		.then(response=>{
			expect(response.body.nombre).toBe(dataInsert.nombre)
			done()
		})
	})
	test("Eliminar", async(done)=>{
		await supertest(app).post('/activity').send(dataInsert)
		await supertest(app).post('/activity/delete').send(dataDelete)
		.expect(200)
		.then(response=>{
			expect(response.body.registrosEliminados).toBe("1")
			done()
		})
	})
})

//https://github.com/facebook/jest/issues/7287
afterAll(() => async (done) => {
	// Closing the DB connection allows Jest to exit successfully.
	await dbConnection.close()
	done()
});