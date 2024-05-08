import axios from "axios";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { jwtDecode } from "jwt-decode";

const Createblog = () => {

  const blankBlog = {
    title: "",
    location: "",
    description:"",
    post: "<p><br></p>",
    severity: "",
  };
  
  const [newblog, setNewblog] = useState(blankBlog);

  const handleSubmit = async () => {
    const res = await axios.post("http://localhost:3000/blog", newblog)
    console.log(res)
  };

  const menu = [
    { text: "High"},
    { text: "Medium"},
    { text: "Low"},
    { text: "Negligible"},
  ];
  return (
    <div className='flex w-full items-center justify-center'>
      <div className='bg-slate-200 w-[60%] p-5 rounded-xl'>
        {/* <small>{JSON.stringify(newblog)}</small> */}
        <h1 className='text-2xl mb-5'>Create Incident Report</h1>
        <div className='flex flex-col'>
          <label htmlFor='' className='ml-1 text-gray-500'>
            Title
          </label>
          <input
            type='text'
            value={newblog.title}
            onChange={(e) =>
              setNewblog({ ...newblog, title: e.target.value })
            }
            className='h-10 border border-gray-300 rounded my-2 p-2'
          />
          <label htmlFor='' className='ml-1 text-gray-500'>
            Severity
          </label>
          <select
            value={newblog.severity}
            onChange={(e) =>
              setNewblog({ ...newblog, severity: e.target.value })
            }
            name=''
            id=''
            className='h-10 border border-gray-300 rounded my-2 p-2'
          >
            <option value='' default disabled>
              Select Severity
            </option>
            {menu.map((x) => {
              return <option value={x.text}>{x.text}</option>;
            })}
          </select>
          <label htmlFor='' className='ml-1 text-gray-500'>
            Location
          </label>
          <input
            type='text'
            value={newblog.location}
            onChange={(e) =>
              setNewblog({ ...newblog, location: e.target.value })
            }
            className='h-10 border border-gray-300 rounded my-2 p-2'
          />
          <label htmlFor='' className='ml-1 text-gray-500'>
            Description
          </label>
          <input
            type='text'
            value={newblog.description}
            onChange={(e) =>
              setNewblog({ ...newblog, description: e.target.value })
            }
            className='h-10 border border-gray-300 rounded my-2 p-2'
          />
          <label htmlFor='' className='ml-1 text-gray-500'>
            Post
          </label>
          <ReactQuill
            className='bg-white rounded mb-2 mt-2 editingarea'
            theme='snow'
            value={newblog.post}
            onChange={(e) => {
              setNewblog({ ...newblog, post: e });
            }}
          />
          

          <hr />
          <button
            onClick={() => handleSubmit()}
            className='bg-slate-500 text-white h-8 w-[100px] mt-2 rounded'
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Createblog;
