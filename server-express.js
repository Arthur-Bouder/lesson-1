import express from "express";
import path from "path";
import mongoose from "mongoose";
import { User } from "./models/userModel.js";

// Allow to use __dirname in a "type": "module" project
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import todosRouter from "./routes/todoRoutes.js";
import { loginUser, registerUser } from "./controller/authController.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";

const app = express();
app.use(express.json());

app.post("/register", registerUser);
app.post("/login", loginUser);

app.use(authMiddleware);

app.use("/todos", todosRouter);

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
