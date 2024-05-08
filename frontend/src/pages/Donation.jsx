import jsPDF from 'jspdf';
import React, { useEffect, useState } from 'react';
import 'jspdf-autotable';
import axios from 'axios';

const Donation = () => {
  const [data, setData] = useState([])
  const fetchDonations = async() => {
    const res = await axios.get("http://localhost:3000/donations")
    console.log(res.data.data)
    setData(res.data.data)
  }
  useEffect(()=>{
    fetchDonations()
  },[])
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Donation Report', 10, 10);
    doc.autoTable({
      head: [['Resource ID', 'Quantity', 'Resource Type']],
      body: data.map(item => [item.resource_id, item.quantity,  item.resource_type]),
    });
    doc.save('donation_report.pdf');
  };

  return (
    <div className='container mx-auto'>
      <h2 className='text-2xl font-bold mb-4'>Donations</h2>
      
      <div className='overflow-x-auto'>
        <table className='table-auto border-collapse border border-gray-800'>
          <thead>
            <tr>
              <th className='border border-gray-800 px-4 py-2'>Resource ID</th>
              <th className='border border-gray-800 px-4 py-2'>Quantity</th>
              <th className='border border-gray-800 px-4 py-2'>Resource Type</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}>
                <td className='border border-gray-800 px-4 py-2'>{item.resource_id}</td>
                <td className='border border-gray-800 px-4 py-2'>{item.quantity}</td>
                <td className='border border-gray-800 px-4 py-2'>{item.resource_type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='mt-4'>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={generatePDF}>
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default Donation;
