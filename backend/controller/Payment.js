import Stripe from "stripe";
import dotenv from "dotenv";
import Payment from "../models/Payment.js";

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createPaymentIntent = async (req, res) => {
    try {
        const { amount, currency, userId, propertyId } = req.body;

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // Convert to cents
            currency,
            payment_method_types: ["card"],
        });

        // Save payment in database
        const newPayment = new Payment({
            userId,
            propertyId,
            amount,
            currency,
            paymentIntentId: paymentIntent.id,
            status: "pending",
        });

        await newPayment.save();

        res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
