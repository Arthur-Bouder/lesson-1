import express from "express";
import path from "path";

// Allow to use __dirname in a "type": "module" project
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import todosRouter from "./routes/todoRoutes.js";

const app = express();
app.use(express.json());

app.use("/todos", todosRouter);

app.get("/form", (request, response) => {
	response.sendFile(__dirname + "/public/form.html");
});

app.all("*", (request, response) => {
	response.status(404).send("Not found");
});

const PORT = 3000;
app.listen(PORT, () =>
	console.log(`Server running at http://localhost:${PORT}/`)
);
