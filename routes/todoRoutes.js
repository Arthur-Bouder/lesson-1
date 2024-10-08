import express from "express";
import {
	getAll,
	getOne,
	addOne,
	removeOne,
} from "../controller/todosController.js";

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getOne);

router.post("/", addOne);

router.delete("/:id", removeOne);

router.all("*", (req, res) => {
	res.status(404).send("Not found");
});

router.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send("Something broke!");
});

export default router;
