import { createServer } from "http";
import fs from "fs";
import { addTodo, readTodos } from "./todosUtils.js";

const server = createServer((req, res) => {
	if (req.method === "GET") {
		if (req.url === "/") {
			// We fetch the content of the index.html
			const buffer = fs.readFileSync("index.html");
			const stringPage = buffer.toString();

			// We fetch the todos
			const todos = readTodos();
			const todosList = todos.map((todo) => `<li>${todo}</li>`).join("");

			// We replace the {{todos}} from the index page by the actual todos
			const updatedPage = stringPage.replace("{{todos}}", todosList);

			res.writeHead(200, {
				"Content-Type": "text/html",
			});
			res.end(updatedPage);
			return;
		} else if (req.url === "/form") {
			// We fetch the content of the form.html
			const buffer = fs.readFileSync("form.html");
			res.writeHead(200, {
				"Content-Type": "text/html",
			});
			res.end(buffer);
			return;
		} else {
			// Default behavior if the route is not found
			res.writeHead(404, {
				"Content-Type": "text/plain",
			});
			res.end("Not Found");
		}
	} else if (req.method === "POST" && req.url === "/submit") {
		// We read the body of the request
		let body = "";
		req.on("data", (chunk) => {
			body += chunk.toString();
		});
		req.on("end", () => {
			const parsedBody = new URLSearchParams(body);
			const todo = parsedBody.get("todo");

			// We add the todo to the list
			addTodo(todo);

			// We redirect to the home page
			res.writeHead(302, {
				Location: "/",
			});
			res.end();
		});
	} else {
		// Default behavior if the method is not allowed
		res.writeHead(405, {
			"Content-Type": "text/plain",
		});
		res.end("Method Not Allowed");
	}
});

const PORT = 3000;
server.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}/`);
});
