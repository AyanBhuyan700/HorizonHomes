import React from "react";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

function Footer() {
    return (
        <footer className="bg-zinc-800 text-gray-300 py-12">
            <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">

                {/* Logo & About */}
                <div>
                    <h2 className="text-xl font-extrabold text-white">HorizonHomes</h2>
                    <p className="mt-3 text-gray-400">
                        Your trusted real estate marketplace. Find the best properties and deals with ease.
                    </p>

                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
                    <ul className="space-y-2">
                        <li><Link to="/about" className="hover:text-cyan-400 transition">About Us</Link></li>
                        <li><Link to="/support" className="hover:text-cyan-400 transition">Support</Link></li>
                        <li><Link to="/contact" className="hover:text-cyan-400 transition">Contact</Link></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Contact Us</h3>
                    <p className="text-gray-400">📍 123 Main Street, City, Country</p>
                    <p className="text-gray-400">📧 support@HorizonHomes.com</p>
                    <p className="text-gray-400">📞 +123 456 7890</p>
                </div>

                {/* Social Media */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
                    <div className="flex space-x-4">
                        <Link to="https://x.com/AyanBhuyan3" target="_blank" className="text-gray-400 hover:text-blue-300 transition">
                            <i className="fab fa-twitter text-2xl"></i>
                        </Link>
                        <Link to="https://www.instagram.com/ayanbhuyan04/?hl=en" target="_blank" className="text-gray-400 hover:text-blue-500 transition">
                            <i className="fab fa-instagram text-2xl"></i>
                        </Link>
                        <Link to="https://www.linkedin.com/in/ayan-bhuyan-2a957a231/" target="_blank" className="text-gray-400 hover:text-indigo-400 transition">
                            <i className="fab fa-linkedin text-2xl"></i>
                        </Link>
                    </div>
                </div>

            </div>

            {/* Copyright */}
            <div className="mt-10 text-center text-gray-400 border-t border-gray-700 pt-4">
                &copy; {new Date().getFullYear()} HorizonHomes. All Rights Reserved.
            </div>
        </footer>

    )
}

export default Footer;
