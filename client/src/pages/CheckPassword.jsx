import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import useUserStore from '../zustand/useProvider';
import { FaRobot } from 'react-icons/fa';

function CheckPassword() {
    const [data, setData] = useState({
        password: "",
        userId: ""
    });
    const navigate = useNavigate();
    const location = useLocation();
    const { setUser } = useUserStore();
    
    useEffect(() => {
        if (!location?.state?.name) {
            navigate('/email');
        }
    }, [location, navigate]);
    
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();
    
        const URL = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/password`;
    
        try {
            const response = await axios({
                method: 'post',
                url: URL,
                data: {
                    userId: location?.state?._id,
                    password: data.password
                },
                withCredentials: true
            });
    
            toast.success(response.data.message);
    
            if (response.data.success) {
                setUser({
                    _id: location?.state?._id,
                    email: location?.state?.email,
                    name: location?.state?.name,
                    nationality: location?.state?.nationality,
                    sex: location?.state?.sex,
                    token: response?.data?.token
                });    
                localStorage.setItem('token', response?.data?.token);
                setData({ password: "" });
                navigate('/');
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    };
    
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
            <div className="bg-gray-800 p-12 rounded-lg shadow-lg w-full max-w-lg text-center">
                <div className="flex justify-center mb-4">
                    <FaRobot className="text-6xl text-blue-500" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Enter Your Password</h2>
                <p className="text-gray-400 mb-6">Please enter your password to continue.</p>
                <form className="grid gap-5" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-1 text-left">
                        <label htmlFor="password" className="text-gray-400 text-sm">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            className="bg-gray-700 text-white px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                            value={data.password}
                            onChange={handleOnChange}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-lg px-6 py-3 rounded font-bold text-white hover:bg-blue-600 transition-colors duration-300 mt-4 w-full"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CheckPassword;
