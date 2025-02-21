import useUserStore from '../zustand/useProvider'; // Import Zustand store
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {FaSignOutAlt, FaBalanceScale } from 'react-icons/fa';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { RxAvatar } from "react-icons/rx";

const Home = () => {
  const { name, email, nationality, sex, setUser, logout } = useUserStore(); // Zustand state
  const [cases, setCases] = useState([]); // Store cases
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const URL = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/user-details`;
        const response = await axios.post(URL, {}, { withCredentials: true });

        if (response.data.data.logout) {
          logout(); // Clear Zustand state
          navigate("/intro");
        } else {
          setUser(response.data.data); // Store user details in Zustand
          setCases(response.data.data.cases || []); // Store cases
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchUserDetails();
  }, [setUser, logout, navigate]);

  // Pie chart data processing
  const caseStatusCount = cases.reduce((acc, curr) => {
    acc[curr.status] = (acc[curr.status] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.keys(caseStatusCount).map((key) => ({
    name: key,
    value: caseStatusCount[key],
  }));

  const COLORS = ['#FFD700', '#32CD32', '#FF6347'];

  return (
    <div className="flex min-h-screen bg-gray-900 text-white p-6 w-full">
      {/* Left: Personal Info */}
      <div className="w-1/4 bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col gap-2">
        <h2 className="text-3xl font-bold mb-3 text-center">Personal Information</h2>
        <p className="text-lg"><strong>Name:</strong> {name}</p>
        <p className="text-lg"><strong>Email:</strong> {email}</p>
        <p className="text-lg"><strong>Nationality:</strong> {nationality}</p>
        <p className="text-lg"><strong>Sex:</strong> {sex}</p>

        {/* Pie Chart for Case Status */}
        {cases.length > 0 && (
          <div className="mt-4 flex flex-col items-center">
            <h3 className="text-xl font-semibold mb-2">Case Status Overview</h3>
            <PieChart width={180} height={180}>
              <Pie data={chartData} cx="50%" cy="50%" outerRadius={60} fill="#8884d8" dataKey="value">
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        )}
      </div>

      {/* Right: Main Content */}
      <div className="flex flex-col w-3/4 pl-6">
        {/* Navbar */}
        <div className="w-full flex justify-between items-center p-4 bg-gray-800 shadow-lg rounded-lg">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <RxAvatar className="text-3xl text-gray-400" />
            <button onClick={() => { logout(); navigate("/intro"); }} className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-400 text-white font-semibold rounded-lg shadow-md transition-all">
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>

        {/* Main Sections */}
        <div className="flex flex-col lg:flex-row justify-between w-full max-w-5xl mt-10 gap-6">
          {/* Left: Description */}
          <div className="flex-1 bg-gray-800 p-6 rounded-lg shadow-lg h-56 flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-3">Welcome to LegalEase</h2>
            <p className="text-gray-300">
              Our platform simplifies legal case management, ensuring easy access to legal resources
              and expert guidance. Navigate legal challenges with ease through our judiciary bot,
              designed to provide quick, AI-driven advice tailored to your needs.
            </p>
          </div>

          {/* Right: Judiciary Bot */}
          <div className="flex-1 bg-gray-800 p-6 rounded-lg shadow-lg h-56 flex flex-col justify-center items-center text-center">
            <FaBalanceScale className="text-6xl text-yellow-500 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Facing a Legal Issue?</h2>
            <p className="text-gray-300 mb-4">
              Take advice from our <strong>Judiciary Bot</strong> for expert insights on your legal concerns.
            </p>
            <button onClick={() => navigate("/add-case")} className="px-6 py-2 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-lg shadow-md transition-all">
              Get Legal Advice
            </button>
          </div>
        </div>

        {/* Case List Section */}
        <div className="bg-gray-800 p-6 mt-6 rounded-lg shadow-lg w-full max-w-5xl h-full max-h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
          <h2 className="text-2xl font-bold mb-4">Your Cases</h2>
          <div>
            {cases.length > 0 ? (
              cases.map((caseItem, index) => (
                <div onClick={() => navigate(`/case/${caseItem._id}`)} key={index} className="flex justify-between items-center p-4 bg-gray-700 rounded-lg shadow-md mb-3 transition-all hover:bg-gray-600">
                  <div>
                    <h3 className="text-lg font-semibold">{caseItem.name}</h3>
                    <p className="text-gray-300">Status: {caseItem.status}</p>
                  </div>
                  <span
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                      caseItem.status === "Pending"
                        ? "bg-yellow-500 hover:bg-yellow-400"
                        : caseItem.status === "Approved"
                        ? "bg-green-500 hover:bg-green-400"
                        : "bg-red-500 hover:bg-red-400"
                    }`}
                  >
                    {caseItem.status}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-center">No cases found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
