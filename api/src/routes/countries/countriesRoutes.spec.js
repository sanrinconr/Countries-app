const { expect } = require("chai");
const supertest = require("supertest");
const request = require("supertest");
const app = require("../../app");
const dbConnection = require("../../sequelize/db")
const s = supertest(app)


describe('Pagina home', () => {
	afterAll(() => async () => await dbConnection.models.close());
	test("GET /", async()=>{
		await supertest(app).get("/")
		.expect(200)
		.then(response=>{
			expect(response.body.mensaje).equal("Bienvenido a la api de paises")
		})
	})
})

describe('Pagina countries', () => {
	afterAll(() => async () => await dbConnection.models.close());

	test("GET /countries primeros 10 paises", async(done)=>{
		await supertest(app).get("/countries")
		.expect(200)
		.then(response=>{
			expect(response.body.length).equal(10)
			done()
		})
	},30000)

	test("GET /countries?page=1 primeros 10 paises", async(done)=>{
		await supertest(app).get("/countries?page=1")
		.expect(200)
		.then(response=>{
			expect(response.body[0].Id).equal("ARG")
			done()
		})
	})
})

describe("Filtros", () => {
	afterAll(() => async () => await dbConnection.models.close());

	test("GET /countries?page=0&orden=ASC  A-Z", async(done)=>{
		await supertest(app).get("/countries?page=0&orden=ASC")
		.expect(200)
		.then(response=>{
			expect(response.body[0].Id).equal("AFG")
			done()
		})
	})
	test("GET /countries?page=0&orden=ASC  Z-A", async(done)=>{
		await supertest(app).get("/countries?page=0&orden=DESC")
		.expect(200)
		.then(response=>{
			expect(response.body[0].Id).equal("ZWE")
			done()
		})
	})
})

afterAll(() => async (done) => {
	// Closing the DB connection allows Jest to exit successfully.
	await dbConnection.close()
	done()
});


