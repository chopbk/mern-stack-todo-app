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
// route POST api /login
router.post("/register", validateRegisterMiddleware, checkEmailRegisterMiddleWare, async (req, res) => {
  try {
    user = await UserServices.userRegister(req.body);
    return ResSuccess(res, user, 200);
  } catch (error) {
    logger.error("Register: " + error.message);
    return ResErr(res, error.message, 404);
  }
});

// route POST api /login
router.post("/login", validateLoginMiddleware, insertUserToReqMiddleWare, async (req, res) => {
  const password = req.body.password;
  const user = req.user;
  try {
    const token = await UserServices.userLogin(user, password);
    return ResSuccess(res, token, 200);
  } catch (error) {
    logger.error("Login: " + error.message);
    return ResErr(res, error.message, 404);
  }
});


// route GET api /list
router.get("/list", async (req, res) => {
  try {
    let users = await UserServices.findAllUser();
    return ResSuccess(res, users, 200);
  } catch (error) {
    logger.error("ListUser: " + error.message);
    return ResErr(res, error.message, 404);
  }
});
// insert a user item by providing an ID to req
router.use('/:user_id/', async function (req, res, next) {
  let user_id = req.params.user_id;
  try {
    let user = await UserServices.findUserByID(user_id);
    if (user)
      req.user = user;
    next();
  } catch (error) {
    return ResErr(res, error.message, 404);
  }
})
// route GET api /list
router.get("/:user_id", async (req, res) => {
  try {
    return ResSuccess(res, req.user.toWeb(), 200);
  } catch (error) {
    logger.error("GetUser: " + req.user._id + error.message);
    return ResErr(res, error.message, 404);
  }
});
// retrieve a user item by providing an ID
router.route('/:id').get(async function (req, res) {
  try {
    return ResSuccess(res, req.user.toWeb(), 200);
  } catch (error) {
    return ResErr(res, error.message, 404);
  }
});
// update an existing user item
router.route('/:id/').put(async function (req, res) {
  try {
    let user = await UserServices.updateUser(req.user, req.body);
    return ResSuccess(res, user, 200);
  } catch (error) {
    return ResErr(res, error.message, 404);
  }
});
// delete an existing user item
router.route('/:id/').delete(async function (req, res) {
  try {
    await UserServices.deleteUser(req.user);
    return ResSuccess(res, {}, 200);
  } catch (error) {
    return ResErr(res, error.message, 404);
  }
});

// middle function for validateLoginInput
function validateLoginMiddleware(req, res, next) {
  const { errors, isValid } = validateLoginInput(req.body);
  //check Validation
  if (!isValid) {
    logger.error("validateLoginMiddleware: " + errors);
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
    logger.error("validateRegisterMiddleware: " + errors);
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
    logger.error("insertUserToReqMiddleWare: " + error);
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
