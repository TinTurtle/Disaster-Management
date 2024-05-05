import React from "react";
import { Outlet, Link } from "react-router-dom";

const Layout = () => {
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
                <li className=''>Home</li>
              </Link>
              <Link
                className='p-2 items-center justify-center flex'
                to={`/donation`}
              >
                <li className=''>Donation</li>
              </Link>
              <Link
                className='p-2 items-center justify-center flex'
                to={`/report`}
              >
                <li className=''>Report</li>
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
