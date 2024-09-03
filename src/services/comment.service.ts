import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import CommentModel, {CommentDocument, CommentInput}  from "../models/comment.model";
import UserExistsError from "../exceptions/UserExistsError";
import UserNotAuthorizedError from "../exceptions/UserNotAuthorizedError";
import CommentNotExistsError from "../exceptions/CommentNotExistError";



class CommentService {

    public async create(commentInput: CommentInput): Promise<CommentDocument> {
        try {
            const  comment = await CommentModel.create(commentInput);
            return comment;
        } catch (error) {
           throw error; 
        }
    }

    public async findByUser(email: string): Promise<CommentDocument[] | null > {
        try {
            const  comments = await  CommentModel.find({email});
            return comments;
        } catch (error) {
           throw error; 
        }
    }

    public async findAll(): Promise<CommentDocument[] > {
        try {
            const  comments = await  CommentModel.find();
            return comments;
        } catch (error) {
           throw error; 
        }
    }    

    public async findById(id: string): Promise<CommentDocument | null > {
        try {
            const  comment = await  CommentModel.findById(id);
            return comment;
        } catch (error) {
           throw error; 
        }
    }

    public async update(id: string, commentInput: CommentInput, email: string): Promise<CommentDocument | null> {
        try {
            const commentExists: CommentDocument | null = await this.findById(id);
            if (!commentExists)
                throw new UserExistsError("Comment doesn’t exist");
            if(commentExists.email !== email){
                throw new UserExistsError("Not your comment")
            }
            await CommentModel.updateOne({ _id: id }, commentInput);
            return commentExists; 
        } catch (error) {
            throw error;
        }
    }
    

    public async delete(id: string, email: string): Promise<CommentDocument | null> {
        try {
            const commentExists: CommentDocument | null = await this.findById(id);
            if (!commentExists) {
                throw new CommentNotExistsError("Comment doesn’t exist");
            }
            if (commentExists.email !== email) {
                throw new UserNotAuthorizedError("Not your comment");
            }
            if(commentExists.commentId){
                const responseExists: CommentDocument | null = await this.findById(commentExists.commentId)
                if (responseExists) {
                    await CommentModel.updateOne({ _id: commentExists.commentId }, { $pull: { responses: id } });
                }
            }
            
            console.log("sali")
            await this.deleteResponses(commentExists.responses);
    
            await CommentModel.deleteOne({ _id: id });
    
            return commentExists;
        } catch (error) {
            throw error;
        }
    }
    
    private async deleteResponses(responseIds: string[]): Promise<void> {
        for (const responseId of responseIds) {
            const responseComment: CommentDocument | null = await this.findById(responseId);
            if (responseComment) {
                
                await this.deleteResponses(responseComment.responses);
    
                await CommentModel.deleteOne({ _id: responseId });
            }
        }
    }
    

    public async response(commentInput: CommentInput, id: string): Promise<CommentDocument | null> {
        try {
            const base: CommentDocument | null = await this.findById(id);
            if (!base)
                throw new UserExistsError("Comment doesn’t exist");
            
            const response: CommentDocument = await this.create(commentInput);

            if(base.responses){
                base.responses.push(response.id)
                base.save();
                
            }
            return response;
        } catch (error) {
            throw error; 
        }
    }

    public async react(commentInput: CommentInput, id: string): Promise<CommentDocument | null> {
        try {
            const base: CommentDocument | null = await this.findById(id);
            console.log(commentInput.reactions[0])
            if (!base)
                throw new UserExistsError("Comment doesn’t exist");
            else{
                base.reactions.push(commentInput.reactions[0])
                base.save();
            }

            return base;
        } catch (error) {
            throw error; 
        }
    }
    
    
}

export default new CommentService();