import express, { response } from "express";

const app = express();
const loggerMiddleware = (request, response, next) => {
	console.log("BEGIN");
	next();
};

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
