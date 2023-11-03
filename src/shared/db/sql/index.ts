import { Sequelize } from "sequelize";
import * as dotenv from 'dotenv';
dotenv.config();


const env = process.env.NODE_ENV as string;
const config = require('./config.js')[env];

let sequelize = new Sequelize(config.database as string, config.username as string, config.password as string, config);
export {Sequelize, sequelize};
