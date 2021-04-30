const Post = require('../../models/Post');
const Comment = require('../../models/Comment');
const checkAuth = require('../../utils/check-auth');

module.exports = {
    Query: {
        async getCommentsByPost(_, { postId }) {
            try {
                const comments = await Comment.find({ parent: postId })
                return comments;
            } catch (err) {
                throw new Error(err);
            }
        }
    },
    Mutation: {
        async createComment(_, { parent, content }, context) {
            // const id = mongoose.Types.ObjectId(parent)
            const post = await Post.findById(parent);
            if (!post) {
                throw new Error('Parent post not found')
            }

            const user = checkAuth(context);
            const author = user.username
            const newComment = new Comment({
                author,
                parent,
                content,
                createdAt: new Date().toISOString()
            });

            const comment = await newComment.save();
            return comment;
        }
    }
}