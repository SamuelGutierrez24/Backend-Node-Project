import express from "express";
import userController from '../controllers/user.controller';
import validateSchema from "../middlewares/validateSchema";
import userSchema from "../schemas/user.schema";
import loginSchema from "../schemas/login.schema";
import auth from "../middlewares/auth";
import auth2 from "../middlewares/auth.role";




export const router = express.Router();

router.post("/", auth, auth2("0") ,validateSchema(userSchema), userController.create);

router.post("/login", validateSchema(loginSchema), userController.login );

router.get("/", auth, userController.getAll);

router.get("/:id", auth, auth2("0"), userController.get);

router.put("/:email", auth, auth2("0"), userController.update);

router.delete("/", auth, auth2("0"), userController.delete);


