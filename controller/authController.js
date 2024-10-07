import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

export const secret = "mysecret";

export const registerUser = async (req, res) => {
	const { email, password } = req.body;

	if (await User.findOne({ email })) {
		return res.status(400).send("User already exists");
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	const user = new User({
		email,
		password: hashedPassword,
	});

	await user.save();

	const token = jwt.sign({ email }, secret);

	res.send({ token });
};

export const loginUser = async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });
	if (!user) {
		return res.status(400).send("User not found");
	}

	const validPassword = await bcrypt.compare(password, user.password);
	if (!validPassword) {
		return res.status(400).send("Invalid password");
	}

	const token = jwt.sign({ email }, secret);
	res.send({ token });
};
