import mongoose from "mongoose";

export interface CommentInput {
    text: string,
    email: string,
    commentId: string,
    responses: string[],
    reactions: string[]
}


export interface CommentDocument extends CommentInput, mongoose.Document{
    createdAt: Date, 
    updateAt: Date,
    deleteAt: Date,
}

const commentSchema = new mongoose.Schema({
    text: {type: String, required: true},
    email: {type: String, required: false},
    commentId: {type: String, required: false},
    responses: [{ type: String, required: false }],
    reactions: [{ type: String, required: false }],
}, {timestamps: true, collection: "comments"});

const Comment = mongoose.model<CommentDocument>("Comment", commentSchema);

export default Comment;