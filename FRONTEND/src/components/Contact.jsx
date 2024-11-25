import React from 'react';
import { useEffect } from 'react';

const ContactPage = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);



    return (
        <section className="py-16 bg-gray-100 mt-20 mb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Contact Us</h2>
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <div className="space-y-6">
                        <div className="flex items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6 text-blue-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M3 6a9 9 0 0118 0v12a9 9 0 01-18 0V6z"
                                />
                            </svg>
                            <p className="ml-4 text-lg text-gray-700">
                                Phone: <span className="font-semibold text-blue-600">(91+) 918XXXXXXX</span>
                            </p>
                        </div>
                        <div className="flex items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6 text-blue-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M16 12h6m-3-3v6m-7 0h6m-3 3v6m-4 0h-6m3-3v-6m0 0h-6m3-3H4"
                                />
                            </svg>
                            <p className="ml-4 text-lg text-gray-700">
                                Email: <span className="font-semibold text-blue-600">Nytra@gmail.com</span>
                            </p>
                        </div>
                        <div className="flex items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6 text-blue-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 3H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.89 1.99 1.99 1.99h14.02c1.1 0 1.99-.89 1.99-1.99L21 5c0-1.1-.89-2-1.99-2z"
                                />
                            </svg>
                            <p className="ml-4 text-lg text-gray-700">
                                Address: <span className="font-semibold text-blue-600">XXXX, Telangana, Idia</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactPage;
