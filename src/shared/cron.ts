import cron from 'node-cron';
import { orderService } from '../order/services/order';
import { taxService } from './tax';

export const checkPendingtaxLog = cron.schedule('*/2 * * * *', async() => {
    const orders = await orderService.findAll({
        tax_logged: false
    }, {raw: true, limit: 10})

    for (const order of orders) {
        await taxService.processTax(order);
    }
})