import { NextFunction, Request, Response } from "express";
import { AppError } from "../shared/error/error";
import { User } from "../client/models/interface/user.interface";
import jwt from 'jsonwebtoken';
import { userService } from "../client/services/user";

const secret = <string>process.env.AUTH_SECRET;

class AuthService {

    generateAuthToken(user:User) {
        let payload = {
            id: user.id
        }

        let options = {
            expiresIn: "120m"
        }

        return jwt.sign(payload, secret, options);
    }

    
    async authenticate(req:Request, res:Response, next:NextFunction) {
        try {
            const auth = req.headers['authorization'] as string;
            if(!auth) throw  new AppError('Please login to access this resource.', 401);
            const authorized: any = jwt.verify(auth, secret);

            if(!authorized || !authorized.id) throw new AppError('invalid or expired authorization', 401);

            const user = await userService.findOne({id: authorized.id});

            if(!user) throw new AppError('invalid user', 403);

            req.user = user;

            return next();
        } catch (error) {
            return next(error);
        }
    }
}

export const authService = new AuthService();   