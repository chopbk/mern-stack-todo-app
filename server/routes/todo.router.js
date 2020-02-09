var express = require('express');

//use express
const todoRoutes = express.Router();
const Todo = require('../models/todo.model');
const User = require('../models/user.model');
const validateTodoInput = require("../validation/todo");
// handle incoming HTTP GET request on the /todos/ URL path.
todoRoutes.route('/').get(async function (req, res) {
    try {
        let todos = await Todo.find();
        if (!todos)
            throw new Error("Todo not found");
        res.json(todos);
    } catch (error) {
        console.log(err);
    }
});
// retrieve a todo item by providing an ID
todoRoutes.route('/:id').get(async function (req, res) {
    let id = req.params.id;
    try {
        let todo = await Todo.findById(id)
        if (!todo) {
            throw new Error("Todo not found")
        }
        res.json(todo);
    } catch (error) {
        res.status(400).json(error.message);
    }
});
// add new todo items by sending a HTTP post request 
todoRoutes.route('/add').post(async function (req, res) {
    const { errors, isValid } = validateTodoInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    // Find user before add todo
    try {
        let user = await User.findOne({ email: req.body.todo_responsible });
        if (!user) {
            throw new Error('user does not exist');
        }
        let todo = new Todo(req.body);
        const todoDb = await todo.save();
        if (!todoDb)
            throw new Error('adding new todo failed');
        res.status(200).json({ 'todo': `todo added successfully with id: ${todoDb.id}` });
    } catch (err) {
        res.status(400).json(error.message);
    }
});
// update an existing todo item
todoRoutes.route('/update/:id').post(async function (req, res) {
    const { errors, isValid } = validateTodoInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    try {
        let todo = await Todo.findById(req.params.id)
        if (!todo)
            res.status(404).send("todo is not found");
        todo.todo_description = req.body.todo_description;
        let user = await User.findOne({ email: req.body.todo_responsible });
        if (!user) {
            throw new Error('user does not exist');
        }
        todo.todo_responsible = req.body.todo_responsible;
        todo.todo_priority = req.body.todo_priority;
        todo.todo_completed = req.body.todo_completed;
        await todo.save();
        if (!todo) throw new Error('Update not possible');
        res.json('Todo updated!');
    } catch (error) {
        res.status(400).json(error.message);
    }


});
todoRoutes.route('/update/:id').delete(async function (req, res) {
    try {
        let todo = await Todo.deleteOne({ _id: req.params.id });
        console.log(todo.deletedCount);
        if (todo.deletedCount !== 0) {
            return res.json('1 document deleted');
        }
        throw new Error("data is not found");
    } catch (error) {
        res.status(400).json(error.message);
    }
});



module.exports = todoRoutes;