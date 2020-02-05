var express = require('express');

//use express
const todoRoutes = express.Router();
const Todo = require('../models/todo.model');
const validateTodoInput = require("../validation/todo");
// handle incoming HTTP GET request on the /todos/ URL path.
todoRoutes.route('/').get(function (req, res) {
    Todo.find(function (err, todos) {
        if (err) {
            console.log(err);
        } else {
            res.json(todos);
        }
    });
});
// retrieve a todo item by providing an ID
todoRoutes.route('/:id').get(function (req, res) {
    let id = req.params.id;
    Todo.findById(id, function (err, todo) {
        res.json(todo);
    });
});
// add new todo items by sending a HTTP post request 
todoRoutes.route('/add').post(function (req, res) {
    const { errors, isValid } = validateTodoInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    let todo = new Todo(req.body);
    todo.save()
        .then(todo => {
            res.status(200).json({ 'todo': `todo added successfully with id: ${todo.id}` });
        })
        .catch(err => {
            res.status(400).send('adding new todo failed');
        });
});
// update an existing todo item
todoRoutes.route('/update/:id').post(function (req, res) {
    const { errors, isValid } = validateTodoInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    Todo.findById(req.params.id, function (err, todo) {
        if (!todo)
            res.status(404).send("data is not found");
        todo.todo_description = req.body.todo_description;
        todo.todo_responsible = req.body.todo_responsible;
        todo.todo_priority = req.body.todo_priority;
        todo.todo_completed = req.body.todo_completed;

        todo.save().then(todo => {
            res.json('Todo updated!');
        })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});
todoRoutes.route('/update/:id').delete(function (req, res) {
    Todo.deleteOne({ _id: req.params.id }, function (err, todo) {
        if (err) {
            throw err;
        }
        else {
            console.log(todo);
            if (todo.deletedCount !== 0) {
                console.log("1 document deleted");
                return res.json('1 document deleted');
            }
            return res.status(404).send("data is not found");
        }

    });
});


module.exports = todoRoutes;