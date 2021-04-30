const usersResolvers = require("./users");
const postsResolvers = require('./posts');
const commentsResolvers = require('./comments');

module.exports = {
    Query: {
        ...usersResolvers.Query,
        ...postsResolvers.Query,
        ...commentsResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...postsResolvers.Mutation,
        ...commentsResolvers.Mutation
    }
}