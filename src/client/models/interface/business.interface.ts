import { Model } from "sequelize";

export interface Business {
    id: string;
    name: string;
    address: string;
}


export interface BusinessAttributes extends Omit<Business, 'id'> {}

export interface BusinessInstance extends Model<Business, BusinessAttributes>, Business {
    created_at?: Date;
    updated_at?: Date;
}