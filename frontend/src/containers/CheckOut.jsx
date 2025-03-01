import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

const Checkout = ({ amount, userId, propertyId }) => {
    const url = "https://horizonhomes-backend.onrender.com"
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);

    const handlePayment = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data } = await axios.post(`${url}/api/payment/create-payment-intent`, {
                amount,
                currency: "usd",
                userId,
                propertyId,
            });

            const result = await stripe.confirmCardPayment(data.clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            });

            if (result.error) {
                console.error(result.error.message);
            } else {
                alert("Payment Successful!");
            }
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    return (
        <form onSubmit={handlePayment}>
            <CardElement />
            <button type="submit" disabled={!stripe || loading}>
                Pay ${amount}
            </button>
        </form>
    );
};

export default Checkout;
