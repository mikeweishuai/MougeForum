const { model, Schema } = require("mongoose");

const userSchema = new Schema({
    username: String,
    bio: String,
    password: String,
    email: String,
    createdAt: String,
})

module.exports = model("User", userSchema);