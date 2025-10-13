import { auth, currentUser } from '@clerk/nextjs/server'
import React from 'react'
import { LuUser } from "react-icons/lu";

async function UserIcon() {
  // const {userId} = auth()
  const user = await currentUser()
  const profileImage = user?.imageUrl

  if(profileImage){
    return (
      <img src={profileImage} alt="user profile image" className='w-6 h-6 rounded-full object-cover'/>
    )
  }
  return <LuUser className='w-6 h-6 rounded-full bg-primary text-white'/>
}

export default UserIcon
