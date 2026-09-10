import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Building2, ShieldCheck, Award, Globe, Users, ArrowRight, Sparkles } from "lucide-react";
import Footer from "../components/Footer";

function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 pt-28">
      {/* 1. Hero Banner */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-slate-950 text-white overflow-hidden text-center">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-25 scale-105"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950" />
        
        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-blue-500/20 text-blue-400 border border-blue-500/30 mb-4">
            <Sparkles className="w-3 h-3 text-amber-400" /> Architectural Excellence
          </span>
          <h1 className="font-heading text-4xl sm:text-6xl font-extrabold tracking-tight">
            Redefining Luxury Living Across the Globe
          </h1>
          <p className="text-slate-300 text-sm sm:text-base mt-4 leading-relaxed font-light">
            HorizonHomes was founded with a singular purpose: to connect discerning homeowners, investors, and developers through a seamless, transparent, and discreet luxury real estate marketplace.
          </p>
        </div>
      </section>

      {/* 2. Story & Mission */}
      <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">Our Heritage</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-6">
              A Bespoke Approach to Extraordinary Residences
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base mb-4">
              At <strong className="text-slate-900">HorizonHomes</strong>, we believe acquiring a home is more than a commercial transaction—it is the creation of a sanctuary that reflects your lifestyle and accomplishments.
            </p>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base mb-6">
              Our curated portfolio spans architectural penthouses overlooking iconic skylines, private oceanfront compounds, and historic estates. Every listing is personally vetted and legally authenticated by our senior advisory partners.
            </p>
            <div className="flex items-center gap-6">
              <div>
                <p className="font-heading text-3xl font-extrabold text-blue-600">$4.8B+</p>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Settled Transactions</p>
              </div>
              <div className="w-px h-12 bg-slate-200" />
              <div>
                <p className="font-heading text-3xl font-extrabold text-slate-900">45+</p>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Global Markets</p>
              </div>
              <div className="w-px h-12 bg-slate-200" />
              <div>
                <p className="font-heading text-3xl font-extrabold text-amber-500">100%</p>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Verified Registry</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
              <img
                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=80"
                alt="HorizonHomes Interior"
                className="w-full h-[420px] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-xl hidden sm:block max-w-xs">
              <p className="font-heading font-bold text-base">Discreet White-Glove Service</p>
              <p className="text-xs text-slate-400 mt-1">Direct access to private off-market listings and institutional escrow.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Pillars */}
      <section className="py-16 bg-slate-100/70 border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">The Principles</span>
            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-1">Our Core Commitments</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: ShieldCheck,
                title: "Guaranteed Title Verification",
                desc: "Every residence listed undergoes comprehensive legal title searches and environmental audits.",
              },
              {
                icon: Globe,
                title: "Global Reach, Local Savvy",
                desc: "Presence in New York, London, Dubai, and Singapore offering hyper-local market intelligence.",
              },
              {
                icon: Award,
                title: "Architectural Curation",
                desc: "We exclusively represent residences with distinctive craftsmanship and design pedigree.",
              },
              {
                icon: Users,
                title: "Dedicated Advisory",
                desc: "Personalized concierge support from search through digital closing and private relocation.",
              },
            ].map((p, idx) => {
              const Icon = p.icon;
              return (
                <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading font-bold text-slate-900 text-base mb-1.5">{p.title}</h3>
                  <p className="text-slate-600 text-xs leading-relaxed">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Action Banner */}
      <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-slate-900 text-white rounded-3xl p-10 sm:p-14 border border-slate-800 shadow-xl">
          <h2 className="font-heading text-2xl sm:text-4xl font-bold mb-3">Begin Your Property Journey Today</h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto mb-8">
            Explore our curated digital portfolio or connect with our senior advisory desk for an off-market consultation.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/view"
              className="px-8 py-3.5 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-500 transition shadow-lg shadow-blue-600/30"
            >
              Explore Residences
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3.5 rounded-xl bg-slate-800 text-white font-semibold text-sm hover:bg-slate-700 transition border border-slate-700"
            >
              Contact Advisory Desk
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default About;
