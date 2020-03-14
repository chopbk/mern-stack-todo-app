var express = require('express');

//use express
const todoRouter = express.Router();
const Todo = require('../models/todo.model');
const validateTodoInput = require("../services/validation/todo-validation");
const TodoServices = require("../services/todo.services");
const { ResSuccess, ResErr } = require("../common/response-request");
// handle incoming HTTP GET request on the /todos/ URL path.
todoRouter.route('/').get(async function (req, res) {
    try {
        let todos = await TodoServices.findAllTodos();
        return ResSuccess(res, todos.map(todo => todo.toWeb()), 200);
    } catch (error) {
        console.log(error);
        return ResErr(res, error.message, 404);
    }
});
// add new todo items by sending a HTTP post request 
todoRouter.route('/add').post(validateTodoMiddleware,
    async function (req, res) {
        // Find user before add todo
        try {
            let todo = await TodoServices.addNewTodo(req.body);
            return ResSuccess(res, todo, 200);
        } catch (error) {
            return ResErr(res, error.message, 404);
        }
    });
// insert a todo item by providing an ID to req
todoRouter.use('/:id/', async function (req, res, next) {
    let id = req.params.id;
    try {
        let todo = await TodoServices.findTodoByID(id);
        if (todo)
            req.todo = todo;
        next();
    } catch (error) {
        return ResErr(res, error.message, 404);
    }
})
// retrieve a todo item by providing an ID
todoRouter.route('/:id').get(async function (req, res) {
    try {
        return ResSuccess(res, req.todo.toWeb(), 200);
    } catch (error) {
        return ResErr(res, error.message, 404);
    }
});
// update an existing todo item
todoRouter.route('/:id/').put(validateTodoMiddleware, async function (req, res) {
    try {
        let todo = await TodoServices.updateTodo(req.todo, req.body);
        return ResSuccess(res, todo, 200);
    } catch (error) {
        return ResErr(res, error.message, 404);
    }
});
todoRouter.route('/:id//').delete(async function (req, res) {
    try {
        await TodoServices.deleteTodo(req.todo);
        return ResSuccess(res, {}, 200);
    } catch (error) {
        return ResErr(res, error.message, 404);
    }
});


// middleware function check todo input
async function validateTodoMiddleware(req, res, next) {
    const { errors, isValid } = await validateTodoInput(req.body);
    if (!isValid) {
        return ResErr(res, errors.message, 404);
    }
    next();
}
module.exports = todoRouter;