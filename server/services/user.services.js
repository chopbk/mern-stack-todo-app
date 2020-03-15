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
        logger.error("findUserByEmail: " + error.message);
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
        logger.error("userLogin: " + error.message);
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
        logger.error("userRegister: " + error.message);
        throw new Error("Register failure");
    }
}
/**
 * @des find all user services
 */
const findAllUser = async () => {
    try {
        let users = await User.find({});
        // if (!Array.isArray(users) || !users.length)
        // throw new Error("No user found");
        return users;
    } catch (error) {
        logger.error("findAllUser: " + error.message);
        throw new Error("No user found");
    }
}
/**
 * @des update user services 
 */
const findUserByID = async (userID) => {
    try {
        let user = await User.findById(userID)
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    } catch (error) {
        logger.debug("findUserByID: " + error.message);
        throw new Error("User not found");
    }
}
/**
 * @des update User to DB
 */
const updateUser = async (user, data) => {
    try {
        if (data.name)
            user.name = data.name;
        if (data.password)
            user.password = data.password;
        await user.save();
        if (!user) throw new Error('Update not possible');
        //console.log(user);
        return user;
    } catch (error) {
        logger.debug("updateUser: " + error.message);
        throw new Error('Update user not possible');
    }
}
/**
 * @des delete user in DB
 */
const deleteUser = async (user) => {
    try {
        await user.remove();
        let checkUser = await User.findById(user._id)
        if (checkUser)
            throw new Error('Delete user not possible');
        return;
    } catch (error) {
        logger.debug("deleteUser: " + error.message);
        throw new Error('Delete user not possible');
    }
}
module.exports = {
    findUserByEmail,
    userLogin,
    userRegister,
    findAllUser,
    findUserByID,
    updateUser,
    deleteUser
}