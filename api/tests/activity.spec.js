const request = require("supertest");
const app = require("../src/app");
const dbConnection = require("../src/sequelize/db")

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
		const response = await request(app).post('/activity/delete').send(dataDelete)
	})
	//Se elimina testing luego de ser creado
	afterEach(async () => {
		const response = await request(app).post('/activity/').send(dataInsert)
	})
	it("Agregar", async (done) => {
		const response = await request(app).post('/activity').send(dataInsert)
		expect(response.statusCode).toBe(200)
		expect(response.body.nombre).toBe(dataInsert.nombre)
		done()
	})
	it("Eliminar", async (done) => {
		//Se crea
		await request(app).post('/activity').send(dataInsert)

		const responseDelete = await request(app).post('/activity/delete').send(dataDelete)
		expect(responseDelete.statusCode).toBe(200)
		expect(responseDelete.body.registrosEliminados).toBe("1")
		done()
	})

})

//https://github.com/facebook/jest/issues/7287
afterAll(() => async (done) => {
	// Closing the DB connection allows Jest to exit successfully.
	await dbConnection.close()
	done()
});