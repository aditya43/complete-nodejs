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
        name: Password!
    }

    type RootMutation {
        createUser(userInput: UserInputData)
    }

    schema {
        mutation: RootMutation
    }
`);
