import express, {Request, Response} from "express";
import userController from '../controllers/users.controller';


export const router = express.Router();


router.get("/", userController.getAll);

router.get("/:id",userController.get);

router.put("/:id", userController.put);

router.delete("/:id", userController.delete);