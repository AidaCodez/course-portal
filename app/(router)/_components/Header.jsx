import { Button } from '@/components/ui/button'
import { BellDot, Search } from 'lucide-react'
import React from 'react'

function Header() {
  return (
    <div className='p-4 bg-white flex justify-between'>
        {/* Search Bar */}
        <div className='flex gap-2 border border-border p-2 rounded-md'>
            <Search className='h-5 w-5'/>
            <input type='text' placeholder='Search...' className='outline-none w-24 md:w-64'/>
        </div>
         {/* Get Started Button & bell icon*/}
        <div className='flex items-center gap-4'>
           <BellDot className='text-gray-500'/>
           <Button>Get Started</Button>
        </div>
    </div>
  )
}

export default Header