import { FindOptions, Op, Sequelize } from "sequelize";
import { Order, OrderAttributes } from "../models/interface";
import OrderModel from "../models/order.model";
import { Business } from "../../client/models/interface/business.interface";
import { OrderTransactionModel } from "../models/order_transaction.model";


class OrderService {
    async create (data:OrderAttributes) {
        return OrderModel.create(data);
    }

    async update (params:Partial<Order>, update:Partial<Order>) {
        return OrderModel.update(update, {where: params});
    }

    async findAll (params = {}, options?:FindOptions) {
        return OrderModel.findAll({where: params, ...options});
    }

    async getBusinessOrderDetails (business:Business, dateFilter?:{}) {
        let filter = {
            business_id: business.id,
        }

        let today_filter = {
            business_id: business.id,
            ...dateFilter
        }

        const all_amount_query:any = await this.findAll(filter, 
        {
            attributes: [
                [Sequelize.fn('sum', Sequelize.col('amount')), 'total']
            ]
        });

        const today_amount_query:any = await this.findAll(today_filter, 
            {
                attributes: [
                    [Sequelize.fn('sum', Sequelize.col('amount')), 'total']
                ]
            });

        const total_amount_sum = parseFloat(all_amount_query[0].dataValues.total) | 0; 
        const today_amount_sum = parseFloat(today_amount_query[0].dataValues.total) | 0; 

        const total_count = await OrderModel.count({where: filter});
        const today_count = await OrderModel.count({where: today_filter});

        return {
            today_amount_sum,
            total_amount_sum,
            total_count,
            today_count
        }
    }
}

export const orderService = new OrderService();