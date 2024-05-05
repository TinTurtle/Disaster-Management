import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <div className="absolute top-4 right-4">
        <Link to="/login">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded">Login</button>
        </Link>
        <Link to="/signup">
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Sign Up</button>
        </Link>
      </div>
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Website!</h1>
        <p className="text-lg">Some introductory text here...</p>
      </div>
    </div>
  );
};

export default LandingPage;