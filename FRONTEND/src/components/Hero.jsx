import React from 'react';
import { NavLink } from 'react-router-dom';

const Hero = () => {
    return (
        <div className="relative w-full h-screen overflow-hidden rounded-sm">
            <video
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                loop
                muted
                src="src/assets/herovedio.mp4"
                type="video/mp4"
            />
            <div className="absolute inset-0 bg-black backdrop-blur opacity-50"></div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center h-full text-center">
                <h1 className="text-5xl font-bold text-white mb-4">
                    welcome to NYTRA
                </h1>
                <p className="mt-4 text-lg text-white">
                    Discover amazing products and shop your heart out!
                </p>
                <div className="mt-6 space-x-4">
                    <NavLink
                        to="/collection"
                        className="inline-block bg-indigo-600 text-white font-semibold py-2 px-4 rounded hover:bg-indigo-700 transition duration-200"
                    >
                        Shop Now
                    </NavLink>
                    <NavLink
                        to="/collection"
                        className="inline-block bg-gray-700 text-white font-semibold py-2 px-4 rounded hover:bg-gray-600 transition duration-200"
                    >
                        View Deals
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default Hero;
