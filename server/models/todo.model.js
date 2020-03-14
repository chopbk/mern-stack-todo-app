const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Todo = new Schema({
    todo_description: {
        type: String
    },
    todo_responsible: {
        type: String
    },
    todo_priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'low'
    },
    todo_completed: {
        type: Boolean,
        default: `false`
    }
});
Todo.methods.toWeb = function () {
    todo = this;
    return {
        _id: todo._id,
        todo_description: todo.todo_description,
        todo_responsible: todo.todo_responsible,
        todo_priority: todo.todo_priority,
        todo_completed: todo.todo_completed
    }

};
module.exports = mongoose.model('Todo', Todo);