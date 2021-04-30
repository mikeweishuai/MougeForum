const { model, Schema } = require("mongoose");

const commentSchema = new Schema({
    author: String,
    parent: String,
    content: String,
    createdAt: String,
})

module.exports = model("Comment", commentSchema);