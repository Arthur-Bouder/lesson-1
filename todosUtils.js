import fs from "fs";

const todosPath = "todos.json";

export const readTodos = () => {
	const buffer = fs.readFileSync(todosPath);

	const todos = JSON.parse(buffer.toString());

	return todos;
};

export const addTodo = (newTodo) => {
	const todos = readTodos();

	todos.push(newTodo);

	fs.writeFileSync(todosPath, JSON.stringify(todos));
};

export const removeTodo = (index) => {
	const todos = readTodos();

	todos.splice(index, 1);

	fs.writeFileSync(todosPath, JSON.stringify(todos));
};

export const removeTodos = () => {
	const newTodos = [];

	fs.writeFileSync(todosPath, JSON.stringify(newTodos));
};
