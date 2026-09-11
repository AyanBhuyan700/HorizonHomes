import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CheckCircle, ShieldCheck, ArrowRight, Home, Download, FileCheck, PhoneCall } from "lucide-react";

function Success() {
    const navigate = useNavigate();
    const [timeLeft, setTimeLeft] = useState(10);
    const transactionDocket = "HH-ESC-" + Math.floor(100000 + Math.random() * 900000);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    navigate("/view");
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [navigate]);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Ambient Lighting */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-2/3 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-xl w-full relative z-10">
                <div className="glass-card p-8 sm:p-12 rounded-3xl border border-white/10 bg-slate-900/80 backdrop-blur-2xl shadow-2xl text-center">
                    {/* Animated Checkmark Circle */}
                    <div className="relative inline-flex items-center justify-center mb-6">
                        <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping opacity-50" />
                        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-slate-950 shadow-lg shadow-emerald-500/20 relative z-10">
                            <CheckCircle className="w-10 h-10 stroke-[2.5]" />
                        </div>
                    </div>

                    {/* Escrow Badge */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold tracking-wider uppercase mb-3">
                        <ShieldCheck className="w-3.5 h-3.5" /> Escrow Deposit Secured
                    </div>

                    <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-3">
                        Acquisition Confirmed
                    </h1>
                    <p className="text-slate-300 text-sm sm:text-base mb-6 leading-relaxed">
                        Your earnest deposit has been safely received into attorney escrow. A private conveyance counselor has been assigned to your acquisition.
                    </p>

                    {/* Transaction Docket Card */}
                    <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5 mb-8 text-left space-y-3">
                        <div className="flex justify-between items-center text-xs pb-2 border-b border-slate-800/80">
                            <span className="text-slate-400">Escrow Docket Number</span>
                            <span className="font-mono text-emerald-400 font-semibold">{transactionDocket}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs pb-2 border-b border-slate-800/80">
                            <span className="text-slate-400">Settlement Status</span>
                            <span className="text-white font-medium flex items-center gap-1">
                                <FileCheck className="w-3.5 h-3.5 text-blue-400" /> Pending Title Conveyance
                            </span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                            <span className="text-slate-400">Concierge Desk Response</span>
                            <span className="text-slate-300 font-medium flex items-center gap-1">
                                <PhoneCall className="w-3.5 h-3.5 text-amber-400" /> Within 2 Business Hours
                            </span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link
                            to="/view"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-lg shadow-blue-600/30"
                        >
                            <Home className="w-4 h-4" /> Return to Properties
                        </Link>
                        <Link
                            to="/contact"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 hover:text-white text-sm font-medium border border-slate-700 transition-all"
                        >
                            Contact Your Advisor <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    {/* Countdown */}
                    <p className="text-xs text-slate-500 mt-6">
                        Automatic redirect to properties in <span className="text-slate-300 font-semibold">{timeLeft}s</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Success;

