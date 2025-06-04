import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

const Header = ({children}:{children:React.ReactNode}) => {
  return (
    <div className="flex flex-col">
    <div className='bg-primary-blue w-full h-16 flex items-center justify-between px-4'>
      <div className='flex items-center'>
        <Image
          src='/logo.png'
          alt='Logo'
          className='h-10 w-40'
          width={200}
          height={50}
        />
      </div>
      <div className='buttons'>
        <Button className='bg-white cursor-pointer text-regal-blue border border-regal-blue px-4 py-2 rounded-lg transition-colors duration-300 hover:bg-gray-300'>
          Sign In
        </Button>

        <Button className='cursor-pointer bg-primary-blue text-white px-4 py-2 rounded-lg ml-4 transition-colors duration-300  hover:text-regal-blue border border-primary-blue hover:border-white'>
          Sign Up
        </Button>
      </div>
    </div>
    </div>
  )
}

export default Header
