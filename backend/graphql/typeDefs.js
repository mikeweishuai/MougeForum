const { gql } = require("apollo-server");

module.exports = gql`
	type User{
		id: ID
		email: String!
		token: String
		username: String!
		bio: String!
		createdAt: String!
	}
	type Post {
		id: ID!
		title: String!
		author: String!
		content: String!
		createdAt: String!
	}
	type Comment {
		id: ID!
		parent: String!
		author: String!
		content: String!
		createdAt: String!
	}
	input RegisterInput{
		username: String!
		password: String!
		confirmPassword: String!
		email: String!
	}
	"""
	Simple wrapper around our list of launches that contains a cursor to the
	last item in the list. Pass this cursor to the launches query to fetch results
	after these.
	"""
	type PostConnection { # add this below the Query type as an additional type.
		cursor: String!
		hasMore: Boolean!
		posts: [Post]!
	}
	type Query{
		getUserInfo: User!
		countUsers: Int!
		getUsers: [User]
		getUserByName(username: String!): User!
		getPosts: [Post]
		getPostsPage(pageSize: Int!, pageNum: Int!): [Post]
		getPost(postId: String): Post
		getCommentsByPost(postId: ID): [Comment]
	}
	type Mutation{
		register(registerInput: RegisterInput): User!
		login(username: String!, password: String!): User!
		updateProfile(username: String!, field: String!, value: String!): User!
		createPost(title: String!, content: String!): Post!
		deletePost(postId: ID!): String!
		createComment(parent: String!, content: String!): Comment!
	}
`