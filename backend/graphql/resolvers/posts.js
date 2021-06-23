const { AuthenticationError } = require('apollo-server');

const Post = require('../../models/Post');
const checkAuth = require('../../utils/check-auth');

module.exports = {
    Query: {
        async getPosts() {
            try {
                const posts = await Post.find().sort({ createdAt: -1 });
                return posts;
            } catch (err) {
                throw new Error(err);
            }
        },
        async getPostsPage(_, { pageSize, pageNum }) {
            const options = {
                page: pageNum,
                limit: pageSize,
                sort: '-updatedAt'
            }
            let res = {}
            await Post.paginate({}, options, function (err, result) {
                if (err) {
                    throw new Error(err);
                }
                res['posts'] = result.docs;
                res['totalPages'] = result.totalPages;
                res['currentPage'] = result.page;
            })
            return res;
        },
        async getPost(_, { postId }) {
            try {
                const post = await Post.findById(postId);
                if (post) {
                    return post;
                } else {
                    throw new Error('Post not found');
                }
            } catch (err) {
                throw new Error(err);
            }
        }
    },
    Mutation: {
        async createPost(_, { title, content }, context) {
            const user = checkAuth(context);
            const author = user.username;
            // const author = 'test';
            const newPost = new Post({
                author,
                title,
                content,
                commentsCount: 0,
                newCommentIndex: 1,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            });
            const post = await newPost.save();
            return post;
        },
        async deletePost(_, { postId }, context) {
            const user = checkAuth(context);

            try {
                const post = await Post.findById(postId);
                if (user.username === post.username) {
                    await post.delete();
                    return 'Post deleted successfully';
                } else {
                    throw new AuthenticationError('Action not allowed');
                }
            } catch (err) {
                throw new Error(err);
            }
        }
    }
};