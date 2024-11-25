import React from 'react';
import { NavLink } from 'react-router-dom';

const ReturnPolicy = () => {
    return (
        <div className="relative w-full rounded-md h-auto overflow-hidden p-8">
            <video
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                loop
                muted
                src="src/assets/returnvedio.mp4"
                type="video/mp4"
            />
            <div className="absolute inset-0 bg-black backdrop-blur opacity-50"></div>
            <div className="relative max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 flex flex-col items-center justify-center h-full text-center">
                <h2 className="text-5xl font-bold text-white mb-4">Return Policy</h2>
                <p className="mt-4 text-lg text-white">
                    At Nytra, If you are not satisfied, you can return your item within <span className="font-bold">7 days</span> of receiving it for a full refund.
                </p>
                <ul className="mt-4 text-left text-lg text-white list-disc list-inside max-w-lg  mx-auto">
                    <li className="mb-2 list-none"><span className="font-bold bg-f6efbd text-red-400">Condition:</span> The item must be unused and in its original packaging.</li>
                    <li className="mb-2 list-none"><span className="font-bold bg-f6efbd text-red-400">Return Process:</span> Contact us to initiate a return and receive a return label.</li>
                    <li className="list-none"><span className="font-bold bg-f6efbd text-red-400">Refund:</span> Refunds will be processed within <span className="font-bold">3-5 business days</span> after we receive the returned item.</li>
                </ul>
                <div className="flex justify-end mt-6">
                    <NavLink
                        to="/support"
                        className="inline-block bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
                    >
                        Contact Support
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default ReturnPolicy;