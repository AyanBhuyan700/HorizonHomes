import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, HelpCircle, ArrowRight, Sparkles } from "lucide-react";
import Footer from "../components/Footer";

function Faq() {
    const [openIndex, setOpenIndex] = useState(0);
    const [activeCategory, setActiveCategory] = useState("all");

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqs = [
        {
            category: "buyers",
            question: "How does HorizonHomes authenticate and verify property titles?",
            answer: "Every residence presented on HorizonHomes undergoes rigorous legal due diligence. Our legal partners verify municipal deed registries, structural engineering certificates, lien-free encumbrance clearances, and ownership legitimacy prior to listing publication.",
        },
        {
            category: "buyers",
            question: "Can international buyers acquire properties through HorizonHomes?",
            answer: "Yes. We specialize in cross-border acquisitions. Our concierge team assists with international escrow wires, currency exchange, foreign national title registration, and local tax compliance in the United States, United Kingdom, UAE, and EU markets.",
        },
        {
            category: "sellers",
            question: "How do I list my luxury property or estate?",
            answer: "To list your estate, sign in to your verified account or apply for an advisor partnership. Go to your dashboard and select 'Add Property'. Provide architectural details, pricing, and high-resolution media. Our team will review the documentation within 24 hours.",
        },
        {
            category: "escrow",
            question: "What security measures protect financial transactions?",
            answer: "We partner with Stripe and tier-one licensed escrow attorneys. Financial deposits and purchase funds are held in multi-signature regulated accounts until all contractual closing conditions and inspections are satisfied.",
        },
        {
            category: "buyers",
            question: "How do I arrange an in-person or virtual 360° private tour?",
            answer: "Navigate to any property detail page and select 'Schedule a Private Showing'. Select your preferred date, and a HorizonHomes luxury advisor will coordinate private access or an immersive spatial walkthrough.",
        },
        {
            category: "sellers",
            question: "Can I manage and modify my listings after initial publishing?",
            answer: "Yes. From your Admin Dashboard, you can update property pricing, adjust availability status (For Sale / For Rent), update descriptions, and manage architectural media in real time.",
        },
    ];

    const filteredFaqs = faqs.filter(
        (f) => activeCategory === "all" || f.category === activeCategory
    );

    return (
        <div className="bg-slate-50 min-h-screen text-slate-900 pt-28">
            {/* Hero Header */}
            <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-slate-950 text-white text-center">
                <div 
                    className="absolute inset-0 bg-cover bg-center opacity-20"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950" />
                
                <div className="relative z-10 max-w-2xl mx-auto">
                    <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">Knowledge Base</span>
                    <h1 className="font-heading text-3xl sm:text-5xl font-extrabold mt-2 tracking-tight">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-slate-400 text-sm mt-3 font-light">
                        Clear guidance regarding acquisition processes, legal title verification, and client concierge services.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Category Filters */}
                <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto pb-2">
                    {[
                        { id: "all", label: "All Questions" },
                        { id: "buyers", label: "Acquisitions & Buyers" },
                        { id: "sellers", label: "Listing & Sellers" },
                        { id: "escrow", label: "Escrow & Security" },
                    ].map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => {
                                setActiveCategory(cat.id);
                                setOpenIndex(0);
                            }}
                            className={`px-4 py-2 rounded-full text-xs font-semibold transition whitespace-nowrap ${
                                activeCategory === cat.id
                                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                            }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* FAQ Accordion */}
                <div className="space-y-4">
                    {filteredFaqs.map((faq, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <div
                                key={index}
                                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                                    isOpen
                                        ? "bg-white border-blue-500/30 shadow-md"
                                        : "bg-white border-slate-200/80 hover:border-slate-300 shadow-sm"
                                }`}
                            >
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full text-left flex justify-between items-center p-6 text-sm sm:text-base font-bold text-slate-900 focus:outline-none"
                                >
                                    <span className="pr-4">{faq.question}</span>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                                        isOpen ? "rotate-180 bg-blue-50 text-blue-600" : "bg-slate-100 text-slate-500"
                                    }`}>
                                        <ChevronDown size={18} />
                                    </div>
                                </button>
                                {isOpen && (
                                    <div className="px-6 pb-6 pt-0 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-50 mt-1">
                                        <p className="pt-3">{faq.answer}</p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Bottom Assistance Banner */}
                <div className="mt-16 bg-slate-900 text-white rounded-3xl p-8 text-center border border-slate-800">
                    <h3 className="font-heading text-xl font-bold mb-2">Have a question not listed here?</h3>
                    <p className="text-slate-400 text-xs sm:text-sm mb-6 max-w-md mx-auto">
                        Our advisory desk is available around the clock to provide discreet, tailored assistance.
                    </p>
                    <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold text-xs hover:bg-blue-500 transition shadow-lg shadow-blue-600/30"
                    >
                        <span>Speak with Our Team</span>
                        <ArrowRight size={14} />
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default Faq;
