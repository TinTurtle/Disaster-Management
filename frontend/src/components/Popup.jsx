import axios from "axios";
import React, { useState } from "react";

const DonationPopup = ({ onClose , id }) => {
  const [donationAmount, setDonationAmount] = useState(0);

  const handleDonation = async() => {
    if (donationAmount > 10) {
        const res = await axios.put(`http://localhost:3000/donationUpdate/${id}` , {donationAmount})
        console.log(res)
    }
    console.log("Donation amount:", donationAmount);
    
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg w-80">
        <h2 className="text-lg font-semibold mb-4">Donate to the Cause(INR)</h2>
        <input
          type="number"
          className="border border-gray-300 rounded-lg p-2 mb-4 w-full"
          value={donationAmount}
          onChange={(e) => setDonationAmount(e.target.value)}
        />
        <button
          onClick={handleDonation}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Donate
        </button>
        <button
          onClick={onClose}
          className="bg-gray-300 text-gray-700 ml-4 px-4 py-2 rounded-lg hover:bg-gray-400"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default DonationPopup;
