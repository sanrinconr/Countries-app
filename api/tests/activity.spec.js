const request = require("supertest");
const app = require("../src/app");
const dbConnection = require("../src/sequelize/db")

beforeAll(()=>{
})
describe("Actividad", () => {
	describe("Agregar", () => {
		beforeEach(async () => {
			const data = {
				nombre: "testing"
			}
			const response = await request(app).post('/activity/delete').send(data)
		})
		it("Agregar", async (done) => {
			const data = {
				nombre: "testing",
				dificultad: "1",
				duracion: "12",
				temporada: "Invierno",
				paises: ["COL"]
			}
			const response = await request(app).post('/activity').send(data)
			expect(response.statusCode).toBe(200)
			expect(response.body.nombre).toBe(data.nombre)
			done()
		})
	})
	describe("Eliminar", () => {
		beforeEach(async () => {
			const data = {
				nombre: "testing"
			}
			const response = await request(app).post('/activity/delete').send(data)
		})
		it("Eliminar", async (done) => {
			const data = {
				nombre: "testing",
				dificultad: "1",
				duracion: "12",
				temporada: "Invierno",
				paises: ["COL"]
			}
			const dataDelete = {
				nombre: "testing"
			}
			const response = await request(app).post('/activity').send(data)
			const responseDelete = await request(app).post('/activity/delete').send(dataDelete)
			expect(responseDelete.statusCode).toBe(200)
			expect(responseDelete.body.registrosEliminados).toBe("1")
			done()
		})
	})
})

afterAll(() => async (done) => {
	// Closing the DB connection allows Jest to exit successfully.
	await dbConnection.close()
	done()
});