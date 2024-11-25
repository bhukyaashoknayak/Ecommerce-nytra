import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Routes, Route } from 'react-router-dom';
import Add from './pages/Add';
import Lists from './pages/Lists';
import Orders from './pages/Orders';
import Login from './components/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './components/Home';

export const BACKENDURL = "http://localhost:8080";


const App = () => {
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : ' ');

    useEffect(() => {
        localStorage.setItem('token', token)
    }, [token])

    return (
        <div>
            <ToastContainer />
            {token === " " ?
                <Login setToken={setToken} />

                :
                <>
                    <Navbar setToken={setToken} />
                    <Sidebar />
                    <div className="content ml-1/5">
                        <Routes>
                            <Route path="/" element={< Home />} />
                            <Route path="/add" element={<Add token={token} />} />
                            <Route path="/lists" element={<Lists token={token} />} />
                            <Route path="/orders" element={<Orders token={token} />} />
                        </Routes>
                    </div>
                </>
            }
        </div>
    );
};

export default App;
