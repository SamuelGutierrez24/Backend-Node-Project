import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { router as user } from './routes/user';
import { router as comment } from './routes/comment';
import { router as reaction } from './routes/reaction';
import { ApolloServer } from 'apollo-server';
import { expressMiddleware as apolloMiddleware } from '@apollo/server/express4';
import { db } from './config/db';
import { typeDefs } from './graphql/schema';
import { resolvers } from './graphql/resolvers';
import jwt from 'jsonwebtoken';
import { getUserFromToken } from './middlewares/auth';

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World');
});

app.use('/api/users', user);
app.use('/api/comments', comment);
app.use('/api/reactions', reaction);

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        const token = req.headers.authorization || '';
        const user = getUserFromToken(token.replace("Bearer ", ""));
        return { user };
    },
});

db.then(() => {
    apolloServer.listen().then(({ url }) => {
        console.log(`Server ready at ${url}`);
    });
});