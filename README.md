# Todo List Server

This is a simple Node.js server for managing a todo list. The server serves HTML pages and processes form submissions.

## Features

- View the todo list.
- Add new todos via an HTML form.

## Project Structure

- `server-advanced.js`: The main server file that handles routing and processes HTTP requests.
- `todosUtils.js`: Utility file for adding and reading todos.
- `index.html`: HTML file that displays the todo list with a placeholder `{{todos}}`.
- `form.html`: HTML file that contains a form to submit new todos.

## Usage

1. Clone the repository and navigate to the project directory.

2. Start the server. To do it, either launch ```node server.js``` or ```node server-advanced.js```

3. Open your browser and navigate to:
   - The main page to view the todo list.
   - The form page to add a new todo.

## Routes

- `GET /`: Displays the todo list.
- `GET /form`: Displays the form to add a new todo.
- `POST /submit`: Adds a new todo from form input.
