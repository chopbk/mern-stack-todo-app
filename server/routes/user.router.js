var express = require('express');
var router = express.Router();
const logger = require("../logger");
// Load input validation
const validateRegisterInput = require("../services/validation/register-validation");
const validateLoginInput = require("../services/validation/login-validation");
const { ResSuccess, ResErr } = require("../common/response-request");


// Load User model
const User = require("../models/user.model");
// Load User services
const UserServices = require("../services/user.services");
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post("/register", validateRegisterMiddleware, checkEmailRegisterMiddleWare, async (req, res) => {
  try {
    user = await UserServices.userRegister(req.body);
    return ResSuccess(res, user, 200);
  } catch (error) {
    logger.debug("Register: " + error.message);
    return ResErr(res, error.message, 404);
  }
});

// route POST api/users/login
router.post("/login", validateLoginMiddleware, insertUserToReqMiddleWare, async (req, res) => {
  const password = req.body.password;
  const user = req.user;
  try {
    const token = await UserServices.userLogin(user, password);
    return ResSuccess(res, token, 200);
  } catch (error) {
    logger.debug("Login: " + error.message);
    return ResErr(res, error.message, 404);
  }
});
// middle function for validateLoginInput
function validateLoginMiddleware(req, res, next) {
  const { errors, isValid } = validateLoginInput(req.body);
  //check Validation
  if (!isValid) {
    logger.debug("validateLoginMiddleware: " + errors);
    return ResErr(res, { message: errors }, 400);
  }
  next();
}
// middle function for validateRegister
async function validateRegisterMiddleware(req, res, next) {
  console.log(req.body)
  const { errors, isValid } = await validateRegisterInput(req.body);
  //check Validation
  if (!isValid) {
    logger.debug("validateRegisterMiddleware: " + errors);
    return ResErr(res, { message: errors }, 400);
  }
  next();
}
// middle function for insertUserToReq 
async function insertUserToReqMiddleWare(req, res, next) {
  try {
    req.user = await UserServices.findUserByEmail(req.body.email);
    next();
  } catch (error) {
    logger.debug("insertUserToReqMiddleWare: " + error);
    return ResErr(res, error.message, 404);
  }
}
// middle function for check user exist in DB 
async function checkEmailRegisterMiddleWare(req, res, next) {
  try {
    check = await UserServices.findUserByEmail(req.body.email);
    return ResErr(res, { email: "Email is exist" }, 404);
  } catch (error) {
    next();
  }
}
module.exports = router;
