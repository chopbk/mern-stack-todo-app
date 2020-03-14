var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");
const config = require("../config/config")

// Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

// Load User model
const User = require("../models/user.model");
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({
    email: req.body.email
  }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });
      //Hash password before saving in database
      newUser
        .save()
        .then(user => res.json({
          success: true,
          user: user
        }))
        .catch(err => console.log(err));
    }
  });
});

// route POST api/users/login
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  //check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  // FInd user by email
  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    //check password
    user.comparePassword((password))
      .then((data) => {
        if (data == true) {
          const payload = {
            id: user.id,
            name: user.name
          };
          console.log(payload);
          jwt.sign(
            payload,
            config.secretOrKey,
            {
              expiresIn: 31556926 // 1 year in seconds
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          console.log("return false");
          return res
            .status(400)
            .json({ passwordincorrect: "Password incorrect" });
        }
      })
      .catch((err) => {
        console.log("return error");
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      });
  })
})
module.exports = router;
