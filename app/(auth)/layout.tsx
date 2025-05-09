import React from 'react'

const Layout = ({children}:{children:React.ReactNode}) => {
  return (
    <main className=' flex flex-center items-center justify-center  min-h-screen  w-full bg-purple-50'>
        {children}
    </main>
  )
}

export default Layout