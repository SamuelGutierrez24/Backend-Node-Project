import { Request, Response } from "express";
import { UserDocument, UserInput } from "../models/user.model";
import userService from "../services/user.service";
import UserExistsError from "../exceptions/UserExistsError";

class userController {

    /** 
    *Descripción: Crea un nuevo usuario en la base de datos.
    *Método: POST
    *URL: /api/users
    */ 
    public async create(req: Request, res: Response) {
        try {
            const user: UserDocument = await userService.create(req.body as UserInput);
            res.status(201).json(user);            
        } catch (error) {
            if (error instanceof UserExistsError){
                res.status(400).json({message: "User already exists" });
                return;
            }
            res.status(500).json(error);
        }
    }

    /**
     * Descripción: Permite loguear a un usuario y crear su jwt token.
     *Método: POST
     *URL: /api/users
     * @param req 
     * @param res 
     */
    public async login(req: Request, res: Response) {
        try {
            const resObj = await userService.login(req.body);
            res.status(200).json(resObj);
        } catch (error) {
            if (error instanceof ReferenceError){
                res.status(401).json({message: "Not authorized" });
                return;
            }
            res.status(500).json(error);
        }
    }
    /**
     * Descripción: Nos devuelve un usuario a travez de su id.
     *Método: GET
     *URL: /api/users
     * @param req 
     * @param res 
     */
    public async get (req: Request, res: Response) {
        try {
            const user: UserDocument | null = await userService.findById(req.params.id); 
            if (!user){
                res.status(404).json({message: `User with id:${req.params.id} not found`});
                return;
            }
            res.json(user);   
        } catch (error) {
            res.status(500).json(error);
        }
    }
    /**
     * Descripción: Nos devuelve la lista completa de todos los usuarios en la base de datos.
     *Método: GET
     *URL: /api/users
     * @param req 
     * @param res 
     */

    public async getAll(req: Request, res: Response) {
        try {
            const users: UserDocument[] = await userService.findAll(); 
            res.json(users);            
        } catch (error) {
            res.status(500).json(error);
        }    
    }

    /**
     * Descripción: Edita un usuario ya creado.
     *Método: PUT
     *URL: /api/users
     * @param req 
     * @param res 
     */
    public async update(req: Request, res: Response) {
        try {
            const user: UserDocument | null = await userService.update(req.params.email, req.body as UserInput);
            if (!user) {
                res.status(404).json({ message: `User with email: ${req.params.email} not found` });
                return;
            }
            res.json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    }
    
    /**
     * Descripción: Elimina un usuario de la base de datos.
     *Método: DELETE
     *URL: /api/users
     * @param req 
     * @param res 
     */
    public async delete(req: Request, res: Response) {
        try {
            const user: UserDocument | null = await userService.delete(req.body.email);
            if (!user) {
                res.status(404).json({ message: `User with email: ${req.body.email} not found` });
                return;
            }
            res.json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    }
    
    
}

export default new userController();