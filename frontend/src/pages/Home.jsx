import React, { useEffect, useState } from "react";
import Incidentcard from "../components/Incidentcard";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);
  const fetchBlogsData = async () => {
    const res = await axios.get("http://localhost:3000/blog");
    setData(res.data.data);
  };
  useEffect(() => {
    fetchBlogsData();
  }, []);
  console.log(data);
  return (
    <div>
      <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-5'>
        {data.map((x) => {
          return (
            <Link to={`/blog/${x.incident_id}`}>
              <Incidentcard
                key={x.incident_id}
                title={x.title}
                description={x.description}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
