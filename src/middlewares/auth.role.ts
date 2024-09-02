import {Request, Response, NextFunction} from "express";
import jwt, {TokenExpiredError} from "jsonwebtoken";

const authRole = (role: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (req.params.role === role) {
            next();
        } else {
            res.status(403).json({ message: "Insufficient permissions" });
        }
    };
};

export default authRole;