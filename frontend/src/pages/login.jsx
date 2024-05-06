import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields!");
      return;
    }
    console.log(formData);
    const res = await axios.post("http://localhost:3000/login", formData); //place api url here
    console.log(res.data)
    if(res.data.token){
      navigate("/home")
    }else{
      toast("Invalid credentials!")
      return
    }
   // navigate("/home")
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <div className='max-w-md w-full p-8 bg-white rounded-lg shadow-md'>
      <Link to='/'>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-home"
          >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg></Link>
        <h2 className='text-3xl font-extrabold text-gray-900 text-center mb-8'>
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label htmlFor='email' className='block text-gray-700'>
              Email:
            </label>
            <input
              type='email'
              id='email'
              name='email'
              className='mt-1 p-2 w-full border rounded-md'
              placeholder='Enter your email'
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className='mb-6'>
            <label htmlFor='password' className='block text-gray-700'>
              Password:
            </label>
            <input
              type='password'
              id='password'
              name='password'
              className='mt-1 p-2 w-full border rounded-md'
              placeholder='Enter your password'
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type='submit'
            className='w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md'
          >
            Login
          </button>
        </form>
        <div>
          don't have an account{" "}
          <span className='ml-3 text-blue-600 cursor-pointer'>
            <Link to='/register'>Register now</Link>
          </span>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
