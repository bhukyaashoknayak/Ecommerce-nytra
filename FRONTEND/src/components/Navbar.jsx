import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [isopen, setisopen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setisopen(!isopen);
    };

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('token');
        navigate('/login');
    };


    return (
        <nav className="bg-white border-gray-200 shadow-md fixed top-0 left-0 w-full z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <NavLink to="/" className="text-xl font-bold text-gray-800">
                            NYTRA
                        </NavLink>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8 items-center">
                        <NavLink
                            to="/"
                            className="text-gray-900 hover:text-gray-900"
                        >
                            HOME
                        </NavLink>
                        <NavLink
                            to="/collection"
                            className="text-gray-700 hover:text-gray-900"
                        >
                            COLLECTION
                        </NavLink>
                        <NavLink to="/search" className="text-gray-700 hover:text-gray-900">
                            SEARCH
                        </NavLink>
                        <NavLink to="/cart" className="text-gray-700 hover:text-gray-900">
                            CARTS
                        </NavLink>
                        <NavLink to="/orders" className="text-gray-700 hover:text-gray-900">
                            ORDERS
                        </NavLink>
                        {!isLoggedIn && localStorage.getItem('token') ? (

                            <button
                                onClick={handleLogout}
                                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md"
                            >
                                LOGOUT
                            </button>

                        ) : (
                            <NavLink
                                to="/login"
                                onClick={handleLogin}
                                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md"
                            >
                                LOGIN
                            </NavLink>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={toggleMenu} className="text-gray-700 hover:text-gray-900 focus:outline-none">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="h-6 w-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16m-7 6h7"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* mobile-view */}
            <div className={`${isopen ? '' : 'hidden'} md:hidden`}>
                <div className="px-2 pt-2 pb-3 space-y-1">
                    <NavLink
                        to="/"
                        onClick={toggleMenu}
                        className="block text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md"
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/collection"
                        onClick={toggleMenu}
                        className="block text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md"
                    >
                        Collection
                    </NavLink>
                    <NavLink
                        to="/search"
                        onClick={toggleMenu}
                        className="block text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md"
                    >
                        Search
                    </NavLink>
                    <NavLink
                        to="/cart"
                        onClick={toggleMenu}
                        className="block text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md"
                    >
                        Cart
                    </NavLink>
                    <NavLink to="/orders" className="block text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md">
                        orders
                    </NavLink>
                    {!isLoggedIn ? (
                        <NavLink
                            to="/login"
                            onClick={toggleMenu}
                            className="block text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md"
                        >
                            Login
                        </NavLink>
                    ) : (
                        <NavLink
                            to="/register"
                            onClick={toggleMenu}
                            className="block text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md"
                        >
                            Logout
                        </NavLink>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
