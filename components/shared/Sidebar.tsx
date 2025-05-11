'use client'

import { navLinks } from '@/constants'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'

const Sidebar = () => {
  const [isClient, setIsClient] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsClient(true) // This ensures we only render after the client-side JavaScript is loaded
  }, [])

  if (!isClient) {
    return null // Prevent rendering during SSR to avoid hydration issues
  }

  return (
    <aside className='hidden h-screen w-72 bg-white p-5 shadow-md shadow-purple-200/50 bg-gradient-to-r from-indigo-200 via-purple-300 to-pink-200 lg:flex'>
      <div className='flex size-full flex-col gap-4'>
        <Link href='/' className='flex items-center gap-2 md:py-2'>
          <Image src='/assets/images/logo-text.svg' alt='logo' width={180} height={28} className="max-w-full h-auto ml-[20px]" />
        </Link>
        <nav className='h-full flex-col justify-between md:flex md:gap-4'>
          <SignedIn>
            <ul className='hidden w-full flex-col items-start gap-2 md:flex'>
              {navLinks.slice(0, 6).map((link) => {
                const isActive = link.route === pathname
                return (
                  <li key={link.route} className={`flex-center text-center p-16-semibold w-full whitespace-nowrap rounded-full bg-cover transition-all hover:bg-purple-100 hover:shadow-inner ${
                    isActive ? 'bg-purple-600 text-white' : 'text-grey-700'}`}>
                    <Link className='p-16-semibold flex size-full gap-4 p-4' href={link.route}>
                      <Image src={link.icon} alt='icon' width={24} height={24} className={`${isActive && 'brightness-200'}`} />
                      {link.label}
                    </Link>
                  </li>
                )
              })}
            </ul>

            <ul className='hidden w-full flex-col items-start gap-2 md:flex'>
              {navLinks.slice(6).map((link) => {
                const isActive = link.route === pathname
                return (
                  <li key={link.route} className={`flex-center text-center p-16-semibold w-full whitespace-nowrap rounded-full bg-cover transition-all hover:bg-purple-100 hover:shadow-inner ${
                    isActive ? 'bg-purple-600 text-white' : 'text-grey-700'}`}>
                    <Link className='p-16-semibold flex size-full gap-4 p-4' href={link.route}>
                      <Image src={link.icon} alt='icon' width={24} height={24} className={`${isActive && 'brightness-200'}`} />
                      {link.label}
                    </Link>
                  </li>
                )
              })}
              <li className='flex-center cursor-pointer gap-2 p-4'>
                <UserButton showName />
              </li>
            </ul>
          </SignedIn>
          <SignedOut>
            <Button asChild className='py-4 px-6 flex-center gap-3 rounded-full p-16-semibold focus-visible:ring-offset-0 focus-visible:ring-transparent bg-purple-600 bg-cover'>
              <Link href='/sign-in'>Login</Link>
            </Button>
          </SignedOut>
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar
