import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Compass, PlusCircle, LayoutDashboard, LogOut, User, Sparkles } from "lucide-react";
import { LogoMark } from "./Logo";

function Navbar() {
    const [user, setUser] = useState({ id: null, role: null });
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const id = localStorage.getItem("id");
        const role = localStorage.getItem("role");
        if (id) {
            setUser({ id, role });
        }

        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        const handleResize = () => {
            if (window.innerWidth >= 768) setMenuOpen(false);
        };

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleResize);
        };
    }, [location.pathname]);

    function handleLogout() {
        localStorage.clear();
        setUser({ id: null, role: null });
        setMenuOpen(false);
        navigate("/");
    }

    const isActive = (path) => location.pathname === path;

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled
                    ? "bg-slate-950/95 backdrop-blur-xl shadow-xl shadow-black/30 border-b border-slate-800/80 py-3.5"
                    : "bg-slate-950/80 backdrop-blur-md border-b border-white/5 py-4"
            }`}
        >
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 flex justify-between items-center">
                {/* Brand Logo with New Architectural Mark */}
                <Link to="/" className="flex items-center gap-3 group">
                    <LogoMark className="w-10 h-10 group-hover:scale-105 transition-transform duration-300" />
                    <div>
                        <span className="font-heading text-xl font-bold tracking-tight text-white flex items-center">
                            Horizon<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">Homes</span>
                        </span>
                        <span className="block text-[9px] tracking-[0.25em] uppercase text-slate-400 font-semibold">Premier Living</span>
                    </div>
                </Link>

                {/* Desktop Menu - Generous Spacing & Breathing Room */}
                <nav className="hidden md:flex items-center gap-7 lg:gap-9">
                    {[
                        { to: "/", label: "Home" },
                        { to: "/view", label: "Properties" },
                        { to: "/about", label: "About" },
                        { to: "/support", label: "Support" },
                        { to: "/faq", label: "FAQ" },
                        { to: "/contact", label: "Contact" },
                    ].map((item) => (
                        <Link
                            key={item.to}
                            to={item.to}
                            className={`text-xs uppercase tracking-widest font-medium transition-colors duration-200 py-1 relative ${
                                isActive(item.to)
                                    ? "text-blue-400 font-semibold after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-blue-400"
                                    : "text-slate-300 hover:text-white"
                            }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>


                {/* Desktop Actions */}
                <div className="hidden md:flex items-center gap-4">
                    {user?.role === "admin" ? (
                        <div className="flex items-center gap-3">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                                <Sparkles className="w-3 h-3" /> Admin
                            </span>
                            <Link
                                to="/dashboard"
                                className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-lg text-slate-200 bg-slate-800/80 hover:bg-slate-700 hover:text-white transition border border-slate-700"
                            >
                                <LayoutDashboard className="w-3.5 h-3.5" /> Dashboard
                            </Link>
                            <Link
                                to="/addProperty"
                                className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-500 transition shadow-sm"
                            >
                                <PlusCircle className="w-3.5 h-3.5" /> Add Property
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-red-400 transition"
                                title="Sign out"
                            >
                                <LogOut className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    ) : user?.id ? (
                        <div className="flex items-center gap-4">
                            <Link
                                to="/view"
                                className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-500 transition shadow-md shadow-blue-600/20"
                            >
                                <Compass className="w-3.5 h-3.5" /> Browse Residences
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-xl text-slate-300 hover:text-red-400 hover:bg-slate-800/60 transition border border-slate-800"
                            >
                                <LogOut className="w-3.5 h-3.5" /> Sign Out
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link
                                to="/login"
                                className="px-4 py-2 text-xs uppercase tracking-wider font-semibold text-slate-300 hover:text-white transition-colors"
                            >
                                Sign In
                            </Link>
                            <div className="w-px h-4 bg-slate-800" />
                            <Link
                                to="/register"
                                className="flex items-center gap-2 px-5 py-2.5 text-xs uppercase tracking-wider font-semibold rounded-full bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-md shadow-blue-600/25 hover:shadow-lg"
                            >
                                <User className="w-3.5 h-3.5" /> Get Started
                            </Link>
                        </div>
                    )}
                </div>


                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Drawer Overlay */}
            {menuOpen && (
                <div
                    className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 md:hidden animate-fade-in"
                    onClick={() => setMenuOpen(false)}
                />
            )}

            {/* Mobile Drawer Panel */}
            <div
                className={`fixed top-0 right-0 w-80 max-w-[85vw] h-full bg-slate-950 border-l border-slate-800 p-6 transition-transform duration-300 ease-out z-50 md:hidden flex flex-col justify-between ${
                    menuOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <div>
                    <div className="flex items-center justify-between pb-6 border-b border-slate-800">
                        <div className="flex items-center gap-2">
                            <LogoMark className="w-7 h-7" />
                            <span className="font-heading font-bold text-white">HorizonHomes</span>
                        </div>
                        <button
                            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                            onClick={() => setMenuOpen(false)}
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {user?.role && (
                        <div className="mt-4 p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold">
                                    {user.role === "admin" ? "A" : "U"}
                                </div>
                                <span className="text-xs text-slate-300">Signed in as</span>
                            </div>
                            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-600/20 text-blue-400 capitalize">
                                {user.role}
                            </span>
                        </div>
                    )}

                    <div className="flex flex-col space-y-2 mt-6">
                        <Link
                            to="/"
                            className={`px-3 py-2.5 rounded-lg text-sm font-medium ${isActive("/") ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-800"}`}
                            onClick={() => setMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            to="/view"
                            className={`px-3 py-2.5 rounded-lg text-sm font-medium ${isActive("/view") ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-800"}`}
                            onClick={() => setMenuOpen(false)}
                        >
                            Properties
                        </Link>
                        <Link
                            to="/about"
                            className={`px-3 py-2.5 rounded-lg text-sm font-medium ${isActive("/about") ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-800"}`}
                            onClick={() => setMenuOpen(false)}
                        >
                            About Us
                        </Link>
                        <Link
                            to="/support"
                            className={`px-3 py-2.5 rounded-lg text-sm font-medium ${isActive("/support") ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-800"}`}
                            onClick={() => setMenuOpen(false)}
                        >
                            Support
                        </Link>
                        <Link
                            to="/faq"
                            className={`px-3 py-2.5 rounded-lg text-sm font-medium ${isActive("/faq") ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-800"}`}
                            onClick={() => setMenuOpen(false)}
                        >
                            FAQ
                        </Link>
                        <Link
                            to="/contact"
                            className={`px-3 py-2.5 rounded-lg text-sm font-medium ${isActive("/contact") ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-800"}`}
                            onClick={() => setMenuOpen(false)}
                        >
                            Contact
                        </Link>

                        {user?.role === "admin" && (
                            <div className="pt-4 mt-2 border-t border-slate-800 flex flex-col space-y-2">
                                <Link
                                    to="/dashboard"
                                    className="px-3 py-2 rounded-lg text-sm font-medium text-amber-300 hover:bg-slate-800 flex items-center gap-2"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    <LayoutDashboard className="w-4 h-4" /> Admin Dashboard
                                </Link>
                                <Link
                                    to="/addProperty"
                                    className="px-3 py-2 rounded-lg text-sm font-medium text-blue-300 hover:bg-slate-800 flex items-center gap-2"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    <PlusCircle className="w-4 h-4" /> Add Property
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                <div className="pt-6 border-t border-slate-800">
                    {user?.id ? (
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-red-500/10 text-red-400 font-medium text-sm hover:bg-red-500/20 transition"
                        >
                            <LogOut size={16} /> Sign Out
                        </button>
                    ) : (
                        <div className="flex flex-col gap-2">
                            <Link
                                to="/login"
                                className="w-full text-center py-2.5 rounded-lg bg-slate-900 text-slate-200 font-medium text-sm hover:bg-slate-800 transition"
                                onClick={() => setMenuOpen(false)}
                            >
                                Sign In
                            </Link>
                            <Link
                                to="/register"
                                className="w-full text-center py-2.5 rounded-lg bg-blue-600 text-white font-medium text-sm hover:bg-blue-500 transition shadow-md"
                                onClick={() => setMenuOpen(false)}
                            >
                                Create Account
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Navbar;
