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

	return newTodo;
};

export const removeTodo = (id) => {
	const todos = readTodos();

	const newTodos = todos.filter((todo) => todo.id !== id);

	fs.writeFileSync(todosPath, JSON.stringify(newTodos));

	return newTodos;
};

export const removeTodos = () => {
	const newTodos = [];

	fs.writeFileSync(todosPath, JSON.stringify(newTodos));

	return newTodos;
};
