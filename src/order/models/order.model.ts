import { DataTypes } from "sequelize";
import { sequelize } from "../../shared/db/sql";
import { OrderInstance, OrderStatus } from "./interface";
import { OrderTransactionModel } from "./order_transaction.model";


const OrderModel = sequelize.define<OrderInstance>(
    'order',
    {
      id: {
          autoIncrement: false,
          primaryKey: true,
          type: DataTypes.UUID,
          unique: true,
          defaultValue: DataTypes.UUIDV4
      },
      reference: DataTypes.STRING,
      status: DataTypes.ENUM(OrderStatus.PENDING, OrderStatus.FAILED, OrderStatus.SUCCESS),
      business_id: DataTypes.UUID,
      user_id: DataTypes.UUID,
      amount: DataTypes.DECIMAL,
      tax_logged: DataTypes.BOOLEAN
    },
    {
        freezeTableName: true,
        underscored: true
    }
)

OrderModel.afterCreate((instance:OrderInstance) => {
    let {amount, business_id, status} = instance;
    OrderTransactionModel.create({
        businessId: business_id,
        date: new Date(),
        amount,
        status
    })
})

export default OrderModel;