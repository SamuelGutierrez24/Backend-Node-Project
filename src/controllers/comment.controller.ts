import { Request, Response } from "express";
import { CommentDocument, CommentInput } from "../models/comment.model";
import commentService from "../services/comment.service";
import UserExistsError from "../exceptions/UserExistsError";

class commentController {

    /**
     * Descripción: Metodo para crear comentario.
     *Método: POST
     *URL: /api/comments
     * @param req 
     * @param res 
     */
    public async create(req: Request, res: Response) {
        try {
            const email = req.params.email;
            const text = req.body.text;
            const commentInput: CommentInput = {text:text , email:email, commentId: "", responses:[], reactions:[]};
            const comment: CommentDocument = await commentService.create(commentInput);
            res.status(201).json(comment);            
        } catch (error) {
            res.status(500).json(error);
        }
    }
    /**
     * Descripción: Metodo para encontrar un usuario por su id.
     *Método: GET
     *URL: /api/comments
     * @param req 
     * @param res 
     */
    public async get (req: Request, res: Response) {
        try {
            const comment: CommentDocument | null = await commentService.findById(req.params.id); 
            if (!comment){
                res.status(404).json({message: `comment with id:${req.params.id} not found`});
                return;
            }
            res.json(comment);   
        } catch (error) {
            res.status(500).json(error);
        }
    }
    /**
     * Descripción: Metodo para encontrar todos los usuarios.
     *Método: GET
     *URL: /api/comments
     * @param req 
     * @param res 
     */
    public async getAll(req: Request, res: Response) {
        try {
            const comments: CommentDocument[] = await commentService.findAll(); 
            res.json(comments);            
        } catch (error) {
            res.status(500).json(error);
        }    
    }
    /**
     * Descripción: Metodo para actualizar los datos de un usuario.
     *Método: PUT
     *URL: /api/comments
     * @param req 
     * @param res 
     */
    public async update(req: Request, res: Response) {
        try {
            const comment: CommentDocument | null = await commentService.update(req.params.id, req.body as CommentInput, req.params.email);
            if (!comment) {
                res.status(404).json({ message: `User with email: ${req.params.email} not found` });
                return;
            }
            res.json(comment);
        } catch (error) {
            res.status(500).json(error);
        }
    }
    
    /**
     * Descripción: Metodo para borrar un usuario
     *Método: DELETE
     *URL: /api/comments
     * @param req 
     * @param res 
     */
    public async delete(req: Request, res: Response) {
        try {
            const comment: CommentDocument | null = await commentService.delete(req.params.id, req.params.email);
            if (!comment) {
                res.status(404).json({ message: `Comment with id: ${req.params.id} not found` });
                return;
            }
            res.json(comment);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    /**
     * Descripción: Metodo en el cual se realiza una respuesta a un comentario, 
     * se crea un nuevo comentario y se referencia su id con el id del comentario base.
     *Método: POST
     *URL: /api/comments
     * @param req 
     * @param res 
     */
    public async response(req: Request, res: Response) {
        try {
            const email = req.params.email;
            const text = req.body.text;
            const id = req.params.id;
            const commentInput: CommentInput = { text: text, email: email, commentId:id, responses: [], reactions:[] };
            const comment: CommentDocument | null = await commentService.response(commentInput, id);
            
            if (!comment) {
                res.status(404).json({ message: `Comment with id: ${id} not found` });
                return;
            }
            
            res.status(201).json(comment);
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: "An unknown error occurred" });
            }
        }
    }
    
}

export default new commentController();