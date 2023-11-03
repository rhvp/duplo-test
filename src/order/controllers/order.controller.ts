import { NextFunction, Request, Response } from "express";
import { OrderAttributes, OrderStatus } from "../models/interface";
import { utils } from "../../shared/util";
import { orderService } from "../services/order";
import { taxService } from "../../shared/tax";
import { businessService } from "../../client/services/business";
import { AppError } from "../../shared/error/error";
import { Op } from "sequelize";
import moment from "moment";

class OrderController {
    async create (req:Request, res:Response, next:NextFunction) {
        try {
            let {amount} = req.body;
            let user = req.user;

            let payload:OrderAttributes = {
                user_id: user.id,
                business_id: user.business_id,
                amount,
                reference: utils.generateRef(10, true),
                status: OrderStatus.SUCCESS
            }

            const order = await orderService.create(payload);

            taxService.processTax(order);

            return res.json({
                status: 'success',
                data: order
            });
        } catch (error) {
            return next(error);
        }
    }


    async getBusinessOrderDetails (req:Request, res:Response, next:NextFunction) {
        try {
            let business_id = <string>req.query.business_id;
            const business = await businessService.findOne({id: business_id});
            if(!business) throw new AppError("invalid business", 404);

            let start_date = moment().format('YYYY-MM-DD'),
            end_date = start_date;

            let dateFilter = {};

            if(start_date && end_date) {
                let formated = utils.formatRequestDatePeriod(start_date, end_date);
                dateFilter = {
                    created_at: {
                        [Op.gte]: formated.start_date,
                        [Op.lte]: formated.end_date
                    }
                }
            }

            const result = await orderService.getBusinessOrderDetails(business, dateFilter)

            return res.json({
                status: 'success',
                data: result
            })
        } catch (error) {
            return next(error);
        }
    }
}

export const orderController = new OrderController();