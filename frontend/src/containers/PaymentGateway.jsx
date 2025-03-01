import React, { useState, useEffect } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PaymentGateway = () => {
    const userId = localStorage.getItem("id");
    const propertyId = localStorage.getItem("propertyId");
    const url = "https://horizonhomes-backend.onrender.com"
    const [property, setProperty] = useState(null);
    const [processing, setProcessing] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    useEffect(() => {
        if (!propertyId) {
            Swal.fire("Error", "No property selected!", "error");
            navigate("/");
            return;
        }

        axios.get(`${url}/propertyDetail?id=${propertyId}`)
            .then((res) => {
                setProperty(res.data.prtData);
            })
            .catch(() => {
                Swal.fire("Error", "Unable to fetch data from API", "error");
            });
            window.scrollTo(0, 0);
    }, [propertyId, navigate]);

    const handlePayment = async () => {
        if (!property || !property.price) {
            Swal.fire("Error", "Property price is not available!", "error");
            return;
        }

        if (!stripe || !elements) {
            Swal.fire("Error", "Stripe is not properly initialized!", "error");
            return;
        }

        setProcessing(true);

        try {
            const { data } = await axios.post(`${url}/api/payment/create-payment-intent`, {
                amount: property.price,
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
                Swal.fire("Payment Failed", result.error.message, "error");
            } else {
                Swal.fire("Success", "Payment completed successfully!", "success");
                navigate("/success");
            }
        } catch (error) {
            Swal.fire("Error", "Payment could not be processed!", "error");
        }

        setProcessing(false);
    };

    if (!property) {
        return <div className="flex justify-center items-center min-h-screen text-red-500">Loading property details...</div>;
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg">
                {/* Property Details */}
                <div className="mb-6">
                    {property.image && (
                        <img
                            src={`${url}/${property.image}`}
                            alt="Property"
                            className="w-full h-48 object-cover rounded-lg"
                        />
                    )}
                    <h2 className="text-2xl font-bold mt-4">{property.title}</h2>
                    <p className="text-lg text-gray-600">💰 ${property.price?.toLocaleString()}</p>
                </div>

                {/* Stripe Card Form */}
                <div className="p-4 bg-gray-100 rounded-lg mb-4">
                    <CardElement className="p-3 bg-white border rounded-lg shadow-sm" />
                </div>

                {/* Pay Button */}
                <button
                    className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300 disabled:opacity-50"
                    onClick={handlePayment}
                    disabled={processing}
                >
                    {processing ? "Processing..." : `Pay $${property.price?.toLocaleString()}`}
                </button>
            </div>
        </div>
    );
};

export default PaymentGateway;
