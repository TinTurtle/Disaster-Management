import React from "react";
import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return (
      <div className='flex items-center justify-center w-screen h-screen bg-gray-100'>
        <div className='text-center'>
          <p className='text-gray-600 mb-4'>Login or sign up to continue</p>
          <Link
            to='/login'
            className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
          >
            Login
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div>
      {/* <Header></Header> */}
      <div className='border-b'>
        <div className='px-5 py-5 flex justify-between'>
          <Link to='/'>
            <span className='font-extrabold text-2xl'>SAFER</span>
          </Link>
          <div className='flex'>
            <ul className='flex'>
              <Link
                className='p-2 items-center justify-center flex'
                to={`/home`}
              >
                <li className='' key={1}>
                  Home
                </li>
              </Link>
              <Link
                className='p-2 items-center justify-center flex'
                to={`/donation`}
              >
                <li className='' key={2}>
                  Donation
                </li>
              </Link>
              <Link
                className='p-2 items-center justify-center flex'
                to={`/report`}
              >
                <li className='' key={3}>
                  Report
                </li>
              </Link>
            </ul>
            <Link to='/create'>
              <button className='bg-slate-500 text-white px-3 py-1 rounded'>
                +
              </button>
            </Link>
          </div>
        </div>
      </div>
      {/* <Body></Body> */}
      <div className='flex mx-auto px-5 md:px-20'>
        <div className='mt-5 mb-5 min-h-[500px] w-full'>
          <Outlet></Outlet>
        </div>
      </div>
      {/* <Footer></Footer> */}
    </div>
  );
};

export default Layout;
