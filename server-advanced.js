import http from "http";
import urlPackage from "url";
import fs from "fs";
import { addTodo, readTodos } from "./todosUtils.js";

// Define routes
const routes = {
	"/": {
		GET: (req, res) => {
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
		},
	},
	"/form": {
		GET: (req, res) => {
			// We fetch the content of the form.html
			const buffer = fs.readFileSync("form.html");
			res.writeHead(200, {
				"Content-Type": "text/html",
			});
			res.end(buffer);
			return;
		},
	},
	"/submit": {
		POST: (req, res) => {
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
		},
	},
};

const router = (req, res) => {
	const { method, url } = req;
	const pathname = urlPackage.parse(url).pathname;

	res.setHeader("Access-Control-Allow-Origin", "*");

	// Check if the method and URL are defined in the routes object
	if (routes[pathname] && routes[pathname][method]) {
		return routes[pathname][method](req, res);
	} else {
		// If not, return a 404 response
		res.writeHead(404, { "Content-Type": "text/plain" });
		res.end("Not Found\n");
	}
};

const server = http.createServer(router);

const PORT = 3000;
server.listen(PORT, () =>
	console.log(`Server running at http://localhost:${PORT}/`)
);
