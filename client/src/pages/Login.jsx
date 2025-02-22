import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import useUserStore from '../zustand/useProvider';
import { FaRobot } from 'react-icons/fa';

function Login() {
    const navigate = useNavigate();
    const { setUser } = useUserStore();
    const [data, setData] = useState({ email: "" });

    const handleOnChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();
    
        const URL = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/email`;
    
        try {
            const response = await axios.post(URL, data);
            toast.success(response.data.message);
    
            if (response.data.success) {
                setUser({
                    _id: response.data.data._id,
                    email: data.email,
                    name: response.data.data.name,
                    nationality: response.data.data.nationality,
                    sex: response.data.data.sex
                });
                setData({ email: "" });
                navigate('/password', { state: response?.data?.data });
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
                <h2 className="text-3xl font-bold mb-4">Log in to your account!</h2>
                <p className="text-gray-400 mb-6">Please enter your email to continue.</p>
                <form className="grid gap-5" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-1 text-left">
                        <label htmlFor="email" className="text-gray-400 text-sm">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            className="bg-gray-700 text-white px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                            value={data.email}
                            onChange={handleOnChange}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-lg px-6 py-3 rounded font-bold text-white hover:bg-blue-600 transition-colors duration-300 mt-4 w-full"
                    >
                        Let's Go
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;