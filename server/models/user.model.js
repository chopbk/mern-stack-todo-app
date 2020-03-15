const mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;
const jwt = require("jsonwebtoken");
const config = require("../config")[process.env.NODE_ENV || 'dev']
const Schema = mongoose.Schema;
//Create Schema
const UserSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});
UserSchema.pre('save', async function save(next) {
    user = this;
    console.log(user);
    try {
        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
        user.password = await bcrypt.hash(user.password, salt);
        return next;
    } catch (err) {
        console.log(err);
        return next(err);
    }
});
UserSchema.methods.comparePassword = async function (candidatePassword) {
    user = this;
    return await bcrypt.compare(candidatePassword, user.password);;

};
UserSchema.methods.getJwt = () => {
    user = this;
    let payload = {
        id: user.id,
        name: user.name
    };
    const token = jwt.sign(
        payload,
        config.secretOrKey,
        {
            expiresIn: 31556926 // 1 year in seconds
        }
    );
    return { token: "Bearer " + token };
}
UserSchema.methods.toWeb = function () {
    user = this;
    return {
        _id: user._id,
        name: user.name,
        email: user.email
    }
};
module.exports = User = mongoose.model("users", UserSchema);