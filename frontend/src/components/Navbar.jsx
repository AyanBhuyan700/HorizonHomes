import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Import icons

function Navbar() {
    const [user, setUser] = useState({ id: null, role: null });
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const id = localStorage.getItem("id");
        const role = localStorage.getItem("role");
        if (id) {
            setUser({ id, role });
        }

        // Close menu if window is resized to desktop size
        const handleResize = () => {
            if (window.innerWidth >= 768) setMenuOpen(false);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    function handleLogout() {
        localStorage.clear();
        setUser({ id: null, role: null });
        setMenuOpen(false);
        navigate("/");
    }

    return (
        <nav className="bg-gradient-to-r from-cyan-500 via-blue-400 to-indigo-500 text-white p-4 fixed w-full z-50">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-xl font-bold">HorizonHomes</Link>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden focus:outline-none"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-6">
                    {user?.role === "admin" ? (
                        <>
                            <Link to="/dashboard" className="hover:text-blue-200">Dashboard</Link>
                            <Link to="/addProperty" className="hover:text-blue-200">Add Property</Link>
                            <button onClick={handleLogout} className="hover:text-blue-200">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/" className="hover:text-blue-200">Home</Link>
                            <Link to="/about" className="hover:text-blue-200">About</Link>
                            <Link to="/support" className="hover:text-blue-200">Support</Link>
                            <Link to="/contact" className="hover:text-blue-200">Contact</Link>
                            {user?.id ? (
                                <button onClick={handleLogout} className="hover:text-blue-200">Logout</button>
                            ) : (
                                <>
                                    <Link to="/register" className="hover:text-blue-200">Register</Link>
                                    <Link to="/login" className="hover:text-blue-200">Login</Link>
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={() => setMenuOpen(false)}
                ></div>
            )}

            <div
                className={`fixed top-0 left-0 w-3/4 h-full bg-gradient-to-r from-cyan-500 via-blue-400 to-indigo-500 p-5 transition-all z-50 md:hidden ${
                    menuOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <button className="absolute top-5 right-5" onClick={() => setMenuOpen(false)}>
                    <X size={28} />
                </button>

                <div className="flex flex-col space-y-6 mt-10">
                    {user?.role === "admin" ? (
                        <>
                            <Link to="/dashboard" className="hover:text-blue-200" onClick={() => setMenuOpen(false)}>Dashboard</Link>
                            <Link to="/addProperty" className="hover:text-blue-200" onClick={() => setMenuOpen(false)}>Add Property</Link>
                            <button onClick={handleLogout} className="hover:text-blue-200">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/" className="hover:text-blue-200" onClick={() => setMenuOpen(false)}>Home</Link>
                            <Link to="/about" className="hover:text-blue-200" onClick={() => setMenuOpen(false)}>About</Link>
                            <Link to="/support" className="hover:text-blue-200" onClick={() => setMenuOpen(false)}>Support</Link>
                            <Link to="/contact" className="hover:text-blue-200" onClick={() => setMenuOpen(false)}>Contact</Link>
                            {user?.id ? (
                                <button onClick={handleLogout} className="hover:text-blue-200">Logout</button>
                            ) : (
                                <>
                                    <Link to="/register" className="hover:text-blue-200" onClick={() => setMenuOpen(false)}>Register</Link>
                                    <Link to="/login" className="hover:text-blue-200" onClick={() => setMenuOpen(false)}>Login</Link>
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
