import express, {Request, Response} from "express";
import userService from "../services/user.service";

class userController{

    public async create(req: Request, res: Response) {
        try{
            //const userExists: UserDocument | null = await userService.findByEmail(req.body.email);
            //if(userExists){
              //  res.status(400).json({message: "User already exist"})
            //};
            const user: UserDocument = await userService.create(req.body as UserInput);
            return res.status(201).json(user);
        }catch(error){
            if(error instanceof ReferenceError)
                res.status(400).json({message: "User already exists" });
            return res.status(500).json(error);
        }
    }

    public async login(req: Request, res: Response) {
        try{
            const resObj = await userService.login(req.body as UserInput);
            return res.status(200).json(resObj);
        }catch(error){
            if(error instanceof ReferenceError)
                res.status(401).json({message: "Not authorized" });
            return res.status(500).json(error);
        }
    }

    public async getAll(req: Request, res: Response){
        try{

            const users: UserDocument[] = await userService.findAll();
            return res.json(users);
        }catch(error){
            return res.status(500).json(error);
        }
    }

    public async update(req: Request, res: Response){
        
        try{

            const users: UserDocument | null = await userService.update(req.params.id, req.body as UserInput);
            if(!users){
                res.status(404).json({message: "User with id ${req.params.id} not found"})
            }; 
            return res.json(users);
        }catch(error){
            return res.status(500).json(error);
        }
    }

    public get(req: Request, res: Response){
        res.send(`Get user with id ${req.params.id}`)
    }
    public put(req: Request, res: Response){
        res.send("update user")
    }
    
    public delete(req: Request, res: Response){
        res.send("delete user")
    }
}export default new userController();