import React, { useState, useEffect } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { ShieldCheck, Lock, Building2, CreditCard, ArrowLeft, CheckCircle2, Award, FileText } from "lucide-react";
import Loader from "../components/Loader";

const PaymentGateway = () => {
    const userId = localStorage.getItem("id");
    const propertyId = localStorage.getItem("propertyId");
    const url = "https://horizonhomes-backend.onrender.com";
    const [property, setProperty] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [loading, setLoading] = useState(true);
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    useEffect(() => {
        if (!propertyId) {
            Swal.fire({
                title: "No Property Selected",
                text: "Please select a property from our available listings.",
                icon: "warning",
                confirmButtonColor: "#0f172a"
            });
            navigate("/view");
            return;
        }

        axios.get(`${url}/propertyDetail?id=${propertyId}`)
            .then((res) => {
                setProperty(res.data.prtData);
                setLoading(false);
            })
            .catch(() => {
                Swal.fire({
                    title: "Connection Issue",
                    text: "Unable to retrieve property acquisition details. Please retry.",
                    icon: "error",
                    confirmButtonColor: "#0f172a"
                });
                setLoading(false);
            });
        window.scrollTo(0, 0);
    }, [propertyId, navigate]);

    const handlePayment = async () => {
        if (!property || !property.price) {
            Swal.fire("Error", "Property acquisition valuation is not available.", "error");
            return;
        }

        if (!stripe || !elements) {
            Swal.fire("Error", "Secure payment channel is initializing. Please wait.", "error");
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
                Swal.fire({
                    title: "Transaction Declined",
                    text: result.error.message,
                    icon: "error",
                    confirmButtonColor: "#0f172a"
                });
            } else {
                Swal.fire({
                    title: "Escrow Deposit Confirmed",
                    text: "Your formal reservation deposit has been placed into secure escrow.",
                    icon: "success",
                    confirmButtonColor: "#0f172a"
                });
                navigate("/success");
            }
        } catch (error) {
            Swal.fire({
                title: "Transaction Error",
                text: "Unable to authorize payment. Please contact your banking advisor.",
                icon: "error",
                confirmButtonColor: "#0f172a"
            });
        }

        setProcessing(false);
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Ambient Glow */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-5xl mx-auto relative z-10">
                {/* Navigation Back */}
                <div className="mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" /> Return to Property Dossier
                    </button>
                </div>

                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wider uppercase mb-3">
                        <ShieldCheck className="w-3.5 h-3.5" /> Tier-1 Encrypted Escrow Gateway
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
                        Secure Acquisition Settlement
                    </h1>
                    <p className="text-slate-400 text-sm sm:text-base mt-2">
                        Complete your earnest reservation deposit into institutional escrow under attorney oversight.
                    </p>
                </div>

                {processing ? (
                    <div className="glass-panel p-16 text-center max-w-md mx-auto rounded-3xl border border-white/10">
                        <Loader />
                        <p className="mt-4 text-slate-300 font-medium animate-pulse">Encrypting & Verifying Transaction...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        {/* Order Summary Column */}
                        <div className="lg:col-span-5 space-y-6">
                            <div className="glass-card p-6 rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl">
                                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-blue-400" /> Acquisition Summary
                                </h3>

                                {property && (
                                    <>
                                        <div className="relative rounded-2xl overflow-hidden mb-4 aspect-video bg-slate-800">
                                            {property.image ? (
                                                <img
                                                    src={`${url}/${property.image}`}
                                                    alt={property.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-slate-500">
                                                    <Building2 className="w-12 h-12 stroke-[1]" />
                                                </div>
                                            )}
                                            <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/10 text-xs font-medium text-white">
                                                ID #{property._id ? property._id.slice(-6).toUpperCase() : "ES-8492"}
                                            </div>
                                        </div>

                                        <h4 className="text-lg font-serif font-bold text-white mb-1">
                                            {property.title}
                                        </h4>
                                        <p className="text-slate-400 text-sm mb-4">
                                            {property.location || "Prime Metropolitan District"}
                                        </p>

                                        <div className="border-t border-slate-800 pt-4 space-y-2.5 text-sm">
                                            <div className="flex justify-between text-slate-400">
                                                <span>Agreed Valuation</span>
                                                <span className="text-white font-medium">${property.price?.toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between text-slate-400">
                                                <span>Attorney Escrow Hold (100%)</span>
                                                <span className="text-white font-medium">${property.price?.toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between text-slate-400">
                                                <span>Conveyance Filing</span>
                                                <span className="text-emerald-400 font-medium">Included / Waived</span>
                                            </div>
                                            <div className="border-t border-slate-800 pt-3 flex justify-between items-baseline">
                                                <span className="font-semibold text-white">Total Authorized</span>
                                                <span className="text-2xl font-bold font-serif text-amber-400">
                                                    ${property.price?.toLocaleString()}
                                                </span>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Trust Pillar Checklist */}
                            <div className="p-5 rounded-2xl bg-slate-900/40 border border-white/5 space-y-3">
                                <div className="flex items-center gap-3 text-xs text-slate-300">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                                    <span>Funds held in FDIC-insured escrow accounts</span>
                                </div>
                                <div className="flex items-center gap-3 text-xs text-slate-300">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                                    <span>Subject to satisfactory title deed search & survey</span>
                                </div>
                                <div className="flex items-center gap-3 text-xs text-slate-300">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                                    <span>Immediate confirmation & private advisor dispatch</span>
                                </div>
                            </div>
                        </div>

                        {/* Payment Card Column */}
                        <div className="lg:col-span-7">
                            <div className="glass-card p-8 rounded-3xl border border-white/10 bg-slate-900/80 backdrop-blur-xl shadow-2xl">
                                <div className="flex items-center justify-between pb-6 border-b border-slate-800">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                                            <CreditCard className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-white">Card Authorization</h3>
                                            <p className="text-xs text-slate-400">Visa, Mastercard, Amex, & Diners Club</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700">
                                        <Lock className="w-3 h-3 text-emerald-400" /> 256-Bit SSL
                                    </div>
                                </div>

                                <div className="mt-6 space-y-4">
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                                        Card Credentials
                                    </label>
                                    <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-700/80 focus-within:border-blue-500 transition-colors shadow-inner">
                                        <CardElement
                                            options={{
                                                style: {
                                                    base: {
                                                        fontSize: "16px",
                                                        color: "#f8fafc",
                                                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                                                        "::placeholder": {
                                                            color: "#64748b",
                                                        },
                                                    },
                                                    invalid: {
                                                        color: "#f87171",
                                                    },
                                                },
                                            }}
                                        />
                                    </div>
                                    <p className="text-xs text-slate-500">
                                        Your payment information is encrypted and transmitted directly to Stripe. We do not store raw card numbers.
                                    </p>
                                </div>

                                <div className="mt-8 pt-6 border-t border-slate-800">
                                    <button
                                        type="button"
                                        disabled={processing}
                                        onClick={handlePayment}
                                        className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-base shadow-xl shadow-blue-900/30 transition-all flex items-center justify-center gap-2 group cursor-pointer"
                                    >
                                        <Lock className="w-4 h-4 text-blue-200 group-hover:scale-110 transition-transform" />
                                        Authorize Escrow Deposit (${property?.price?.toLocaleString() || "0"})
                                    </button>

                                    <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
                                        <Award className="w-3.5 h-3.5 text-amber-400" />
                                        <span>HorizonHomes Sovereign Escrow Guarantee</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentGateway;

