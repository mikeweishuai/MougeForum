const { model, Schema } = require("mongoose");

const postSchema = new Schema({
    author: String,
    title: String,
    content: String,
    createdAt: String,
})

module.exports = model("Post", postSchema);