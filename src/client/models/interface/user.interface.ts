import { Model } from "sequelize";



export interface User {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    business_id: string;
    department: string;
    password: string;
}

declare global{
    namespace Express {
        interface Request {
            user: User
        }
    }
}

export interface UserAttributes extends Omit<User, 'id'|'department'|'phone'> {}

export interface UserInstance extends Model<User, UserAttributes>, User {
    created_at?: Date;
    updated_at?: Date;
}


