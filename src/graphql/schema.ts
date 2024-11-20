import { gql } from "apollo-server";

export const typeDefs = gql`
  # Fragments
  fragment UserFields on User {
    id
    name
    email
    role
  }

  fragment PostFields on Post {
    id
    title
    content
  }

  fragment CommentFields on Comment {
    id
    text
    email
    commentId
    responses {
      ...CommentFields
    }
    reactions {
      ...ReactionFields
    }
  }

  fragment ReactionFields on Reaction {
    id
    text
    commentId
    email
  }
  
  type Query {
    getUser(id: ID!): User
    getAllUsers: [User!]!
    getPost(id: ID!): Post
    getPosts: [Post!]
    getComment(id: ID!): Comment
    getComments: [Comment!]
    getReaction(id: ID!): Reaction
    getReactions: [Reaction!]
  }

  type Mutation {
    createUser(input: UserInput!): User
    login(input: LoginInput!): AuthResponse
    updateUser(email: String!, input: UserInput!): User!
    deleteUser(email: String!): User
    createPost(input: PostInput!): Post
    updatePost(id: ID!, input: PostInput!): Post
    deletePost(id: ID!): Post
    createComment(email: String!, text: String!): Comment
    updateComment(id: ID!, email: String, input: CommentInput!): Comment
    deleteComment(id: ID!, email: String): Comment
    respondToComment(id: ID!, email: String, text: String!): Comment
    createReaction(input: ReactionInput!): Reaction
    updateReaction(id: ID!, input: ReactionInput!): Reaction
    deleteReaction(id: ID!): Reaction
  }

  type User {
    id: ID!
    name: String!
    email: String!
    role: String
  }

  input UserInput {
    name: String!
    email: String!
    password: String!
    role: String
  }

  type AuthResponse {
    token: String!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
  }

  input PostInput {
    title: String!
    content: String!
  }

  type Comment {
    id: ID!
    text: String!
    email: String!
    commentId: String
    responses: [Comment!]
    reactions: [Reaction!]
  }

  input CommentInput {
    text: String!
    email: String!
    commentId: String
    responses: [String]
    reactions: [String]
  }

  type Reaction {
    id: ID!
    text: String!
    commentId: String!
    email: String!
  }

  input ReactionInput {
    text: String!
    commentId: String!
    email: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }
`;
