import React, { useState } from "react";

function Faq() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqs = [
        {
            question: "How do I list my property?",
            answer: "To list your property, sign up for an account, go to the dashboard, and click on 'Add Property'. Fill in the required details and submit.",
        },
        {
            question: "What are the costs of using this platform?",
            answer: "Our basic property listings are free. However, we offer premium listing plans for better visibility.",
        },
        {
            question: "How do I contact a property owner?",
            answer: "You can contact property owners by clicking on the 'Contact' button on the property details page.",
        },
        {
            question: "Is my personal information secure?",
            answer: "Yes, we use top-notch security measures to ensure your data is protected.",
        },
        {
            question: "Can I edit my property listing after submission?",
            answer: "Yes, you can edit your listing from your dashboard at any time.",
        },
    ];

    return (
        <>

            <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6 relative top-14 pb-14">
                {/* Hero Section */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-extrabold text-gray-800">❓ Frequently Asked Questions</h1>
                    <p className="text-lg text-gray-600 mt-3">Find answers to common questions about our platform.</p>
                </div>

                {/* FAQ List */}
                <div className="w-full max-w-3xl">
                    {faqs.map((faq, index) => (
                        <div key={index} className="bg-white shadow-md rounded-lg mb-4">
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full text-left flex justify-between items-center p-5 font-medium text-gray-800 hover:bg-gray-100 transition"
                            >
                                {faq.question}
                                <span className="text-blue-500 text-xl">
                                    {openIndex === index ? "−" : "+"}
                                </span>
                            </button>
                            {openIndex === index && (
                                <div className="p-5 border-t text-gray-600">{faq.answer}</div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Faq;
