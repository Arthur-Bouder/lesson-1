import jwt from "jsonwebtoken";
import { secret } from "../controller/authController.js";

export const authMiddleware = (req, res, next) => {
	const auth = req.headers.authorization;

	const token = auth?.split(" ")[1];

	if (!token) {
		res.status(401).send("Unauthorized");
	}

	try {
		const decoded = jwt.verify(token, secret);

		req.user = decoded;
		next();
	} catch (e) {
		res.status(401).send("Unauthorized");
	}
};
