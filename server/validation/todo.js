const Validator = require("validator");
const isEmpty = require("is-empty");
const validateTodoInput = (data) => {
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.todo_description = !isEmpty(data.todo_description) ? data.todo_description : "";
    data.todo_responsible = !isEmpty(data.todo_responsible) ? data.todo_responsible : "";
    // Email checks
    if (Validator.isEmpty(data.todo_description)) {
        errors.todo_description = "Todo description field is required";
    }
    if (Validator.isEmpty(data.todo_responsible)) {
        errors.todo_responsible = "Todo responsible field is required";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};
module.exports = validateTodoInput;