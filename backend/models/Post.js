const { model, Schema } = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const postSchema = new Schema({
    author: String,
    title: String,
    content: String,
    createdAt: String,
    updatedAt: String,
    commentsCount: Number,
    // the index of next comment created under this post
    // (or the number of all comments that includes deleted + 1).
    newCommentIndex: Number,
})

postSchema.plugin(mongoosePaginate);

module.exports = model("Post", postSchema);