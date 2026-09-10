import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ArrowUp, ShieldCheck, Award, Heart } from "lucide-react";
import { LogoMark } from "./Logo";

function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="bg-slate-950 text-slate-400 border-t border-slate-800/80 pt-16 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Top VIP Newsletter Section */}
                <div className="bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-slate-900 p-8 rounded-3xl border border-blue-500/20 mb-16 relative overflow-hidden">
                    <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
                        <div className="max-w-xl text-center lg:text-left">
                            <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">Exclusive Access</span>
                            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mt-1">
                                Get Premier Off-Market Property Alerts
                            </h3>
                            <p className="text-slate-300 text-sm mt-2">
                                Subscribe to receive curated listings, private price cuts, and architectural market insights directly to your inbox.
                            </p>
                        </div>
                        <form onSubmit={(e) => { e.preventDefault(); alert("Thank you for subscribing to HorizonHomes VIP alerts!"); }} className="w-full lg:w-auto flex flex-col sm:flex-row gap-2 max-w-md">
                            <input
                                type="email"
                                required
                                placeholder="Enter your email address"
                                className="px-4 py-3 bg-slate-900/90 text-white rounded-xl border border-slate-700 focus:outline-none focus:border-blue-500 text-sm flex-1 placeholder:text-slate-500"
                            />
                            <button
                                type="submit"
                                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold hover:from-blue-500 hover:to-indigo-500 transition shadow-lg shadow-blue-600/30 whitespace-nowrap"
                            >
                                Join VIP Club
                            </button>
                        </form>
                    </div>
                </div>

                {/* Main Links Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
                    {/* Brand Col */}
                    <div className="lg:col-span-2 space-y-4">
                        <Link to="/" className="flex items-center gap-3">
                            <LogoMark className="w-10 h-10" />
                            <span className="font-heading text-2xl font-bold text-white tracking-tight">
                                Horizon<span className="text-blue-400">Homes</span>
                            </span>
                        </Link>

                        <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                            Curating extraordinary architectural residences, penthouses, and waterfront villas worldwide. Built with trust, transparency, and discreet elegance.
                        </p>
                        <div className="flex items-center gap-4 text-xs text-slate-300 pt-2">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800">
                                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" /> Verified Listings
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800">
                                <Award className="w-3.5 h-3.5 text-amber-400" /> Premier Partner
                            </span>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">Properties</h4>
                        <ul className="space-y-2.5 text-sm">
                            <li><Link to="/view" className="hover:text-blue-400 transition">Luxury Villas</Link></li>
                            <li><Link to="/view" className="hover:text-blue-400 transition">Sky Penthouses</Link></li>
                            <li><Link to="/view" className="hover:text-blue-400 transition">Modern Townhomes</Link></li>
                            <li><Link to="/view" className="hover:text-blue-400 transition">Commercial Spaces</Link></li>
                            <li><Link to="/view" className="hover:text-blue-400 transition">Off-Market Exclusives</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">Company</h4>
                        <ul className="space-y-2.5 text-sm">
                            <li><Link to="/about" className="hover:text-blue-400 transition">About Us</Link></li>
                            <li><Link to="/support" className="hover:text-blue-400 transition">Client Support</Link></li>
                            <li><Link to="/faq" className="hover:text-blue-400 transition">Frequently Asked</Link></li>
                            <li><Link to="/contact" className="hover:text-blue-400 transition">Schedule a Private Tour</Link></li>
                            <li><Link to="/register" className="hover:text-blue-400 transition">Partner With Us</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">Concierge Desk</h4>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-2.5">
                                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                                <span>740 Park Avenue, Manhattan, NY 10021</span>
                            </li>
                            <li className="flex items-center gap-2.5">
                                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                                <a href="mailto:concierge@horizonhomes.com" className="hover:text-blue-400 transition">concierge@horizonhomes.com</a>
                            </li>
                            <li className="flex items-center gap-2.5">
                                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                                <a href="tel:+18005559090" className="hover:text-blue-400 transition">+1 (800) 555-9090</a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
                    <p className="flex items-center gap-1 text-center sm:text-left">
                        &copy; {new Date().getFullYear()} HorizonHomes International Realty. Handcrafted with <Heart className="w-3 h-3 text-rose-500 inline fill-rose-500" /> for premier living.
                    </p>
                    <div className="flex items-center gap-6">
                        <Link to="/about" className="hover:text-slate-400 transition">Privacy Policy</Link>
                        <Link to="/about" className="hover:text-slate-400 transition">Terms of Service</Link>
                        <button
                            onClick={scrollToTop}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition"
                        >
                            <ArrowUp className="w-3 h-3" /> Back to Top
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
