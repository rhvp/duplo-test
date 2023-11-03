import { NextFunction, Request, Response } from "express";
import { businessService } from "../services/business";
import { sequelize } from "../../shared/db/sql";
import { UserAttributes } from "../models/interface/user.interface";
import { userService } from "../services/user";
import { AppError } from "../../shared/error/error";


class ClientController {
    async createBusiness (req:Request, res:Response, next:NextFunction) {
        const dbTranx = await sequelize.transaction();
        try {
            let {name, address, first_name, last_name, email, password} = req.body;


            const business = await businessService.create({name, address}, dbTranx);

            let userPayload:UserAttributes = {
                first_name,
                last_name,
                email,
                password,
                business_id: business.id
            }

            const user = await userService.addUser(userPayload, dbTranx);

            await dbTranx.commit();

            return res.json({
                status: 'success',
                data: {
                    business,
                    user
                }
            })
        } catch (error) {
            await dbTranx.rollback()
            return next(error);
        }
    }


    async addBusinessUser (req:Request, res:Response, next:NextFunction) {
        try {
            let {first_name, last_name, email, password, business_id, department} = req.body;

            const business = await businessService.findOne({id: business_id});

            if(!business) throw new AppError("invalid business", 404);

            let payload = {
                first_name,
                last_name,
                email,
                password,
                business_id: business.id,
                department
            }

            const user = await userService.addUser(payload);

            return res.json({
                status: 'success',
                data: user
            });
            
        } catch (error) {
            return next(error);
        }
    }


    async login (req:Request, res:Response, next:NextFunction) {
        try {
            let {email, password} = req.body;

            const response = await userService.login(email, password);

            return res.json({
                status: 'success',
                data: response
            });
        } catch (error) {
            return next(error);
        }
    }


    async getCreditScore(req:Request, res:Response, next:NextFunction) {
        try {
            let business_id = <string>req.query.business_id;
            const business = await businessService.findOne({id: business_id});
            if(!business) throw new AppError("invalid business", 404);

            const result = await businessService.calculateCreditScore(business)

            return res.json({
                status: 'success',
                data: result
            })
        } catch (error) {
            return next(error);
        }
    }
}


export const clientController = new ClientController();