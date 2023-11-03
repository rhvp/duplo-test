import { Transaction } from 'sequelize';
import {Business, BusinessAttributes} from '../models/interface/business.interface';
import BusinessModel from '../models/schema/business.model';
import { AppError } from '../../shared/error/error';
import { OrderTransactionModel } from '../../order/models/order_transaction.model';

class BusinessService {
    async create(payload:BusinessAttributes, dbTranx:Transaction) {
        payload.name = payload.name.toUpperCase();
        let {name} = payload;
        await this.validateBusinessExist(name);
        return BusinessModel.create(payload, {transaction: dbTranx});
    }


    async findOne(params:Partial<Business>) {
        return BusinessModel.findOne({where: params});
    }

    private async validateBusinessExist (name:string) {
        const exists = await BusinessModel.findOne({where: {name}});
        if(exists) throw new AppError("business name exists", 409);
    }

    async calculateCreditScore (business:Business) {
        const res = await OrderTransactionModel.aggregate([
            { $match: {businessId: business.id}},
            { $group: { _id: null, amount: { $sum: "$amount"}}}
        ])

        let total_amount = res[0].amount ?? 0;

        const count = await OrderTransactionModel.countDocuments({businessId: business.id});

        return total_amount/(count * 100);
    }
}

export const businessService = new BusinessService();