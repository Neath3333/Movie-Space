
  'use client';

  import React from "react";
  import Image from "next/image";
  import Link from "next/link";
  import { usePathname } from 'next/navigation';

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Discover', href: '/discover' },
    { name: 'Reviews', href: '/review' },
    { name: 'Recommendation', href: '/recommendation' },
    { name: 'Setting', href: '/setting' },
  ];

  export default function Navbar() {
    const pathname = usePathname();

    return (
      <nav className="flex p-6 bg-white-800 text-black items-center justify-center">
        <Image src="/logo.png" alt="logo" width={100} height={100} />
        <h1 className="mr-130 pl-10 text-xl font-bold">MOVIE SPACE</h1>
        <ul className="flex space-x-10">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={
                    isActive
                      ? 'text-blue-600 font-bold border-b-2 border-blue-600'
                      : 'hover:text-blue-600 transition-colors'
                  }
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }