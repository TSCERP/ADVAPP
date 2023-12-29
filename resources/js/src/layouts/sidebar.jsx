import React from 'react'
import { Link } from 'react-router-dom'

function Sidebar() {
  return (
    <div>
      <div className="text-[15px] h-screen max-w-[270px] min-w-[270px] bg-black flex flex-col">
        {/* App Logo */}
        <div className="flex justify-center py-4 space-x-2 ">
          <div className='font-bold text-[#ffcc00]'>Logo</div>
          <div className='text-white'>App Name</div>
        </div>

        {/* Content */}
        <div className="w-full px-4 mt-4 space-y-4">
          <Link>
            <div className='text-white'>  
              <div>Approval</div>
            </div>          
          </Link>

          <div className='text-white'>
            Sidebar Row
          </div>
          <div className='text-white'>
            Sidebar Row
          </div>
          <div className='text-white'>
            Sidebar Row
          </div>
          <div className='text-white'>
            Sidebar Row
          </div>
          <div className='text-white'>
            Sidebar Row
          </div>
          <div className='text-white'>
            Sidebar Row
          </div>
          <div className='text-white'>
            Sidebar Row
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar