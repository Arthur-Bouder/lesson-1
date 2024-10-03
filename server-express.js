import express, { response } from "express";

const app = express();
const loggerMiddleware = (request, response, next) => {
	console.log("BEGIN");
	next();
};

const authMiddleware = (request, response, next) => {
	const tok = request.headers.token;

	if (tok === "aaa") {
		next();
	} else {
		response.status(403).send("Missing token");
	}
};

app.use(authMiddleware);

app.use(loggerMiddleware);

app.use(express.static("public"));

app.get("/json/*", (request, response) => {
	response.json({ message: "Hello, world!" });
});

app.get("/", (request, response) => {
	response.sendFile("index.html");
});

app.all("*", (request, response) => {
	response.status(404).send("Not found");
});

const PORT = 3000;
app.listen(PORT, () =>
	console.log(`Server running at http://localhost:${PORT}/`)
);
