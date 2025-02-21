import useUserStore from '../zustand/useProvider'; // Import Zustand store
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 

function CaseDetails() {
    const { id } = useParams();
    useEffect(() => {
        const fetchCaseDetails = async () => {
          try {
            const URL = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/get-case-details`;
            const response = await axios.post(
                URL,
                { caseid: id },
                { withCredentials: true }
            );

            console.log(response.data);
          } catch (error) {
            console.error("Error fetching case details:", error);
          }
        };
        fetchCaseDetails();
    }, [id]);
  return (
    <div>
      {id}
    </div>
  )
}

export default CaseDetails
