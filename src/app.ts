import express, { Application, NextFunction, Request, Response } from "express";
import { errorHandler } from "./shared/error/handler";
import { AppError } from "./shared/error/error";
import clientRouter from "./routes/client";
import orderRouter from "./routes/order";


const app: Application = express();

app.use(express.json({limit: '15mb'}));
app.use(express.urlencoded({limit: '15mb', extended: true}));

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('Hello World');
});

app.use(clientRouter, orderRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
    let err: AppError = new AppError(`${req.ip} tried to reach a resource at ${req.originalUrl} that is not on this server.`, 404);
    next(err);
});

app.use(errorHandler);
export {app};