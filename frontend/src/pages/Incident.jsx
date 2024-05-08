import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import DonationPopup from "../components/Popup";


const Incident = () => {
  let { id } = useParams();
  const [incident, setIncident] = useState({});
  const [showPopup, setShowPopup] = useState(false);

  const handleDonateClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const fetchBlog = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/blogbyid/${id}`);
      setIncident(res.data.data[0]);
    } catch (error) {
      console.error("Error fetching blog:", error);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [id]); // Fetch data when id changes

  return (
    <div className='flex justify-center items-center h-screen'>
      {incident && (
        <div className='max-w-md w-full bg-white shadow-lg rounded-lg overflow-hidden'>
          <Link to='/home' className='mr-2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='lucide lucide-home inline-block mr-2'
            >
              <path d='m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' />
              <polyline points='9 22 9 12 15 12 15 22' />
            </svg>
          </Link>
          <div className='p-4 flex items-center'>
            <div>
              <h1 className='text-3xl font-semibold text-gray-800 mb-2'>
                {incident.title}
              </h1>
              <p className='text-sm text-gray-600 mb-2'>{incident.location}</p>
              <p className='text-sm text-gray-600 mb-4'>{incident.severity}</p>
              <p className='text-base text-gray-700'>{incident.post}</p>
            </div>
          </div>
          <button
            onClick={handleDonateClick}
            className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 m-4'
          >
            Donate for {incident.title}
          </button>
          {showPopup && <DonationPopup onClose={handleClosePopup} id={id} />}
        </div>
      )}
    </div>
  );
};

export default Incident;
