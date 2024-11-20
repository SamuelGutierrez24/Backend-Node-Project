// src/graphql-server.ts
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './schemas/UserResolver';
import { PostResolver } from './schemas/PostResolver';
import { CommentResolver } from './schemas/CommentResolver';
import Application from 'express';

export async function startGraphQLServer(app: Application.Express) {
    // Build the GraphQL schema
    const schema = await buildSchema({
        resolvers: [UserResolver, PostResolver, CommentResolver],
    });

    // Create an Apollo Server instance
    const server = new ApolloServer({
        schema,
        context: ({ req }) => ({ req }),
    });

    // Start Apollo Server
    await server.start();

    // Apply Apollo middleware to the existing Express app
    server.applyMiddleware({ app, path: '/graphql' });
}
