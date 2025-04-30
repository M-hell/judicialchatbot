import React, { useState, useEffect } from 'react';  
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useUserStore from '../zustand/useProvider';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlusCircle, FiHome, FiFileText, FiMessageSquare, FiArrowRight } from 'react-icons/fi';
import { FaBalanceScale, FaSpinner } from 'react-icons/fa';

const AddCase = () => {
    const { name, email, nationality, sex } = useUserStore();
    const [caseName, setCaseName] = useState('');
    const [description, setDescription] = useState('');
    const [responseMessage, setResponseMessage] = useState(null);
    const [initialResponse, setInitialResponse] = useState('');
    const [displayedText, setDisplayedText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [caseId, setCaseId] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setResponseMessage("Generating response...");
        setDisplayedText('');
        setInitialResponse('');

        try {
            const URL = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/add-case`;
            const response = await axios.post(
                URL,
                { name: caseName, description },
                { withCredentials: true }
            );

            setResponseMessage(response.data.message);
            setInitialResponse(response.data.case?.initialResponse || "");
            setCaseId(response.data.case?._id || null);
        } catch (error) {
            console.error("Error adding case:", error);
            setResponseMessage("Failed to add case. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (initialResponse) {
            let index = 0;
            setDisplayedText('');
            const interval = setInterval(() => {
                if (index < initialResponse.length) {
                    setDisplayedText((prev) => prev + initialResponse[index]);
                    index++;
                } else {
                    clearInterval(interval);
                }
            }, 20); // Faster typing speed
            return () => clearInterval(interval);
        }
    }, [initialResponse]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4 md:p-10"
        >
            <motion.div 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="w-full max-w-3xl p-6 md:p-8 lg:p-10 bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700"
            >
                <div className="flex items-center justify-center gap-3 mb-8">
                    <motion.div
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    >
                        <FaBalanceScale className="text-3xl text-blue-400" />
                    </motion.div>
                    <h2 className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        Add a New Case
                    </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <label className="text-lg md:text-xl mb-3 flex items-center gap-2">
                            <FiFileText className="text-blue-400" /> Case Name:
                        </label>
                        <input
                            type="text"
                            value={caseName}
                            onChange={(e) => setCaseName(e.target.value)}
                            placeholder="Enter case name"
                            className="w-full px-5 py-3 rounded-xl bg-gray-700/70 border border-gray-600 focus:border-blue-500 text-white focus:ring-2 focus:ring-blue-500/30 text-lg transition-all"
                            required
                        />
                    </motion.div>

                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <label className="text-lg md:text-xl mb-3 flex items-center gap-2">
                            <FiMessageSquare className="text-blue-400" /> Description:
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter case description"
                            rows="6"
                            className="w-full px-5 py-3 rounded-xl bg-gray-700/70 border border-gray-600 focus:border-blue-500 text-white focus:ring-2 focus:ring-blue-500/30 text-lg transition-all"
                            required
                        ></textarea>
                    </motion.div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 font-medium rounded-xl shadow-lg transition-all flex justify-center items-center gap-2 text-lg"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                >
                                    <FaSpinner className="text-white" />
                                </motion.div>
                                Generating Response...
                            </>
                        ) : (
                            <>
                                <FiPlusCircle /> Submit Case
                            </>
                        )}
                    </motion.button>
                </form>

                <AnimatePresence>
                    {responseMessage && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-6 p-4 bg-gray-700/50 rounded-xl text-center text-lg border border-gray-600"
                        >
                            {responseMessage}
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {displayedText && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="mt-6"
                        >
                            <label className="text-lg md:text-xl mb-3 flex items-center gap-2">
                                <FiMessageSquare className="text-green-400" /> Initial Response:
                            </label>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="w-full px-5 py-3 rounded-xl bg-gray-800/50 border border-gray-700 font-mono tracking-wide text-green-400 text-lg min-h-48 max-h-96 overflow-y-auto"
                            >
                                {displayedText}
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {caseId && (
                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => navigate(`/case/${caseId}`)}
                            className="mt-6 w-full px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 font-medium rounded-xl shadow-lg transition-all flex justify-center items-center gap-2 text-lg"
                        >
                            Continue Case <FiArrowRight />
                        </motion.button>
                    )}
                </AnimatePresence>
            </motion.div>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/')}
                className="mt-8 px-6 py-3 bg-gray-700/50 hover:bg-gray-700 rounded-xl text-white transition-all flex items-center gap-2 text-lg border border-gray-600"
            >
                <FiHome /> Back to Home
            </motion.button>
        </motion.div>
    );
};

export default AddCase;