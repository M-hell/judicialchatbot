import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {
  FaSignOutAlt,
  FaBalanceScale,
  FaRobot,
  FaExternalLinkAlt,
  FaUser,
  FaEnvelope,
  FaGlobeAmericas,
  FaVenusMars, // Generic icon for sex/gender
  FaListAlt,
  FaInfoCircle,
  FaExclamationCircle // For empty state
} from 'react-icons/fa';
import { RxAvatar } from "react-icons/rx"; // Kept RxAvatar as it was used before
import useUserStore from '../zustand/useProvider'; // Import Zustand store

// --- Configuration & Helpers ---

// Define colors for the pie chart consistently
// Using Tailwind color names for reference, but hex codes are needed for recharts
const PIE_CHART_COLORS = {
  'Closed': '#4ade80', // tailwind green-400
  'Pending': '#facc15', // tailwind yellow-400
  'Requires Action': '#f87171', // tailwind red-400 - Example status
  // Add more specific statuses as needed
  'Default': '#60a5fa' // tailwind blue-400 - Fallback color
};

// Helper function to get Tailwind classes based on case status
const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'closed':
      return 'bg-green-500/20 text-green-300 border border-green-500/50';
    case 'pending':
      return 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/50';
    case 'requires action': // Example
      return 'bg-red-500/20 text-red-300 border border-red-500/50';
    default:
      return 'bg-blue-500/20 text-blue-300 border border-blue-500/50'; // Fallback
  }
};

// Custom animation definition (add this to your tailwind.config.js or global CSS)
/*
In tailwind.config.js:
theme: {
  extend: {
    keyframes: {
      fadeIn: {
        '0%': { opacity: '0' },
        '100%': { opacity: '1' },
      },
      pulseSlow: {
         '0%, 100%': { transform: 'scale(1)', opacity: '1' },
         '50%': { transform: 'scale(1.05)', opacity: '0.8' },
      }
    },
    animation: {
      'fade-in': 'fadeIn 0.5s ease-in-out',
      'pulse-slow': 'pulseSlow 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    }
  }
}

Or in your index.css / global stylesheet:
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
.animate-fade-in {
  animation: fadeIn 0.5s ease-in-out;
}
@keyframes pulseSlow {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.8; }
}
.animate-pulse-slow {
  animation: pulseSlow 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
*/

// --- Component ---

