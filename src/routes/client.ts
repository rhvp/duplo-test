import express from "express";
import { clientValidator } from "../middleware/validators/client.validator";
import { clientController } from "../client/controllers/client.controller";
import { authService } from "../middleware/auth";


const clientRouter = express.Router();

clientRouter.post(
    "/business",
    clientValidator.checkAddBusiness,
    clientController.createBusiness
)

clientRouter.post(
    "/user",
    clientValidator.checkAddUser,
    clientController.addBusinessUser
)

clientRouter.post(
    "/login",
    clientValidator.checkLogin,
    clientController.login
)

clientRouter.get(
    "/credit-score",
    clientValidator.checkFetchBusiness,
    clientController.getCreditScore
)

export default clientRouter;
