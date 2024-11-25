import React from 'react'
import { useState } from 'react'
import axios from "axios"
import { BACKENDURL } from '../App';
import { toast } from 'react-toastify';

const Login = ({ setToken }) => {

    const [email, setemail] = useState(' ');
    const [password, setpassword] = useState(' ');

    const handlelogin = async (e) => {
        e.preventDefault();
        const response = await axios.post(BACKENDURL + '/api/user/admin', { email, password });
        console.log(response);
        if (response.data.success) {
            setToken(response.data.token);
        } else {
            toast.error(response.data.message);
        }
    }

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="w-full max-w-sm p-8 space-y-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
                <form onSubmit={handlelogin} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            autoComplete="email"
                            required
                            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email" onChange={(e) => setemail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            autoComplete="passeord"
                            required
                            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                            onChange={(e) => setpassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                    >
                        Login
                    </button>
                </form>

            </div>
        </div>
    );
}

export default Login;