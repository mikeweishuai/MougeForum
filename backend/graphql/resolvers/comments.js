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
            // Find the parent post
            const post = await Post.findById(parent);
            if (!post) {
                throw new Error('Parent post not found')
            }
            // Update the fields of the parent post
            const count = post.commentsCount + 1;
            post.commentsCount = count;
            const currentFloor = post.newCommentIndex;
            post.newCommentIndex = currentFloor + 1;
            post.updatedAt = new Date().toISOString();
            await post.save();

            const user = checkAuth(context);
            const author = user.username;
            // const author = 'test';
            const newComment = new Comment({
                author,
                parent,
                content,
                floor: currentFloor,
                createdAt: new Date().toISOString()
            });

            const comment = await newComment.save();
            return comment;
        }
    }
}