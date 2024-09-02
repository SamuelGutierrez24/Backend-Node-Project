import express from "express";
import commentController from '../controllers/comment.controller';
import validateSchema from "../middlewares/validateSchema";
import userSchema from "../schemas/user.schema";
import commentSchema from "../schemas/comment.schema";
import auth from "../middlewares/auth";
import auth2 from "../middlewares/auth.role";
import auth3 from "../middlewares/auth.comment";


export const router = express.Router();


router.post("/",auth, auth3, validateSchema(commentSchema), commentController.create);

router.get("/", auth, commentController.getAll);

router.get("/:id", auth, auth3, commentController.get);

router.put("/:id", auth, auth3, commentController.update);

router.delete("/:id", auth, auth3, commentController.delete);

router.post("/:id", auth, commentController.response);


