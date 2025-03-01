import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    propertyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "property",
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    currency: {
        type: String,
        default: "USD",
    },
    status: {
        type: String,
        enum: ["pending", "completed", "failed"],
        default: "pending",
    },
    paymentIntentId: {
        type: String,
        required: true,
    },
    paymentMethod: {
        type: String,
        enum: ["card", "paypal", "bank_transfer"],
        default: "card",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Payment = mongoose.model("payment", paymentSchema);
export default Payment;
