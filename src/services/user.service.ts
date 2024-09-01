import UserModel, {UserDocument, UserInput} from "../models/user.model";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

class UserService {

    public async create(userInput : UserInput): Promise<UserDocument> {
        try{

            const userExists: UserDocument | null = await this.findByEmail(userInput.email);
            if(userExists){
                throw new ReferenceError("User already exist");
            };
            userInput.password = await bcrypt.hash(userInput.password, "prueba")
            const user = await UserModel.create(userInput);
            return user;
        }catch(error){
            throw error;
        }
    }
    public async login(userInput : UserInput){
        try{

            const userExists: UserDocument | null = await this.findByEmail(userInput.email);
            if(!userExists){
                throw new ReferenceError("User not exist");
            };
            const isMatch: boolean = await bcrypt.compare(userInput.password, userExists.password)

            if(!isMatch)
                throw new ReferenceError("Not authorized");
            return { email: userExists.email, id: userExists};
        }catch(error){
            throw error;
        }
    }
    public async findByEmail(email: string): Promise<UserDocument | null > {
        try{
            const user = await UserModel.findOne({email});
            return user;
        }catch(error){
            throw error;
        }
    }

    public async findAll(): Promise<UserDocument[] > {
        try{
            const user = await UserModel.find();
            return user;
        }catch(error){
            throw error;
        }
    }

    public async update(id: string, userInput: UserInput): Promise<UserDocument | null>{
        try{
            const user: UserDocument | null = await UserModel.findOneAndUpdate({id:id}, userInput, {returnOriginal:false});
            return user;
        }catch(error){
            throw error;
        }
    }
    public async delete(id: string): Promise<UserDocument | null>{
        try{
            const user: UserDocument | null = await UserModel.findOneAndDelete({id:id});
            return user;
        }catch(error){
            throw error;
        }
    }
    public generateToken(user:UserDocument ){
        try{
            return jwt.sign({id: user._id, email: user.email, name: user.name}, 
                process.env.JWT_SECRET || "secret", {expiresIn: "2m"});
        }catch{}
    }
}

export default new UserService();