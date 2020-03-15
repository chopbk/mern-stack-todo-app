/**
 * @file this files defines some user services fucntion
 * @author chopbk
 * @since  15/03/2020
 */
// Load User model
const User = require("../models/user.model");
const logger = require('../logger');
/**
 * @des Find user by email
 */
const findUserByEmail = async (email) => {
    try {
        let user = await User.findOne({ email: email });
        if (!user) {
            throw new Error("Email does not exist");
        }
        return user;
    } catch (error) {
        logger.debug("findUserByEmail: " + error.message);
        throw new Error("Email does not exist");
    }
}
/**
 * @des user login services
 */
const userLogin = async (user, password) => {
    try {
        let comparePassword = await user.comparePassword((password))
        if (comparePassword === false) {
            throw new Error("Password is incorrect");
        }
        return user.getJwt();
    } catch (error) {
        logger.debug("userLogin: " + error.message);
        throw new Error("Password is incorrect");
    }
}
/**
 * @des user register services
 */
const userRegister = async (data) => {
    try {

        const newUser = new User({
            name: data.name,
            email: data.email,
            password: data.password
        });
        await newUser.save()
        return newUser.toWeb();
    } catch (error) {
        logger.debug("userRegister: " + error.message);
        throw new Error("Register failure");
    }
}
module.exports = {
    findUserByEmail,
    userLogin,
    userRegister
}