import { Model } from "sequelize";

export interface Order {
    id: string;
    reference: string;
    business_id: string;
    user_id: string;
    amount: number;
    tax_logged: boolean;
    status: OrderStatus;
}

export enum OrderStatus {
    PENDING = 'pending',
    FAILED = 'failed',
    SUCCESS = 'success'
}

export interface OrderAttributes extends Omit<Order, 'id'|'tax_logged'> {}

export interface OrderInstance extends Model<Order, OrderAttributes>, Order {
    created_at?: Date;
    updated_at?: Date;
}