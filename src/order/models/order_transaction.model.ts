import mongoose from "mongoose";

const schema = new mongoose.Schema({
    businessId: {
        type: String,
        required: true
    },

    amount: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        required: true
    }
})

export const OrderTransactionModel = mongoose.model('order_transaction', schema);