import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import CommentModel, {CommentDocument, CommentInput}  from "../models/comment.model";
import ReactionModel, {ReactionDocument, ReactionInput}  from "../models/reaction.model";
import UserExistsError from "../exceptions/UserExistsError";
import UserNotAuthorizedError from "../exceptions/UserNotAuthorizedError";
import CommentNotExistsError from "../exceptions/CommentNotExistError";
import commentService from "./comment.service";

class ReactionService {

    public async react(reactionInput: ReactionInput, text: string, id: string): Promise<ReactionDocument | null> {
        try {
            const base: CommentDocument | null = await commentService.findById(id);
            var reaction: ReactionDocument | null = null;
            if (!base)
                throw new UserExistsError("Comment doesn’t exist");
            else{
                reaction = await ReactionModel.create(reactionInput)
                base.reactions.push(reaction.id)
                base.save();
            }
            return reaction;
        } catch (error) {
            throw error; 
        }
    }


    public async findAll(): Promise<ReactionDocument[] > {
        try {
            const  reactions = await  ReactionModel.find();
            return reactions;
        } catch (error) {
           throw error; 
        }
    }    

    public async findById(id: string): Promise<ReactionDocument | null > {
        try {
            const  reaction = await  ReactionModel.findById(id);
            return reaction;
        } catch (error) {
           throw error; 
        }
    }

    public async update(id: string, reactionInput: ReactionInput, email: string): Promise<ReactionDocument | null> {
        try {
            const reactionExists: ReactionDocument | null = await this.findById(id);
            if (!reactionExists)
                throw new UserExistsError("Reaction doesn’t exist");
            if(reactionExists.email !== email){
                throw new UserExistsError("Not your reaction")
            }
            await ReactionModel.updateOne({ _id: id }, reactionInput);
            return reactionExists; 
        } catch (error) {
            throw error;
        }
    }
    

    public async delete(id: string, email: string): Promise<ReactionDocument | null> {
        try {
            const reactionExists: ReactionDocument | null = await this.findById(id);
            if (!reactionExists) {
                throw new CommentNotExistsError("Reaction doesn’t exist");
            }
            if (reactionExists.email !== email) {
                throw new UserNotAuthorizedError("Not your comment");
            }
            await ReactionModel.deleteOne({ _id: id });
            await CommentModel.updateOne({_id:reactionExists.commentId}, { $pull: { reactions: id }})
            return reactionExists;
        } catch (error) {
            throw error;
        }
    }
}

export default new ReactionService();