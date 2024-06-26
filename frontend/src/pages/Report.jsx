import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import axios from 'axios';

const Report = () => {
  const [data, setData] = useState([]);

  const fetchreports = async() => {
    const res = await axios.get("http://localhost:3000/blog")
    console.log(res.data.data)
    setData(res.data.data)
  }
  useEffect(()=>{
    fetchreports()
  },[])

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Incident Report', 10, 10);
    doc.autoTable({
      head: [['Incident ID', 'Title', 'Location', 'Severity']],
      body: data.map(item => [
        item.incident_id,
        item.title,
        item.location,
        item.severity,
      ]),
    });
    doc.save('donation_report.pdf');
  };
 
  return (
    <div className='container mx-auto'>
      <h2 className='text-2xl font-bold mb-4'>Report</h2>
      
      <div className='overflow-x-auto mb-4'>
        <table className='table-auto border-collapse border border-gray-800'>
          <thead>
            <tr>
              <th className='border border-gray-800 px-4 py-2'>Incident ID</th>
              <th className='border border-gray-800 px-4 py-2'>Title</th>
              <th className='border border-gray-800 px-4 py-2'>Location</th>
              <th className='border border-gray-800 px-4 py-2'>Severity</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}>
                <td className='border border-gray-800 px-4 py-2'>{item.incident_id}</td>
                <td className='border border-gray-800 px-4 py-2'>{item.title}</td>
                <td className='border border-gray-800 px-4 py-2'>{item.location}</td>
                <td className='border border-gray-800 px-4 py-2'>{item.severity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='mt-4 '>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={generatePDF}>
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default Report;
