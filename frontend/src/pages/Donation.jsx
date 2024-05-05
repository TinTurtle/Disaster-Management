import React, { useState } from 'react';

const Donation = () => {
  const [data, setData] = useState([]);

  // Sample data for demonstration
  const sampleData = [
    { resource_id: 1, quantity: 10, resource_person: 'John Doe', resource_type: 'Money' },
    { resource_id: 2, quantity: 5, resource_person: 'Jane Smith', resource_type: 'Food' },
    { resource_id: 3, quantity: 8, resource_person: 'Alice Johnson', resource_type: 'Clothing' }
  ];

  return (
    <div className='container mx-auto'>
      <h2 className='text-2xl font-bold mb-4'>Donations</h2>
      
      <div className='overflow-x-auto'>
        <table className='table-auto border-collapse border border-gray-800'>
          <thead>
            <tr>
              <th className='border border-gray-800 px-4 py-2'>Resource ID</th>
              <th className='border border-gray-800 px-4 py-2'>Quantity</th>
              <th className='border border-gray-800 px-4 py-2'>Resource Person</th>
              <th className='border border-gray-800 px-4 py-2'>Resource Type</th>
            </tr>
          </thead>
          <tbody>
            {sampleData.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}>
                <td className='border border-gray-800 px-4 py-2'>{item.resource_id}</td>
                <td className='border border-gray-800 px-4 py-2'>{item.quantity}</td>
                <td className='border border-gray-800 px-4 py-2'>{item.resource_person}</td>
                <td className='border border-gray-800 px-4 py-2'>{item.resource_type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='mt-4'>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default Donation;
