import React, { useState } from 'react'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FaUser, FaEnvelope, FaLock, FaGlobe, FaVenusMars } from 'react-icons/fa';
import { FaRobot } from 'react-icons/fa';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        nationality: '',
        sex: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const URL = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/register`;
            await axios.post(URL, formData, { withCredentials: true });
            toast.success('Registration successful!');
            navigate('/login');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
            <div className="bg-gray-800 p-12 rounded-lg shadow-lg w-full max-w-lg text-center">
                <div className="flex justify-center mb-4">
                    <FaRobot className="text-5xl text-blue-500" />
                </div>
                <h2 className="text-3xl font-bold mb-4 text-white">Sign Up</h2>
                <p className="text-gray-400 mb-6">Create an account to get started.</p>
                <form className="grid gap-5" onSubmit={handleSubmit}>
                    <div className="relative">
                        <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                        <input type="text" name="name" placeholder="Full Name" className="pl-12 bg-gray-700 text-white px-4 py-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" onChange={handleChange} required />
                    </div>
                    <div className="relative">
                        <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                        <input type="email" name="email" placeholder="Email" className="pl-12 bg-gray-700 text-white px-4 py-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" onChange={handleChange} required />
                    </div>
                    <div className="relative">
                        <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                        <input type="password" name="password" placeholder="Password" className="pl-12 bg-gray-700 text-white px-4 py-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" onChange={handleChange} required />
                    </div>
                    <div className="relative">
                        <FaGlobe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                        <input type="text" name="nationality" placeholder="Nationality" className="pl-12 bg-gray-700 text-white px-4 py-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" onChange={handleChange} required />
                    </div>
                    <div className="relative">
                        <FaVenusMars className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                        <select name="sex" className="pl-12 bg-gray-700 text-white px-4 py-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" onChange={handleChange} required>
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <button type="submit" className="bg-blue-500 text-lg px-6 py-3 rounded font-bold text-white hover:bg-blue-600 transition-colors duration-300 mt-4 w-full">
                        Register
                    </button>
                </form>
                <p className="text-gray-400 mt-4">
                    Already have an account? <span className="text-blue-400 cursor-pointer hover:underline" onClick={() => navigate('/login')}>Login</span>
                </p>
            </div>
        </div>
    );
};

export default Signup;
