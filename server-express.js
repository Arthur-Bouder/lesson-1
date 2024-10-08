import express from "express";
import mongoose from "mongoose";

export const app = express();
app.use(express.json());

app.get("/", (request, response) => {
	response.send("Hello World");
});

app.all("*", (request, response) => {
	response.status(404).send("Not found");
});

const PORT = 3000;
const dbUrl = "mongodb+srv://admin:admin@supinfo.geyhi.mongodb.net/";
mongoose.connect(dbUrl).then((result) => {
	console.log("Connected to database");
	app.listen(PORT, () =>
		console.log(`Server running at http://localhost:${PORT}/`)
	);
});
