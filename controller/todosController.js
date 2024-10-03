import { readTodos, addTodo, removeTodo, removeTodos } from "../todosUtils.js";

export const getAll = async (req, res) => {
	const todos = await readTodos();

	res.send(todos);
};

export const getOne = (req, res) => {
	const todoId = req.params.id;
	const todos = readTodos();
	const todo = todos.find((todo) => todo.id === todoId);

	if (todo) {
		res.send(todo);
	} else {
		res.status(404).send("Not found");
	}
};

// Waiting for a body of type { "title": string}
export const addOne = (req, res) => {
	const partialTodo = req.body;
	const newTodo = {
		id: Math.random().toString(36).substr(2, 9),
		title: partialTodo.title,
		completed: false,
	};

	addTodo(newTodo);

	res.status(201).send(newTodo);
};

export const removeOne = (req, res) => {
	const todoId = req.params.id;

	const newTodos = removeTodo(todoId);

	res.send(newTodos);
};

export const removeAll = (req, res) => {
	const newTodos = removeTodos();

	res.send(newTodos);
};
