import userController from "../controllers/user.controller";
import postController from "../controllers/post.controller";
import reactionController from "../controllers/reaction.controller";
import commentController from "../controllers/comment.controller";

export const resolvers = {
  Query: {
    // User queries
    getUser: async (_: any, args: { id: string }) => {
      return await userController.get({ params: { id: args.id } } as any, {} as any);
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
    getComment: async (_: any, args: { id: string }) => {
      return await commentController.get({ params: { id: args.id } } as any, {} as any);
    },
    getComments: async () => {
      return await commentController.getAll({} as any, {} as any);
    },
  },
  Mutation: {
    // User mutations
    createUser: async (_: any, args: { input: any }) => {
      return await userController.create({ body: args.input } as any, {} as any);
    },
    loginUser: async (_: any, args: { input: any }) => {
      return await userController.login({ body: args.input } as any, {} as any);
    },
    updateUser: async (_: any, args: { email: string; input: any }) => {
      return await userController.update({ params: { email: args.email }, body: args.input } as any, {} as any);
    },
    deleteUser: async (_: any, args: { email: string }) => {
      return await userController.delete({ body: { email: args.email } } as any, {} as any);
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
    updateComment: async (_: any, args: { id: string; input: any }) => {
      return await commentController.update({ params: { id: args.id }, body: args.input } as any, {} as any);
    },
    deleteComment: async (_: any, args: { id: string }) => {
      return await commentController.delete({ params: { id: args.id } } as any, {} as any);
    },
    respondToComment: async (_: any, args: { id: string; input: any }) => {
      return await commentController.response({ params: { id: args.id }, body: args.input } as any, {} as any);
    },
  },
};
