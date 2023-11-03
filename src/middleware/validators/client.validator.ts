import { objectOf, primitives } from "@altostra/type-validations";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../../shared/error/error";
import validator from "validator";


class ClientValidator {
    checkAddBusiness (req:Request, res:Response, next:NextFunction) {
        try {
            const isValidRequest = objectOf({
                name: primitives.string,
                address: primitives.string,
                first_name: primitives.string,
                last_name: primitives.string,
                email: primitives.string,
                phone: primitives.maybeString,
                password: primitives.string,
            })

            if(!isValidRequest(req.body)) throw new AppError('invalid request', 400);

            let {email, password, phone} = req.body;

            if(!validator.isEmail(email)) throw new AppError('invalid email', 400);
            if(!validator.isStrongPassword(password, {minLength: 6})) throw new AppError('please use stronger password', 400);
            if(phone && !validator.isMobilePhone(phone)) throw new AppError('invalid phone number', 400);

            return next();
        } catch (error) {
            return next(error);
        }
    }


    checkAddUser (req:Request, res:Response, next:NextFunction) {
        try {
            const isValidRequest = objectOf({
                first_name: primitives.string,
                last_name: primitives.string,
                email: primitives.string,
                phone: primitives.maybeString,
                department: primitives.string,
                password: primitives.string,
                business_id: primitives.string,
            })
    
            if(!isValidRequest(req.body)) throw new AppError('invalid request', 400);
    
            let {email, password, phone, business_id} = req.body;

            if(!validator.isUUID(business_id)) throw new AppError('invalid business id', 400);
            if(!validator.isEmail(email)) throw new AppError('invalid email', 400);
            if(!validator.isStrongPassword(password, {minLength: 6})) throw new AppError('please use stronger password', 400);
            if(phone && !validator.isMobilePhone(phone)) throw new AppError('invalid phone number', 400);
    
            return next();
        } catch (error) {
            return next(error);
        }
    }


    checkLogin (req:Request, res:Response, next:NextFunction) {
        try {
            const isValidRequest = objectOf({
                email: primitives.string,
                password: primitives.string,
            })
    
            if(!isValidRequest(req.body)) throw new AppError('invalid request', 400);
    
            let {email} = req.body;
    
            if(!validator.isEmail(email)) throw new AppError('invalid email', 400);
    
            return next();
        } catch (error) {
            return next(error);
        }
    }


    checkFetchBusiness (req:Request, res:Response, next:NextFunction) {
        try {
            const isValidRequest = objectOf({
                business_id: primitives.string
            })
    
            if(!isValidRequest(req.query)) throw new AppError('invalid request', 400);
    
            let {business_id} = req.query;
            
            if(!validator.isUUID(business_id)) throw new AppError('invalid business id', 400);
    
            return next();
        } catch (error) {
            return next(error);
        }
    }
}

export const clientValidator = new ClientValidator();