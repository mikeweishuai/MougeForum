const { AuthenticationError } = require('apollo-server');

const Post = require('../../models/Post');
const checkAuth = require('../../utils/check-auth');
// const paginateResult = require('../../utils/pagination');

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
                limit: pageSize
            }
            let res = {}
            await Post.paginate({}, options, function (err, result) {
                if (err) {
                    throw new Error(err);
                }
                res = result.docs;
            })
            return res;
        },
        // posts: async (_, { pageSize = 20, after }) => {
        //     const allPosts = await dataSources.launchAPI.getAllLaunches();
        //     // we want these in reverse chronological order
        //     allLaunches.reverse();
        //     const launches = paginateResults({
        //         after,
        //         pageSize,
        //         results: allLaunches
        //     });
        //     return {
        //         launches,
        //         cursor: launches.length ? launches[launches.length - 1].cursor : null,
        //         // if the cursor at the end of the paginated results is the same as the
        //         // last item in _all_ results, then there are no more results after this
        //         hasMore: launches.length
        //             ? launches[launches.length - 1].cursor !==
        //             allLaunches[allLaunches.length - 1].cursor
        //             : false
        //     };
        // },
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
            //   console.log(user);
            const author = user.username
            const newPost = new Post({
                author,
                title,
                content,
                createdAt: new Date().toISOString()
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