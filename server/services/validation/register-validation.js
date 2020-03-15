const Validator = require("validator");
const isEmpty = require("is-empty");
// Load User services
//const UserServices = require("../user.services");

const validateRegisterInput = async (data) => {
    let errors = {};
    // Conver empty fileds to an empty string so we can use validator function
    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";

    // Name check
    if (Validator.isEmpty(data.name)) {
        errors.name = "Name field is required";
    }
    // Email checks
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }
    // Password checks

    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    } else {
        var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
        if (data.password.match(passw)) {
            errors.password = "Password must be at least 6 characters and at least\
         one numeric digit, one uppercase and one lowercase letter ";
        }

        if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
            errors.password = "Password must be at least 6 characters";
        }
        if (Validator.isEmpty(data.password2)) {
            errors.password2 = "Confirm password field is required";
        } else if (!Validator.equals(data.password, data.password2)) {
            errors.password2 = "Passwords must match";
        }
    }
    // try {
    //     if (isEmpty(errors)) {
    //         check = await UserServices.findUserByEmail(req.body.email);
    //         errors.email = "Email already exist";
    //     }
    // } catch (error) {
    //     logger.debug("nothing");
    // } finally {
    //     return {
    //         errors,
    //         isValid: isEmpty(errors)
    //     };
    // }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};
module.exports = validateRegisterInput;