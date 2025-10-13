"use client"
import { useToast } from '@/hooks/use-toast'
import { SignOutButton } from '@clerk/nextjs'
import React from 'react'
import Link from "next/link"

function SignOutLink() {
  const {toast} = useToast()

  const handleLogOut = ()=>{
    toast({
      description:"You have been logged out successfully",
    })
  }

  return (
    <SignOutButton>
      <Link href="/" className="w-full text-left text-red-600" onClick={handleLogOut}>
      Log Out
      </Link>
    </SignOutButton>
  )
}

export default SignOutLink
