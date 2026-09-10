import React, { useEffect, useState } from "react";
import { Mail, Phone, MapPin, Send, Clock, Building2, ShieldCheck } from "lucide-react";
import Swal from "sweetalert2";
import Footer from "../components/Footer";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", topic: "acquisition", message: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      Swal.fire("Incomplete Information", "Please provide your name, email, and message.", "warning");
      return;
    }
    setSubmitted(true);
    Swal.fire("Message Received", "A HorizonHomes luxury advisor will contact you within 4 business hours.", "success");
    setForm({ name: "", email: "", phone: "", topic: "acquisition", message: "" });
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 pt-28">
      {/* Hero Header */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-slate-950 text-white text-center">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950" />
        
        <div className="relative z-10 max-w-2xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">Concierge Desk</span>
          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold mt-2 tracking-tight">
            Connect With Our Private Client Group
          </h1>
          <p className="text-slate-400 text-sm mt-3 font-light">
            Inquire regarding an exclusive residence, request a private tour, or speak with our valuation advisors.
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Contact Channels & Offices */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">Direct Inquiries</span>
              <h2 className="font-heading text-2xl font-bold text-slate-900 mt-1 mb-4">
                We're at Your Service
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Whether you are seeking an off-market waterfront villa or wish to list an architectural estate, our senior partners are available.
              </p>
            </div>

            {/* Channels Card */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-slate-900 text-sm">Direct Phone</h4>
                  <p className="text-slate-600 text-xs mt-0.5">+1 (800) 555-9090</p>
                  <p className="text-[11px] text-slate-400">Mon – Sat, 8:00 AM – 9:00 PM EST</p>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-4 border-t border-slate-100">
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-slate-900 text-sm">Email Inquiries</h4>
                  <a href="mailto:concierge@horizonhomes.com" className="text-blue-600 text-xs mt-0.5 block hover:underline">
                    concierge@horizonhomes.com
                  </a>
                  <p className="text-[11px] text-slate-400">Average response time: 2 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-4 border-t border-slate-100">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-slate-900 text-sm">Headquarters</h4>
                  <p className="text-slate-600 text-xs mt-0.5">740 Park Avenue, Manhattan, NY 10021</p>
                  <p className="text-[11px] text-slate-400">Beverly Hills • London • Dubai</p>
                </div>
              </div>
            </div>

            {/* Escrow Guarantee Pill */}
            <div className="p-4 rounded-2xl bg-slate-900 text-white flex items-center gap-3 border border-slate-800">
              <ShieldCheck className="w-5 h-5 text-blue-400 shrink-0" />
              <p className="text-xs text-slate-300">
                All communications and inquiries are held under strict non-disclosure privacy agreements.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-xl">
              <h3 className="font-heading text-2xl font-bold text-slate-900 mb-1">
                Send an Inquiry
              </h3>
              <p className="text-slate-500 text-xs mb-8">
                Please complete the form below. A dedicated client advisor will be matched to your request.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="e.g. Lord Alexander"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="e.g. alexander@domain.com"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                      Telephone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                      Inquiry Nature
                    </label>
                    <select
                      name="topic"
                      value={form.topic}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 font-medium cursor-pointer"
                    >
                      <option value="acquisition">Property Acquisition</option>
                      <option value="listing">Listing / Estate Valuation</option>
                      <option value="showing">Private Showing Request</option>
                      <option value="press">Press & Partnerships</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                    Your Message or Property Preferences *
                  </label>
                  <textarea
                    name="message"
                    rows="4"
                    required
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Describe your desired location, budget, architectural preferences, or specific inquiry..."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 font-medium"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 text-white font-semibold text-sm hover:from-blue-500 hover:to-indigo-500 transition shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  <span>Submit Confidential Inquiry</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Contact;
