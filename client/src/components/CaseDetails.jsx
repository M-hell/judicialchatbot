import React, { useEffect, useState } from 'react'; 
import { useParams } from 'react-router-dom'; 

function CaseDetails() {
    const { id } = useParams();
  return (
    <div>
      {id}
    </div>
  )
}

export default CaseDetails
