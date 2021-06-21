const { model, Schema } = require("mongoose");

const commentSchema = new Schema({
    author: String,
    parent: String,
    content: String,
    createdAt: String,
    floor: Number,
})

module.exports = model("Comment", commentSchema);