import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigation = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, settoken] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();

        const data = { username, email, password };
        if (!username || !email || !password) {
            toast.error('All fields are required');
            return;
        }

        if (password.length < 8) {
            toast.error('Password must be at least 8 characters long');
            return;
        }

        try {

            const response = await axios.post("https://ecommerce-nytra-backend2.onrender.com"+ '/api/user/register', data);
            if (response.data.success) {
                settoken(response.data.token);
                localStorage.setItem('token', response.data.token);
                toast.success('Registration successful!');
                navigation('/');
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error('Error registering:', error);
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Error registering. Please try again.');
            }
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="w-full max-w-sm p-8 space-y-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800">Register</h2>
                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-semibold text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            id="username"
                            required
                            autoComplete="username"
                            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your name"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            required
                            autoComplete="email"
                            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            required
                            autoComplete="current-password"
                            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                    >
                        Register
                    </button>
                </form>
                <p className="text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <a href="/login" className="text-blue-500 hover:underline">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Register;
