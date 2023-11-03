import mongoose from "mongoose";

let url = <string>process.env.MONGO_URL;

mongoose.connect(url)

export const db_connection = mongoose.connection;

