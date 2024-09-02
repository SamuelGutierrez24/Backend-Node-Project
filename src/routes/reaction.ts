import express from "express";
import reactionController from '../controllers/reaction.controller';
import validateSchema from "../middlewares/validateSchema";
import reactionSchema from "../schemas/reaction.schema";
import auth from "../middlewares/auth";
import auth2 from "../middlewares/auth.role";
import auth3 from "../middlewares/auth.comment";


export const router = express.Router();


router.post("/:id",auth, auth3, validateSchema(reactionSchema), reactionController.create);

router.get("/", auth, reactionController.getAll);

router.get("/:id", auth, auth3, reactionController.get);

router.put("/:id", auth, auth3, reactionController.update);

router.delete("/:id", auth, auth3, reactionController.delete);

