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
        title: String!
        content: String!
        imageUrl: String!
    }

    type LoggedinUser {
        token: String!
        userId: Int!
    }

    type RootQuery {
        login(email: String!, password: String!): LoggedinUser!
    }

    type RootMutation {
        createUser(userInput: UserInputData): User!
        createPost(postInput: PostInputData): Post!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);