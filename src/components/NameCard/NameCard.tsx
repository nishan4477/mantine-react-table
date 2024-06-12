import React from 'react'

const NameCard = ({title}:{title:string}) => {
  return (
    <div className='bg-white shadow-md rounded-lg p-4 mb-2'>
        <p className='text-lg text-[#6495ED]'>Name: {title}</p>
    
    </div>
  )
}

export default NameCard