
import MobileNav from '@/components/shared/MobileNav'
import Sidebar from '@/components/shared/Sidebar'
import { Toaster } from '@/components/ui/sonner'
import React from 'react'

const Layout = ({children}:{children:React.ReactNode}) => {
  return (
    <main className='flex min-h-screen w-full flex-col bg-white bg-gradient-to-r from-indigo-300 via-purple-400 to-pink-300 lg:flex-row '>
      <Sidebar></Sidebar>
      <MobileNav></MobileNav>
       <div className='mt-16 flex-1 overflow-auto py-8 lg:mt-0 lg:max-h-screen lg:py-10'>
        <div className='max-w-5xl mx-auto px-5 md:px-10 w-full text-dark-400 p-16-regular'>
            {children}
        </div>
       </div>
       <Toaster></Toaster>
    </main>
  )
}

export default Layout