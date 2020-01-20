const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Post {
        id: ID!
        title: String!
        content: String!
        imageUrl: String!
        creator: User
        createdAt: String
        updatedAt: String
    }
    type User {
        id: ID!
        name: String!
        email: String!
        password: String
        status: String!
        posts: [Post]
        createdAt: String
        updatedAt: String
    }

    input UserInputData {
        email: String!
        password: String!
        name: String!
    }

    input PostInputData {
        id: ID
        title: String!
        content: String!
        imageUrl: String!
    }

    type LoggedinUser {
        token: String!
        userId: Int!
    }

    type PostData {
        posts: [Post]!
        totalPosts: Int!
    }

    type RootQuery {
        login(email: String!, password: String!): LoggedinUser!
        posts(page: Int): PostData
        post(id: ID!): Post!
        user: User!
    }

    type RootMutation {
        createUser(userInput: UserInputData): User!
        createPost(postInput: PostInputData): Post!
        updatePost(id: ID!, postInput: PostInputData): Post!
        deletePost(id: ID!): Boolean
        updateStatus(status: String!): User!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
