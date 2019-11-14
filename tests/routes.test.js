const request = require("supertest")
const app = require("../index")
describe("Admin Endpoints", () => {
	it("should create a new admin", async () => {
		const res = await request(app)
			.post("/admin")
			.send({
				email: "admin@test.com",
				password: "test"
			})
		expect(res.statusCode).toEqual(201)
		expect(res.body).toHaveProperty("email")
	})
})
