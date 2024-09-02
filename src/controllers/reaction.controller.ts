import { Request, Response } from "express";
import reactionService from "../services/reaction.service";
import { ReactionDocument, ReactionInput } from "../models/reaction.model";

class reactionController {
    /**
     * Descripción: Crea una nueva reaación en la base de datos.
     *Método: POST
     *URL: /api/comments
     * @param req 
     * @param res 
     */
    public async create(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const text = req.body.text;
            const email = req.params.email;
            const reactionInput: ReactionInput = {text:text , commentId:id, email:email};
            const reaction: ReactionDocument | null = await reactionService.react(reactionInput, text, id);
            res.status(201).json(reaction);            
        } catch (error) {
            res.status(500).json(error);
        }
    }


    /**
     * Descripción: Nos devuelve una reaccion por ID.
     *Método: GET
     *URL: /api/comment
     * @param req 
     * @param res 
     */
    public async get (req: Request, res: Response) {
        try {
            const reaction: ReactionDocument | null = await reactionService.findById(req.params.id); 
            if (!reaction){
                res.status(404).json({message: `reaction with id:${req.params.id} not found`});
                return;
            }
            res.json(reaction);   
        } catch (error) {
            res.status(500).json(error);
        }
    }
  /**
     * Descripción: Nos devuelve la lista de reacciones que hay en la base de datos.
     *Método: GET
     *URL: /api/comment
     * @param req 
     * @param res 
     */
    public async getAll(req: Request, res: Response) {
        try {
            const reactions: ReactionDocument[] = await reactionService.findAll(); 
            res.json(reactions);            
        } catch (error) {
            res.status(500).json(error);
        }    
    }
    /**
     * Descripción: Edita una reaccion a un comentario en la base de datos.
     *Método: PUT
     *URL: /api/comment
     * @param req 
     * @param res 
     */
    public async update(req: Request, res: Response) {
        try {
            const reaction: ReactionDocument | null = await reactionService.update(req.params.id, req.body as ReactionInput, req.params.email);
            if (!reaction) {
                res.status(404).json({ message: `User with email: ${req.params.email} not found` });
                return;
            }
            res.json(reaction);
        } catch (error) {
            res.status(500).json(error);
        }
    }
    
    /**
     * Descripción: Elimina una reaccion a un comentario de la base de datos.
     *Método: DELETE
     *URL: /api/comments
     * @param req 
     * @param res 
     */
    public async delete(req: Request, res: Response) {
        try {
            const reaction: ReactionDocument | null = await reactionService.delete(req.params.id, req.params.email);
            if (!reaction) {
                res.status(404).json({ message: `Comment with id: ${req.params.id} not found` });
                return;
            }
            res.json(reaction);
        } catch (error) {
            res.status(500).json(error);
        }
    }
    
    
}

export default new reactionController();