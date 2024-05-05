import React from 'react'
import Incidentcard from '../components/Incidentcard'

const Home = () => {
  const data = [
    {
      title : "Floods in T-Nagar",
      user : "XYZ",
      location : "T-Nagar",
      severity : "2"
    },
    {
      title : "Floods in T-Nagar",
      user : "XYZ",
      location : "T-Nagar",
      severity : "2"
    },
    {
      title : "Floods in T-Nagar",
      user : "XYZ",
      location : "T-Nagar",
      severity : "2"
    },
    {
      title : "Floods in T-Nagar",
      user : "XYZ",
      location : "T-Nagar",
      severity : "2"
    },
  ];
  return (
    <div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {data.map(x =>{
              return <Incidentcard/>
          })}
            
        </div>
    </div>
  )
}

export default Home