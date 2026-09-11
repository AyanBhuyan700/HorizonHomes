import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  HelpCircle, Phone, Mail, MessageSquare, ShieldCheck, 
  FileText, Clock, ArrowRight, Sparkles 
} from "lucide-react";
import Swal from "sweetalert2";
import Footer from "../components/Footer";

function Support() {
  const [activeChat, setActiveChat] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleStartChat = () => {
    Swal.fire({
      title: "Connecting to Concierge",
      text: "A dedicated HorizonHomes senior advisor is connecting to your session...",
      icon: "info",
      timer: 2000,
      showConfirmButton: false,
    });
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 pt-28">
      {/* Hero Header */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-slate-950 text-white text-center">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=80')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950" />
        
        <div className="relative z-10 max-w-2xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">Client Services</span>
          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold mt-2 tracking-tight">
            How May We Assist You?
          </h1>
          <p className="text-slate-400 text-sm mt-3 font-light">
            Our private client specialists are on standby around the clock to support your property inquiries, escrow milestones, and viewing schedules.
          </p>
        </div>
      </section>

      {/* Support Channels Grid */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Card 1: Concierge Chat */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col justify-between hover:shadow-xl transition duration-300">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-xl font-bold text-slate-900 mb-2">Live Concierge Chat</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Connect instantly with our luxury advisory desk for immediate property inquiries, valuation estimates, or showing requests.
              </p>
            </div>
            <button
              onClick={handleStartChat}
              className="w-full py-3.5 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-500 transition shadow-md shadow-blue-600/25 flex items-center justify-center gap-2"
            >
              <span>Initiate Priority Chat</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 2: Telephone Hotline */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col justify-between hover:shadow-xl transition duration-300">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-xl font-bold text-slate-900 mb-2">Direct Phone Hotline</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-2">
                Speak directly with an accredited luxury real estate advisor.
              </p>
              <p className="font-heading text-2xl font-extrabold text-slate-900 mb-1">+1 (800) 555-9090</p>
              <p className="text-xs text-slate-400 mb-6">Available 24/7 for verified clients</p>
            </div>
            <a
              href="tel:+18005559090"
              className="w-full py-3.5 rounded-xl bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 transition flex items-center justify-center gap-2 text-center"
            >
              <Phone className="w-4 h-4" />
              <span>Call Concierge Desk</span>
            </a>
          </div>

          {/* Card 3: Frequently Asked Questions */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col justify-between hover:shadow-xl transition duration-300">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-6">
                <HelpCircle className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-xl font-bold text-slate-900 mb-2">Frequently Asked Questions</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Find clear answers to questions regarding property listings, verified titles, digital escrow, and foreign investment regulations.
              </p>
            </div>
            <Link
              to="/faq"
              className="w-full py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm transition flex items-center justify-center gap-2 text-center"
            >
              <span>Explore FAQ Knowledge Base</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Card 4: Escrow & Legal Desk */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col justify-between hover:shadow-xl transition duration-300">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-xl font-bold text-slate-900 mb-2">Escrow & Legal Support</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Need guidance regarding international wires, title transfer documentation, or purchase contracts? Reach our transaction attorneys.
              </p>
            </div>
            <Link
              to="/contact"
              className="w-full py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm transition flex items-center justify-center gap-2 text-center"
            >
              <span>Contact Legal Advisory</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Support;
