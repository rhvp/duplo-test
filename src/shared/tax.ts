import axios, { AxiosRequestConfig } from "axios";
import { Order } from "../order/models/interface";
import { orderService } from "../order/services/order";


class TaxService {
    async processTax (order:Order) {
        await this.log(order);
        await orderService.update({id: order.id}, {tax_logged: true});

    }
    
    private async log(order:Order) {
        try {
            let data = {
                order_id: order.id, 
                platform_code: "022",
                order_amount: order.amount
            }
    
            let options:AxiosRequestConfig = {
                url: "https://taxes.free.beeceptor.com/log-tax",
                method: "POST",
                data: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            }
    
            const response = await axios.request(options);

            if(!response?.data) return;

        } catch (error) {
            console.error(error);
        }
    }
}

export const taxService = new TaxService();