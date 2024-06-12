import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div className="w-full h-screen bg-slate-800 grid place-items-center">
    <h1 className="text-3xl font-semibold capitalize ">Welcome to the home page.</h1>
  <div className='flex gap-4'>
<Link className='btn' to="/pokemon">Pokemon List</Link>
<Link className='btn' to="/tables">Product table</Link>
  </div>
  </div>
  )
}

export default HomePage