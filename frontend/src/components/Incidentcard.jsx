import React from 'react'

const Incidentcard = (props) => {
    let incidentdata = props.incidentdata;
  return (
    <div className='bg-white shadow-md overflow-hidden rounded-xl'>
        <div className="flex flex-col w-full">
            <img src='./plain.jpg' ></img>
            <div className='p-2'>
                <h2 className='mt-1 text-xl text-left'>Incident Title</h2>
                <p className='text'>description</p>
            </div>
        </div>
    </div>
  )
}

export default Incidentcard;