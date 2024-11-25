import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-black rounded-md text-white py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-4">About Us</h3>
                        <p className="text-gray-400">
                            We are committed to providing the best shopping experience for our customers. Our mission is to offer high-quality products at affordable prices.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
                        <ul className="space-y-1">
                            <li>
                                <NavLink to="/support" className={({ isActive }) => (isActive ? 'text-white font-semibold' : 'text-gray-400 hover:text-white')}>
                                    Support
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/privacy" className={({ isActive }) => (isActive ? 'text-white font-semibold' : 'text-gray-400 hover:text-white')}>
                                    Privacy Policy
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                        <p className="text-gray-400">Email: Nytra@gmail.com</p>
                        <p className="text-gray-400">Phone: 91+ 91XXXXXXXX</p>
                    </div>
                </div>
                <div className=" text-white py-8">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className=" flex justify-center space-x-4">
                            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-400 hover:text-blue-600 transition-colors duration-300">
                                <i className="fa-brands fa-facebook fa-2x"></i>
                            </a>
                            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                                <i className="fa-brands fa-twitter fa-2x"></i>
                            </a>
                            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-400 hover:text-pink-500 transition-colors duration-300">
                                <i className="fa-brands fa-square-instagram fa-2x"></i>
                            </a>
                            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-400 hover:text-blue-700 transition-colors duration-300">
                                <i className="fa-brands fa-linkedin fa-2x"></i>
                            </a>
                        </div>
                    </div>

                </div>
                <div className="text-center text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Nytra. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
