const express = require("express");
const cors = require("cors");

const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(request, response, next) {
  const { username } = request.headers;

  const checkIfUserExists = users.find((user) => user.username === username);

  if (!checkIfUserExists) {
    return response.status(400).json({
      error: "User already exists!",
    });
  } else {
    request.user = checkIfUserExists;
  }

  return next();
}

app.post("/users", (request, response) => {
  const { name, username } = request.body;

  const checkIfUserExists = users.find((user) => user.username === username);

  if (!checkIfUserExists) {
    const user = {
      id: uuidv4(),
      name,
      username,
      todos: [],
    };
    users.push(user);

    return response.status(201).json(user);
  } else {
    return response.status(400).json({ error: "User already exists!" });
  }
});

app.get("/todos", checksExistsUserAccount, (request, response) => {
  const { todos } = request.user;

  return response.status(201).json(todos);
});

app.post("/todos", checksExistsUserAccount, (request, response) => {
  const { title, deadline } = request.body;
  const { user } = request;

  const todo = {
    id: uuidv4(),
    title,
    done: false,
    deadline,
    created_at: new Date(),
  };

  user.todos.push(todo);

  return response.status(200).json(todo);
});

app.put("/todos/:id", checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.patch("/todos/:id/done", checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.delete("/todos/:id", checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

module.exports = app;
