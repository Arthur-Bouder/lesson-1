import assert from "assert";
import supertest from "supertest";

import { connect, closeDatabase, clearDatabase } from "../test.setup.js";
import { app } from "../server-express.js";

const request = supertest(app);

describe("Todos routes", () => {
	before(async () => {
		await connect();
	});

	after(async () => {
		await closeDatabase();
	});

	afterEach(async () => {
		await clearDatabase();
	});

	it("GET /todos", (done) => {
		request.get("/todos").then((response) => {
			assert.strictEqual(response.status, 200);
			assert.strictEqual(response.body.length, 0);

			done();
		});
	});

	it("POST /todos", async () => {
		const response = await request.post("/todos").send({
			title: "Test",
		});
		assert.equal(response.status, 201);

		const getResponse = await request.get("/todos");

		assert.strictEqual(getResponse.body.length, 1);
		assert.strictEqual(getResponse.body[0].title, "Test");
	});
});
