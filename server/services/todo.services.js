const Todo = require('../models/todo.model');
const logger = require('../logger');
/**
 * @des Find all todos in DB
 */
const findAllTodos = async () => {
    try {
        let todos = await Todo.find();
        // console.log(todos);
        // if (!Array.isArray(todos) || !todos.length)
        //     throw new Error("Todo not found");
        return todos;
    } catch (error) {
        logger.debug("findAllTodos: " + error.message);
        throw new Error("Todo not found");
    }
}
/**
 * @des Find todos in DB by todoID
 */
const findTodoByID = async (todoID) => {
    try {
        let todo = await Todo.findById(todoID)
        if (!todo) {
            throw new Error("Todo not found");
        }
        return todo;
    } catch (error) {
        logger.debug("findTodoByID: " + error.message);
        throw new Error("Todo not found")
    }
}
/**
 * @des Find todos in DB by user
 */
const findAllTodoByUser = async (user) => {
    try {
        let todos = await Todo.find({ todo_responsible: user.email });
        return todos;
    } catch (error) {
        logger.debug("findTodoByUser: " + error.message);
        throw new Error("Todo not found")
    }
}
/**
 * @des add New Todo to DB
 */
const addNewTodo = async (data) => {
    try {
        let todo = new Todo(data);
        await todo.save();
        if (!todo)
            throw new Error('adding new todo failed');
        //console.log(todo);
        return todo;
    } catch (error) {
        logger.debug("addNewTodo: " + error.message);
        throw new Error('adding new todo failed');
    }
}
/**
 * @des update Todo to DB
 */
const updateTodo = async (todo, data) => {
    try {
        todo.todo_responsible = data.todo_responsible;
        todo.todo_priority = data.todo_priority;
        todo.todo_completed = data.todo_completed;
        await todo.save();
        if (!todo) throw new Error('Update not possible');
        //console.log(todo);
        return todo;
    } catch (error) {
        logger.debug("updateTodo: " + error.message);
        throw new Error('Update todo not possible');
    }
}
/**
 * @des delete todo in DB
 */
const deleteTodo = async (todo) => {
    try {
        await todo.remove();
        let checkTodo = await Todo.findById(todo._id)
        if (checkTodo)
            throw new Error('Delete todo not possible');
        return;
    } catch (error) {
        logger.debug("deleteTodo: " + error.message);
        throw new Error('Delete todo not possible');
    }
}
module.exports = {
    findAllTodos,
    findTodoByID,
    addNewTodo,
    updateTodo,
    deleteTodo,
    findAllTodoByUser
}