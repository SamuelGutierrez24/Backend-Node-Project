import userController from "../controllers/user.controller";
import postController from "../controllers/post.controller";
import reactionController from "../controllers/reaction.controller";
import commentController from "../controllers/comment.controller";
import { UserDocument, UserInput } from "../models/user.model";
import { CommentInput } from "../models/comment.model";

export const resolvers = {
  Query: {
    // User queries
    getUser: async (_: any, { id }: { id: string }) => {
        return await userController.get(id);
    },
    getAllUsers: async () => {
        //const controller = new UserController();
        return await userController.getAll();
      },
    // Post queries
    getPost: async (_: any, args: { id: string }) => {
      return await postController.get({ params: { id: args.id } } as any, {} as any);
    },
    getPosts: async () => {
      return await postController.getAll({} as any, {} as any);
    },
    // Reaction queries
    getReaction: async (_: any, args: { id: string }) => {
      return await reactionController.get({ params: { id: args.id } } as any, {} as any);
    },
    getReactions: async () => {
      return await reactionController.getAll({} as any, {} as any);
    },
    // Comment queries
    getComment: async (_: any, { id }: { id: string }) => {
        return await commentController.get(id);
    },
    getComments: async () => {
        return await commentController.getAll();
    },
  
  },
  Mutation: {
    // User mutations
    createUser: async (_: any, { input }: { input: UserInput }) => {
        return await userController.create(input);
    },
    login: async (_: any, { input }: { input: { name: string; email: string; password: string; role: string } }) => {
        return await userController.login(input);
    },
    updateUser: async ( _: any,{ email, input }: { email: string; input: UserInput }) => {
        return await userController.update(email, input);
    },
    deleteUser: async (_: any, { email }: { email: string }) => {
            return await userController.delete(email);
        },
    // Post mutations
    createPost: async (_: any, args: { input: any }) => {
      return await postController.create({ body: args.input } as any, {} as any);
    },
    updatePost: async (_: any, args: { id: string; input: any }) => {
      return await postController.update({ params: { id: args.id }, body: args.input } as any, {} as any);
    },
    deletePost: async (_: any, args: { id: string }) => {
      return await postController.delete({ params: { id: args.id } } as any, {} as any);
    },
    // Reaction mutations
    createReaction: async (_: any, args: { input: any }) => {
      return await reactionController.create({ body: args.input } as any, {} as any);
    },
    updateReaction: async (_: any, args: { id: string; input: any }) => {
      return await reactionController.update({ params: { id: args.id }, body: args.input } as any, {} as any);
    },
    deleteReaction: async (_: any, args: { id: string }) => {
      return await reactionController.delete({ params: { id: args.id } } as any, {} as any);
    },
    // Comment mutations
    createComment: async (_: any, args: { input: any }) => {
      return await commentController.create({ body: args.input } as any, {} as any);
    },
    updateComment: async (_: any, { id, email, input }: { id: string, email: string, input: CommentInput }) => {
        return await commentController.update(id, email, input);
    },
    deleteComment: async (_: any, { id, email }: { id: string, email: string }) => {
        return await commentController.delete(id, email);
    },
    respondToComment: async (_: any, { id, email, text }: { id: string, email: string, text: string }) => {
        return await commentController.response(id, email, text);
    }
  },
};
