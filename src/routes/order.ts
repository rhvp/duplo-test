import express from "express";
import { orderValidator } from "../middleware/validators/order.validator";
import { authService } from "../middleware/auth";
import { orderController } from "../order/controllers/order.controller";
import { clientValidator } from "../middleware/validators/client.validator";

const orderRouter = express.Router();

orderRouter.post(
    "/orders",
    orderValidator.checkCreateOrder,
    authService.authenticate,
    orderController.create
)


orderRouter.get(
    "/order-details",
    clientValidator.checkFetchBusiness,
    orderController.getBusinessOrderDetails
)

export default orderRouter;