const Home = () => {
  const { name, email, nationality, sex, setUser, logout } = useUserStore();
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true; // Prevent state update on unmounted component
    const fetchUserDetails = async () => {
      setLoading(true);
      try {
        const URL = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/user-details`;
        const response = await axios.post(URL, {}, { withCredentials: true });

        console.log("User details response:", response.data); // Original logging

        if (!isMounted) return; // Exit if component unmounted

        if (!response.data?.data || response.data.data.logout) {
           if (!response.data?.data) console.error("Invalid response structure from server", response.data);
          logout();
          navigate("/intro");
          return;
        }

        setUser({
          name: response.data.data.name || 'N/A', // Add fallbacks
          email: response.data.data.email || 'N/A',
          nationality: response.data.data.nationality || 'N/A',
          sex: response.data.data.sex || 'N/A',
        });

        setCases(Array.isArray(response.data.data.cases) ? response.data.data.cases : []);

      } catch (error) {
        console.error("Error fetching user details:", error);
        if (isMounted) {
            // Optionally show an error message to the user here
             logout(); // Logout on error as a safety measure
             navigate("/intro"); // Navigate away if fetch fails critically
        }
      } finally {
        if (isMounted) {
          setLoading(false); // Stop loading
        }
      }
    };

    fetchUserDetails();

    return () => {
      isMounted = false; // Cleanup function to set isMounted to false
    };
  }, [setUser, logout, navigate]); // Dependencies kept as original

  // Memoize chart data calculation for performance
  const chartData = useMemo(() => {
    if (!cases || cases.length === 0) return [];

    const caseStatusCount = cases.reduce((acc, curr) => {
      const status = curr.status || 'Unknown'; // Handle potential missing status
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(caseStatusCount).map(([name, value]) => ({
      name,
      value,
    }));
  }, [cases]); // Recalculate only when cases change

  // --- Render Logic ---

  // Loading State UI
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-slate-800 text-white">
        {/* Simple Spinner */}
        <svg className="animate-spin h-10 w-10 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="ml-3 text-xl font-semibold">Loading Dashboard...</p>
      </div>
    );
  }

  // Main Component UI
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 to-slate-800 text-gray-100 font-sans w-full animate-fade-in"> {/* Added animation */}

      {/* Left Sidebar: Personal Info & Quick Tools */}
      <aside className="w-72 flex-shrink-0 bg-slate-900/70 backdrop-blur-sm p-6 shadow-xl flex flex-col space-y-6 border-r border-slate-700/50">
        {/* User Avatar and Name */}
        <div className="flex flex-col items-center text-center border-b border-slate-700/50 pb-5">
           <RxAvatar className="text-6xl text-blue-400 mb-3 transition-transform duration-300 hover:scale-110" />
           <h2 className="text-2xl font-bold text-white truncate w-full" title={name}>{name}</h2>
           <p className="text-sm text-gray-400 truncate w-full" title={email}>{email}</p>
        </div>

        {/* Personal Details List */}
        <div className="flex flex-col space-y-3 text-sm">
          <h3 className="text-base font-semibold text-blue-300 mb-2 uppercase tracking-wider">User Details</h3>
          <div className="flex items-center space-x-3 group cursor-default">
            <FaUser className="text-blue-400 text-lg flex-shrink-0 group-hover:text-blue-300 transition-colors" />
            <span className="text-gray-300">Name: <strong className="text-white font-medium">{name}</strong></span>
          </div>
          <div className="flex items-center space-x-3 group cursor-default">
            <FaEnvelope className="text-blue-400 text-lg flex-shrink-0 group-hover:text-blue-300 transition-colors" />
            <span className="text-gray-300">Email: <strong className="text-white font-medium break-all">{email}</strong></span>
          </div>
          <div className="flex items-center space-x-3 group cursor-default">
            <FaGlobeAmericas className="text-blue-400 text-lg flex-shrink-0 group-hover:text-blue-300 transition-colors" />
            <span className="text-gray-300">Nationality: <strong className="text-white font-medium">{nationality}</strong></span>
          </div>
          <div className="flex items-center space-x-3 group cursor-default">
            <FaVenusMars className="text-blue-400 text-lg flex-shrink-0 group-hover:text-blue-300 transition-colors" />
            <span className="text-gray-300">Sex: <strong className="text-white font-medium">{sex}</strong></span>
          </div>
        </div>

        {/* Pie Chart for Case Status */}
        {chartData.length > 0 && (
          <div className="mt-4 flex flex-col items-center border-t border-slate-700/50 pt-5">
            <h3 className="text-base font-semibold text-blue-300 mb-3 uppercase tracking-wider">Case Overview</h3>
            <div style={{ width: '100%', height: 180 }}> {/* Fixed height container */}
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50} // Donut chart
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={3} // Space between slices
                    dataKey="value"
                    labelLine={false}
                    label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
                      const RADIAN = Math.PI / 180;
                      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                      const x = cx + radius * Math.cos(-midAngle * RADIAN);
                      const y = cy + radius * Math.sin(-midAngle * RADIAN);

                      // Only show label if percentage is significant enough
                      if (percent < 0.05) return null;

                      return (
                        <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize="12" fontWeight="bold">
                          {`${(percent * 100).toFixed(0)}%`}
                        </text>
                      );
                    }}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_CHART_COLORS[entry.name] || PIE_CHART_COLORS['Default']} stroke={PIE_CHART_COLORS[entry.name] || PIE_CHART_COLORS['Default']} strokeWidth={0.5} className="focus:outline-none"/>
                    ))}
                  </Pie>
                  <Tooltip
                     cursor={{ fill: 'rgba(100, 116, 139, 0.2)' }} // slate-500 with low opacity
                     contentStyle={{
                        backgroundColor: 'rgba(15, 23, 42, 0.9)', // slate-900 with opacity
                        borderColor: '#334155', // slate-700
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        padding: '8px 12px',
                     }}
                     itemStyle={{ color: '#cbd5e1' }} // slate-300
                     labelStyle={{ color: '#e2e8f0', fontWeight: 'bold', marginBottom: '4px' }} // slate-200
                  />
                  {/* Removed Legend component - using custom below */}
                </PieChart>
              </ResponsiveContainer>
            </div>
             {/* Custom Legend Below Chart */}
             <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-3 text-xs">
                {chartData.map((entry, index) => (
                  <div key={`legend-${index}`} className="flex items-center space-x-1.5">
                    <span
                      className="w-3 h-3 rounded-full inline-block"
                      style={{ backgroundColor: PIE_CHART_COLORS[entry.name] || PIE_CHART_COLORS['Default'] }}
                     />
                    <span className="text-gray-400">{entry.name}: <strong className="text-gray-200 font-medium">{entry.value}</strong></span>
                  </div>
                ))}
              </div>
          </div>
        )}

        {/* Voice Assistant Box */}
        <div
          className="mt-auto p-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out cursor-pointer flex flex-col items-center text-center group"
          onClick={() => window.open('https://gibberlink-psi.vercel.app/', '_blank', 'noopener noreferrer')}
          title="Open GibberLink Voice Assistant in new tab"
        >
          <FaRobot className="text-4xl mb-3 text-white group-hover:animate-pulse" /> {/* Animate on hover */}
          <h3 className="text-lg font-semibold text-white mb-1">Voice Assistant</h3>
          <p className="text-indigo-100 text-sm mb-2">Instant voice-based legal guidance.</p>
          <div className="flex items-center text-xs text-indigo-200 group-hover:text-white transition-colors">
            <span>Click to Open</span>
            <FaExternalLinkAlt className="ml-1.5 text-xs" />
          </div>
        </div>
      </aside>

      {/* Right Main Content Area */}
      <main className="flex-1 flex flex-col p-6 md:p-8 overflow-y-auto">
        {/* Navbar */}
        <nav className="w-full flex justify-between items-center p-4 bg-slate-900/70 backdrop-blur-sm shadow-md rounded-xl mb-8 sticky top-6 z-10 border border-slate-700/50"> {/* Added sticky top */}
          <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => { logout(); navigate("/intro"); }}
              title="Logout"
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transform hover:scale-105 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              <FaSignOutAlt /> <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </nav>

        {/* Content Sections */}
        <div className="flex-1 flex flex-col space-y-8">

          {/* Welcome & Judiciary Bot Cards */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Welcome Card */}
             <div className="bg-slate-800/80 p-6 rounded-xl shadow-lg border border-slate-700/50 flex flex-col justify-center transition-all duration-300 hover:shadow-xl hover:border-blue-500/30 hover:shadow-blue-500/10">
              <div className="flex items-start mb-3"> {/* Use items-start for alignment */}
                <FaInfoCircle className="text-3xl text-blue-400 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">Welcome to LegalEase</h2>
                  <p className="text-gray-300 leading-relaxed text-sm">
                   Your streamlined platform for legal case management. Access resources, track progress, and get AI-powered guidance efficiently.
                  </p>
                </div>
              </div>
            </div>

            {/* Judiciary Bot Card */}
             <div className="bg-slate-800/80 p-6 rounded-xl shadow-lg border border-slate-700/50 flex flex-col justify-center items-center text-center transition-all duration-300 hover:shadow-xl hover:border-yellow-500/30 hover:shadow-yellow-500/10">
              <FaBalanceScale className="text-5xl text-yellow-400 mb-4 animate-pulse-slow" /> {/* Added slow pulse animation */}
              <h2 className="text-xl font-bold text-white mb-2">Need Legal Advice?</h2>
              <p className="text-gray-300 mb-4 text-sm px-4">
                Consult our <strong>Judiciary Bot</strong> for initial insights and guidance on your legal concerns.
              </p>
              <button
                onClick={() => navigate("/add-case")}
                className="px-6 py-2 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-lg shadow-md transform hover:scale-105 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50"
              >
                Get Legal Advice
              </button>
            </div>
          </section>

          {/* Case List Section */}
          <section className="bg-slate-800/80 p-6 rounded-xl shadow-lg border border-slate-700/50 flex-1 flex flex-col min-h-0"> {/* Added min-h-0 for flex overflow */}
            <div className="flex items-center justify-between mb-5 border-b border-slate-700/50 pb-3">
              <div className="flex items-center">
                <FaListAlt className="text-2xl text-blue-400 mr-3" />
                <h2 className="text-xl font-bold text-white">Your Cases</h2>
              </div>
              <span className="text-sm font-medium text-gray-400 bg-slate-700/50 px-2.5 py-0.5 rounded-full">{cases.length} Total</span>
            </div>
            <div className="flex-1 overflow-y-auto pr-2 -mr-2 scrollbar-thin scrollbar-thumb-slate-600 hover:scrollbar-thumb-slate-500 scrollbar-track-slate-800/50 scrollbar-thumb-rounded-full">
              {cases.length > 0 ? (
                <ul className="space-y-3">
                  {[...cases].reverse().map((caseItem) => ( // Keep reverse order, use _id for key
                    <li
                      key={caseItem._id} // Use unique _id from DB
                      onClick={() => navigate(`/case/${caseItem._id}`)}
                      className="flex justify-between items-center p-4 bg-slate-700/50 rounded-lg shadow-sm hover:bg-slate-600/70 border border-transparent hover:border-blue-500/50 cursor-pointer transition-all duration-200 ease-in-out group focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 focus-within:ring-offset-slate-800"
                      tabIndex={0} // Make it focusable
                    >
                      <div className="flex-1 mr-4 min-w-0"> {/* Ensure text truncates */}
                        <h3 className="text-base font-semibold text-white truncate group-hover:text-blue-300 transition-colors" title={caseItem.name || 'Untitled Case'}>{caseItem.name || 'Untitled Case'}</h3>
                        <p className="text-xs text-gray-400 mt-0.5">ID: {caseItem._id}</p> {/* Displaying ID might be useful */}
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 ${getStatusColor(caseItem.status)} shadow-sm flex-shrink-0`}
                        title={`Status: ${caseItem.status || 'Unknown'}`}
                      >
                        {caseItem.status || 'Unknown'}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="flex flex-col items-center justify-center text-center text-gray-500 py-10 h-full">
                  <FaExclamationCircle className="text-4xl mb-3" />
                  <p className="font-semibold text-gray-400">No cases found.</p>
                  <p className="text-sm mt-1">Click 'Get Legal Advice' above to add your first case.</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>

    </div>
  );
};

export default Home;