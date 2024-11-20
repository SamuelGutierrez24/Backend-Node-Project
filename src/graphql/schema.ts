import { gql } from "apollo-server";

export const typeDefs = gql`
  # Enums
  enum ReactionType {
    ME_GUSTA
    ME_ENCANTA
    ME_DIVIERTE
    ME_SORPRENDE
    ME_ENTRISTECE
    ME_ENOJA
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
  loginUser(input: LoginInput!): AuthResponse
  updateUser(email: String!, input: UserInput!): User
  deleteUser(email: String!): User
  createPost(input: PostInput!): Post
  updatePost(id: ID!, input: PostInput!): Post
  deletePost(id: ID!): Post
  createComment(input: CommentInput!): Comment
  updateComment(id: ID!, input: CommentInput!): Comment
  deleteComment(id: ID!): Comment
  respondToComment(id: ID!, input: CommentInput!): Comment
  createReaction(input: ReactionInput!): Reaction
  updateReaction(id: ID!, input: ReactionInput!): Reaction
  deleteReaction(id: ID!): Reaction
}

type User {
  id: ID!
  name: String!
  email: String!
}

input UserInput {
  name: String!
  email: String!
  password: String!
  role: String!
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
