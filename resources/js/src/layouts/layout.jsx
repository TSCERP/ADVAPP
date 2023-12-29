import React from 'react'
import Header from './header.jsx'
import Sidebar from './sidebar.jsx'

function Layout({ children }) {
  return (
    <div>
      <div className='flex w-full'>
        <Sidebar/>
        <div className='w-full'>
          <Header/>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout