var express = require('express');
var router = express.Router();

// Simulated database of todos
let todos = [
    { id: 1, title: 'Learn Express', description: 'Study the basics of Express', status: 'pending' }
];

// Utility function to find a todo by id
const findTodoById = (id) => todos.find(todo => todo.id === id);

// (4) Read all todos
router.get('/todos', function(req, res, next) {
    res.json(todos);
});

// (5) Read single todo
router.get('/todos/:id', function(req, res, next) {
    const todo = findTodoById(parseInt(req.params.id));
    if (todo) {
        res.json(todo);
    } else {
        res.status(404).send('Todo not found');
    }
});

// (1) Create todo
router.post('/todos', function(req, res, next) {
    const { title, description, status } = req.body;
    const newTodo = { id: todos.length + 1, title, description, status };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// (2) Update todo
router.put('/todos/:id', function(req, res, next) {
    const todo = findTodoById(parseInt(req.params.id));
    if (todo) {
        todo.title = req.body.title || todo.title;
        todo.description = req.body.description || todo.description;
        todo.status = req.body.status || todo.status;
        res.json(todo);
    } else {
        res.status(404).send('Todo not found');
    }
});

// (3) Delete todo
router.delete('/todos/:id', function(req, res, next) {
    const index = todos.findIndex(todo => todo.id === parseInt(req.params.id));
    if (index > -1) {
        todos.splice(index, 1);
        res.status(204).send(); // No content to send back
    } else {
        res.status(404).send('Todo not found');
    }
});

module.exports = router;
