import { CommentDocument, CommentInput } from "../models/comment.model";
import commentService from "../services/comment.service";

class commentController {

    // Crear un comentario
    public async create(email: string, text: string): Promise<CommentDocument> {
        try {
            const commentInput: CommentInput = { text: text, email: email, commentId: "", responses: [], reactions: [] };
            const comment: CommentDocument = await commentService.create(commentInput);
            return comment;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    // Obtener un comentario por ID
    public async get(id: string): Promise<CommentDocument | null> {
        try {
            const comment: CommentDocument | null = await commentService.findById(id);
            if (!comment) {
                throw new Error(`Comment with id:${id} not found`);
            }
            return comment;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    // Obtener todos los comentarios
    public async getAll(): Promise<CommentDocument[]> {
        try {
            const comments: CommentDocument[] = await commentService.findAll();
            return comments;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    // Actualizar un comentario
    public async update(id: string, email: string, input: CommentInput): Promise<CommentDocument | null> {
        try {
            const comment: CommentDocument | null = await commentService.update(id, input, email);
            if (!comment) {
                throw new Error(`Comment with id: ${id} not found`);
            }
            return comment;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    // Eliminar un comentario
    public async delete(id: string, email: string): Promise<CommentDocument | null> {
        try {
            const comment: CommentDocument | null = await commentService.delete(id, email);
            if (!comment) {
                throw new Error(`Comment with id: ${id} not found`);
            }
            return comment;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    // Responder a un comentario
    public async response(id: string, email: string, text: string): Promise<CommentDocument> {
        try {
            const commentInput: CommentInput = { text: text, email: email, commentId: id, responses: [], reactions: [] };
            const comment: CommentDocument | null = await commentService.response(commentInput, id);
            if (!comment) {
                throw new Error(`Comment with id: ${id} not found`);
            }
            return comment;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

}

export default new commentController();
