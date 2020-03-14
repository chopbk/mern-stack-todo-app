const Validator = require("validator");
const isEmpty = require("is-empty");
const User = require('../../models/user.model');
const validateTodoInput = async (data) => {
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.todo_description = !isEmpty(data.todo_description) ? data.todo_description.toString() : "";
    data.todo_responsible = !isEmpty(data.todo_responsible) ? data.todo_responsible.toString() : "";
    data.todo_completed = !isEmpty(data.todo_completed) ? data.todo_completed.toString() : "";
    // Email checks
    if (Validator.isEmpty(data.todo_description)) {
        errors.message = {
            todo_description: "Todo description field is required"
        }
    }
    if (Validator.isEmpty(data.todo_responsible)) {
        errors.message = {
            ...errors.message,
            todo_responsible: "Todo responsible field is required"
        }

    }
    if (Validator.isEmpty(data.todo_responsible)) {
        errors.message = {
            ...errors.message,
            todo_responsible: "Todo responsible field is required"
        }
    }
    if (!Validator.isBoolean(data.todo_completed)) {
        errors.message = {
            ...errors.message,
            todo_completed: "Todo todo_completed field must be a Boolean value"
        }
    }
    try {
        let user = await User.findOne({ email: data.todo_responsible });
        if (!user) {
            errors.message = {
                ...errors.message,
                todo_responsible: "Todo Reponsible (User) does not exist"
            }
        }
    } catch (error) {
        logger.debug("validateTodoInput: " + error.message);
        errors.message = {
            ...errors.message,
            todo_responsible: "Todo Reponsible (User) does not exist"
        }
    } finally {
        return {
            errors,
            isValid: isEmpty(errors)
        };
    }
};
module.exports = validateTodoInput;