import assert from "assert";
import supertest from "supertest";

import { connect, closeDatabase } from "../test.setup.js";
import { app } from "../server-express.js";

const request = supertest(app);

describe("Todos routes", () => {
	before(async () => {
		await connect();
	});

	after(async () => {
		await closeDatabase();
	});

	it.only("GET / - should return Hello World", async () => {
		const response = await request.get("/");

		assert.strictEqual(response.status, 200);
		assert.strictEqual(response.text, "Hello World");
	});
});
