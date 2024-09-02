import mongoose from "mongoose";

export interface ReactionInput {
    text: string,
    commentId: string,
    email: string
}

export interface ReactionDocument extends ReactionInput, mongoose.Document{
    createdAt: Date, 
    updateAt: Date,
    deleteAt: Date
}

export enum eReaction {
    MeGusta = "me_gusta",
    MeEncanta = "me_encanta",
    MeDivierte = "me_divierte",
    MeSorprende = "me_sorprende",
    MeEntristece = "me_entristece",
    MeEnoja = "me_enoja"
}

const reactionSchema = new mongoose.Schema({
    text: {type: String, enum:Object.values(eReaction), required: true},
    commentId: {type: String, required: false},
    email: {type: String, required: false},
}, {timestamps: true, collection: "reactions"});

const Reaction = mongoose.model<ReactionDocument>("Reaction", reactionSchema);

export default Reaction;