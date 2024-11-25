import React from 'react';

const Navbar = ({ setToken }) => {
    return (
        <div className="bg-gray-100 shadow-md w-full fixed top-0 left-0 z-10">
            <div className="flex justify-between items-center px-6 py-5">
                <div className="flex items-center space-x-4">
                    <img
                        src="https://images.pexels.com/photos/1209843/pexels-photo-1209843.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        alt="adminLogo"
                        className="w-16 h-10 rounded-md"
                    />
                </div>
                <div className="text-center w-full">
                    <span className="text-lg font-bold text-black sm:block">
                        NYTRA – Your Gateway to Smarter Shopping
                    </span>
                </div>
                <button onClick={() => setToken(' ')} className="bg-red-500 hover:bg-red-700 text-white  font-semibold py-2 px-4 rounded-md">
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Navbar;
