import { Transaction } from "sequelize";
import { User, UserAttributes } from "../models/interface/user.interface";
import UserModel from "../models/schema/user.model";
import { AppError } from "../../shared/error/error";
import { utils } from "../../shared/util";
import { authService } from "../../middleware/auth";


class UserService {
    async addUser(payload:UserAttributes, dbTranx?:Transaction) {
        await this.validateUserExists(payload.email);

        return UserModel.create(payload, {transaction: dbTranx});
    }


    async validateUserExists(email:string) {
        const exists = await UserModel.findOne({where: {email}});

        if(exists) throw new AppError("user already exists", 409);
    }


    async login (email:string, password:string) {
        const user = await this.findOne({email});

        if(!user) throw new AppError("invalid credentials", 401);

        const valid = await utils.compareHash(password, user.password);

        if(!valid) throw new AppError("invalid credentials", 401);

        const token = authService.generateAuthToken(user);

        return {
            user,
            token
        }
    }


    async findOne(params:Partial<User>) {
        return UserModel.findOne({where: params});
    }
}

export const userService = new UserService();