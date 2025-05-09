'use client'
import React from 'react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Link from 'next/link'
import Image from 'next/image'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { navLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import { Button } from '../ui/button'

const MobileNav = () => {
  const pathname = usePathname()

  return (
    <header className='flex fixed justify-between h-16 w-full border-b-4 border-purple-100 bg-white p-5 lg:hidden'>
      <Link href='/' className='flex items-center gap-2 md:py-2'>
        <Image
          src="/assets/images/logo-text.svg"
          alt='logo'
          width={180}
          height={28}
        />
      </Link>

      <nav className='flex gap-2'>
        <SignedIn>
          <UserButton />
          <Sheet>
            <SheetTrigger>
              <Image
                src="/assets/icons/menu.svg"
                alt="menu"
                width={32}
                height={32}
                className='cursor-pointer'
              />
            </SheetTrigger>

            <SheetContent className='focus:outline-none sm:w-64'>
              <SheetHeader>
                <SheetTitle className="sr-only">Mobile Navigation</SheetTitle>
              </SheetHeader>

              <Image
                src="/assets/images/logo-text.svg"
                alt="logo"
                width={152}
                height={23}
                className='mt-2 ml-1'
              />

              <ul className="mt-4 flex w-full flex-col items-start gap-2">
                {navLinks.map((link) => {
                  const isActive = link.route === pathname;
                  return (
                    <li
                      key={link.route}
                      className={`flex text-dark-700 whitespace-nowrap ${
                        isActive ? "gradient-text" : ""
                      }`}
                    >
                      <Link
                        className="p-16-semibold flex items-center gap-3 px-3 py-2 w-full rounded-md hover:bg-purple-100 transition cursor-pointer"
                        href={link.route}
                      >
                        <Image
                          src={link.icon}
                          alt="icon"
                          width={24}
                          height={24}
                          className={isActive ? "" : ""}
                        />
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </SheetContent>
          </Sheet>
        </SignedIn>
               <SignedOut>
                <Button asChild className='py-4 px-6 flex-center gap-3 rounded-full p-16-semibold focus-visible:ring-offset-0 focus-visible:ring-transparent bg-purple-600 bg-cover'>
                    <Link href='/sign-in'>Login</Link>
                </Button>
            </SignedOut>
            
      </nav>
    </header>
  )
}

export default MobileNav
