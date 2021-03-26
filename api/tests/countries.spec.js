const request = require("supertest");
const app = require("../src/app");
const dbConnection = require("../src/sequelize/db")

describe('Pagina home', () => {
	it('Pagina de bienvenida api', async (done) => {
		const response = await request(app).get('/')
		expect(response.statusCode).toBe(200)
		expect(response.body.mensaje).toBe("Bienvenido a la api de paises")
		done()
	})
})

describe('Pagina countries', () => {
	it('Se obtinen los primeros 10 paises', async (done) => {
		const response = await request(app).get('/countries')
		expect(response.statusCode).toBe(200)
		expect(response.body.length).toBe(10)
		done()
	})
	it('El primer pais debe ser AFG', async (done) => {
		const response = await request(app).get('/countries')
		expect(response.body[0].Id).toBe("AFG")
		done()
	})
	it('Paginado, primer pais de la pagina 1', async (done) => {
		const response = await request(app).get('/countries?page=1')
		expect(response.body[0].Id).toBe("ARG")
		done()
	})
})

describe("Filtros", () => {
	it("Filtrado de A-Z", async (done) => {
		const response = await request(app).get('/countries?page=0&orden=ASC  ')
		expect(response.statusCode).toBe(200)
		expect(response.body[0].Id).toBe("AFG")
		done()
	})
	it("Filtrado Z-A", async (done) => {
		const response = await request(app).get('/countries?page=0&orden=DESC  ')
		expect(response.statusCode).toBe(200)
		expect(response.body[0].Id).toBe("ZWE")
		done()
	})
})



//https://github.com/facebook/jest/issues/7287
afterAll(() => async (done) => {
	// Closing the DB connection allows Jest to exit successfully.
	await dbConnection.close()
	done()
});