const { model, Schema } = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const postSchema = new Schema({
    author: String,
    title: String,
    content: String,
    createdAt: String,
})

postSchema.plugin(mongoosePaginate);

module.exports = model("Post", postSchema);