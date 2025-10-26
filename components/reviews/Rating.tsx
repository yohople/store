import React from 'react'
import { FaRegStar, FaStar } from "react-icons/fa";

function Rating({rating}:{rating:number}) {
  const stars = Array.from({length:5}, (_,i)=>i+1 <=rating)
  return (
    <div className='flex items-center gap-x-1'>
      {stars.map((isFilled, index)=>{
        const className = isFilled? "text-primary":"text-gray-400"
        return isFilled? <FaStar key={index} className={className}/>: <FaRegStar key={index} className={className}/>
      })}
    </div>
  )
}

export default Rating
