import { Todo } from "../models/todoModel.js";

export const getAll = async (req, res) => {
	const todos = await Todo.find();

	res.send(todos);
};

export const getOne = async (req, res) => {
	const todoId = req.params.id;
	const todo = await Todo.findById(todoId);

	if (todo) {
		res.send(todo);
	} else {
		res.status(404).send("Not found");
	}
};

export const addOne = async (req, res) => {
	const partialTodo = req.body;
	const newTodo = {
		title: partialTodo.title,
		completed: false,
	};

	await Todo.create(newTodo);

	res.status(201).send(newTodo);
};

export const removeOne = async (req, res) => {
	const todoId = req.params.id;

	await Todo.findByIdAndDelete(todoId);

	res.send("Ok");
};
