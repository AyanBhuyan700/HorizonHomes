import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "./index.css";
import App from "./App.jsx";

const stripePromise = loadStripe("pk_test_51QuxIk2S4YZO9CRMvezsFpYCAZga0gxhQ6LTTgDIsEVIEgasD85ejegLAuX9UYwFf9BgapCjFCHBh7U3EmAcgUNY00ThEKwqAl"); // Replace with your Stripe Public Key

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
      <Elements stripe={stripePromise}>
        <App />
      </Elements>
    </BrowserRouter>
);

