import { objectOf, primitives } from "@altostra/type-validations";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../../shared/error/error";

class OrderValidator {
    checkCreateOrder (req:Request, res:Response, next:NextFunction) {
        try {
            const isValidRequest = objectOf({
                amount: primitives.number,
            })

            if(!isValidRequest(req.body)) throw new AppError('invalid request', 400);

            return next();
        } catch (error) {
            return next(error);
        }
    }
}


export const orderValidator = new OrderValidator();