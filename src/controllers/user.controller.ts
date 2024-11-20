import { UserDocument, UserInput } from "../models/user.model";
import userService from "../services/user.service";
import UserExistsError from "../exceptions/UserExistsError";

class userController {
    /**
     * Descripción: Crea un nuevo usuario en la base de datos.
     * Método: POST
     */
    public async create(input: UserInput): Promise<UserDocument> {
        try {
            const user: UserDocument = await userService.create(input);
            return user;
        } catch (error) {
            if (error instanceof UserExistsError) {
                throw new Error("User already exists");
            }
            throw new Error((error as Error).message);
        }
    }

    /**
     * Descripción: Permite loguear a un usuario y crear su JWT token.
     */
    public async login(input: {name: string, email: string; password: string, role: string }): Promise<{ token: string }> {
        try {
            return await userService.login(input);
        } catch (error) {
            if (error instanceof ReferenceError) {
                throw new Error("Not authorized");
            }
            throw new Error((error as Error).message);
        }
    }

    /**
     * Descripción: Devuelve un usuario a través de su ID.
     */
    public async get(userId: string): Promise<UserDocument> {
        try {
            const user: UserDocument | null = await userService.findById(userId);
            if (!user) {
                throw new Error(`User with ID: ${userId} not found`);
            }
            return user;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    /**
     * Descripción: Devuelve la lista completa de usuarios.
     */
    public async getAll(): Promise<UserDocument[]> {
        try {
            return await userService.findAll();
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    /**
     * Descripción: Edita un usuario ya creado.
     */
    public async update(email: string, input: UserInput): Promise<UserDocument> {
        try {
            const user: UserDocument | null = await userService.update(email, input);
            if (!user) {
                throw new Error(`User with email: ${email} not found`);
            }
            return user;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    /**
     * Descripción: Elimina un usuario de la base de datos.
     */
    public async delete(email: string): Promise<UserDocument> {
        try {
            const user: UserDocument | null = await userService.delete(email);
            if (!user) {
                throw new Error(`User with email: ${email} not found`);
            }
            return user;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }
}

export default new userController();
