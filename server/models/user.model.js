const mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;
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
        console.log("pre save ok");
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
module.exports = User = mongoose.model("users", UserSchema);