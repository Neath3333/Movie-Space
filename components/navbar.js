'use client';

import React from "react";
import Image from "next/image";
import Link from "next/link";
export default function Navbar() {
  return (
    <nav className="flex p-6 bg-white-800 text-black items-center justify-center">
      <Image src="/logo.png" alt="logo" width={100} height={100} />
      <h1 className="mr-130 pl-10 text-xl font-bold">MOVIE SPACE</h1>
      <ul className="flex space-x-10">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/discover">Discover</Link></li>
        <li><Link href="/review">Reviews</Link></li> 
        <li><Link href="/recommendation">Recommendation</Link></li>
        <li><Link href="/setting">Setting</Link></li>
        
      </ul>
    </nav>
  );  
}   