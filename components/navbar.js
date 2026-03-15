'use client';

import Image from "next/image";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import SearchBar from "./SearchBar";
import React from "react";
import AuthButton from "./auth-button";

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Discover', href: '/discover' },
  { name: 'Reviews', href: '/review' },
  { name: 'Recommendation', href: '/recommendation' },
  { name: 'Setting', href: '/setting' }, // Dropdown
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 w-full flex p-6 bg-[#FFB7C5]/70 text-black items-center justify-center ">
      <Image src="/logo.png" alt="logo" width={100} height={100} />
      <h1 className="mr-20 pl-8 text-xl font-bold">MOVIE SPACE</h1>

      <ul className="flex space-x-8">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;

          // Settings dropdown
          if (link.name === 'Setting') {
            return (
              <li key={link.href} className="relative group">
                <span
                  className={
                    isActive
                      ? 'text-lime-800 font-bold border-b-2 border-lime-600 cursor-pointer'
                      : 'hover:text-lime-200 transition-colors cursor-pointer'
                  }
                >
                  {link.name}
                </span>

                {/* Dropdown */}
                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200">
                  <Link href="/profiles" className="block px-2 py-2 hover:bg-gray-200">
                    Profile
                  </Link>
                  <Link href="/setting/privacy" className="block px-2 py-2 hover:bg-gray-200">
                    Ratings & Watchlist
                  </Link>
                  <Link href="/theme" className="block px-2 py-2 hover:bg-gray-200">
                    Theme
                  </Link>
                  <Link href="/about" className="block px-2 py-2 hover:bg-gray-200">
                    About
                  </Link>
                </div>
              </li>
            );
          }

          // Normal links
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={
                  isActive
                    ? 'text-lime-400 font-bold border-b-2 '
                    : 'hover:text-lime-200 transition-colors'
                }
              >
                {link.name}
              </Link>
            </li>
          );
        })}
      </ul>
     <SearchBar/>
     <div className="ml-8">
    <AuthButton />
    </div>
    </nav>
  );
}
