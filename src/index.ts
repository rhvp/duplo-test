import * as dotenv from 'dotenv';
import { app } from './app';
import { db_connection } from './shared/db/mongo';
import { checkPendingtaxLog } from './shared/cron';
dotenv.config();

const port: any = process.env.PORT || 5000;

app.listen(port, ()=>{
    console.info(`App running on Port: ${port}`);
})
db_connection.on('connected', () => {
    console.log('mongodb connected')
})

checkPendingtaxLog.start();

process.on('uncaughtException', (err) => {
    console.warn('Uncaught Exception!! Shutting down process..');
    console.error(err.stack);
});

process.on('unhandledRejection', (err) =>{
    console.warn('Unhandled Rejection!!' + err);
});