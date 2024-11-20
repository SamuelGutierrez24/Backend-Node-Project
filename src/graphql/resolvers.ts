import userController from "../controllers/user.controller";
import reactionController from "../controllers/reaction.controller";
import commentController from "../controllers/comment.controller";
import { UserDocument, UserInput } from "../models/user.model";
import { CommentInput } from "../models/comment.model";
import { ReactionInput } from "../models/reaction.model";
import { GraphQLError } from "graphql";
import UserExistsError from "../exceptions/UserExistsError";


const verifyRole = (user: any, requiredRole: string) => {
    if (!user){
        throw notFoundError(`User not found or not logged`);
    }
     if (user.role !== requiredRole) {
        throw unauthorizedError('Unauthorized');
    }
};

export const resolvers = {
  Query: {
    // User queries
    getUser: async (_: any, { id }: { id: string }, context: any) => {
        try {
            verifyRole(context.user, '0');
        } catch (error) {
            verifyRole(context.user, '1');
        }
        console.log(context.user)
        return await userController.get(id);
    },
    getAllUsers: async (_: any, __: any, context: any) => {
        verifyRole(context.user, '0'); // Only admins can get all users
        return await userController.getAll();
      },
    // Reaction queries
    getReaction: async (_: any, { id }: { id: string }, context: any) => {
        verifyRole(context.user, '0');
        verifyRole(context.user, '1');
        return await reactionController.get(id);
    },
    getReactions: async (context: any) => {
        verifyRole(context.user, '0');
        return await reactionController.getAll();
    },
    // Comment queries
    getComment: async (_: any, { id }: { id: string }, context: any) => {
        verifyRole(context.user, '0');
        verifyRole(context.user, '1');
        return await commentController.get(id);
    },
    getComments: async (context: any) => {
        verifyRole(context.user, '0');
        return await commentController.getAll();
    },
  
  },
  Mutation: {
    // User mutations
    createUser: async (_: any, { input }: { input: UserInput }) => {
        try {
            if (input.password.length < 8) {
                throw new Error("Password must be at least 8 characters long");
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.email)) {
                throw new Error("Invalid email format");
            }
            return await userController.create(input);
        }catch(error){
            if (error instanceof UserExistsError) {
                throw new Error("User already exists");
            }
            throw new Error((error as Error).message);
        }
        
    },
    login: async (_: any, { input }: { input: { name: string; email: string; password: string; role: string } }) => {
        return await userController.login(input);
    },
    updateUser: async ( _: any,{ email, input }: { email: string; input: UserInput }, context: any) => {
        verifyRole(context.user, '0');
        return await userController.update(email, input);
    },
    deleteUser: async (_: any, { email }: { email: string }, context: any) => {
        verifyRole(context.user, '0'); // Only admins can delete user
            return await userController.delete(email);
        },
    // Reaction mutations
    createReaction: async (_: any, { input }: { input: ReactionInput }, context: any) => {
        verifyRole(context.user, '0');
        verifyRole(context.user, '1');
        return await reactionController.create(input);
    },
    updateReaction: async (_: any, { id, input }: { id: string; input: ReactionInput }, context: any) => {
        verifyRole(context.user, '0');
        verifyRole(context.user, '1');
        return await reactionController.update(id, input);
    },
    deleteReaction: async (_: any, args: { id: string }, context: any) => {
        verifyRole(context.user, '0');
        verifyRole(context.user, '1');
      return await reactionController.delete({ params: { id: args.id } } as any, {} as any);
    },
    // Comment mutations
    createComment: async (_: any, { email, text }: { email: string, text: string }, context: any) => {
        verifyRole(context.user, '0');
        verifyRole(context.user, '1');
      return await commentController.create(email, text);
    },
    updateComment: async (_: any, { id, email, input }: { id: string, email: string, input: CommentInput }, context: any) => {
        verifyRole(context.user, '0');
        verifyRole(context.user, '1');
        return await commentController.update(id, email, input);
    },
    deleteComment: async (_: any, { id, email }: { id: string, email: string }, context: any) => {
        verifyRole(context.user, '0');
        verifyRole(context.user, '1');
        return await commentController.delete(id, email);
    },
    respondToComment: async (_: any, { id, email, text }: { id: string, email: string, text: string }, context: any) => {
        verifyRole(context.user, '0');
        verifyRole(context.user, '1');
        return await commentController.response(id, email, text);
    }
  },
};
function notFoundError(message: string) {
    return new GraphQLError(message, {
        extensions: { code: 'NOT_FOUND' },
    });
}
function unauthorizedError(message: string) {
    return new GraphQLError(message, {
        extensions: { code: 'UNAUTHORIZED' },
    });
}
