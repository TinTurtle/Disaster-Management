import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import dateFormat from "dateformat";

const Incident = () => {

    const apiURL = 'http://localhost:3000/'

    let {id} = useParams();
    const [incident,setBlog] = useState(null);

    useEffect(() => {
        async function fetchData(){
            const allIncidents = await getIncidentid(id);
            setBlog(allIncidents.data[0]);
        }
        fetchData();
    },[]);
    

    return (
        <div className='flex justify-center items-center'>
            {incident && <div className="flex flex-col w-[60%] overflow-hidden">
                <h1 className='mt-1 text-3xl font-extrabold'>{incident.title}</h1>
            
                <div className="flex mt-4 mb-4">
                    <small>{incident.location}</small>
                </div>
                <div className="flex mt-4 mb-4">
                    <small>{incident.severity}</small>
                </div>
                <img className='rounded-lg' src={'.../assets/plain.jpg'} alt="" />
                <div>
                    {parse(incident.post)}  
                </div>
            </div>}
        </div>
    );
}

export default Blog;