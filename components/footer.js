import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-200">
        <div  className="">
            <Image src="/" alt="logo" width={100} height={100} />
        </div>
        <div className="text-blue-600 flex flex-col items-center justify-center p-4">
            <h2>Quick Links</h2>
            <ul className="flex flex-col items-center justify-center space-y-2 mb-4">
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/discover">Discover</Link></li>
                <li><Link href="/privacy">Privacy Policy</Link></li>
                <li><Link href="/terms">Terms of Service</Link></li>
                <li><Link href="/settings">Settings</Link></li>
            </ul>
            <div className="text-gray-600">
        <p>© 2024 My Website. All rights reserved.</p>
        </div>
        </div>
    </footer>
  );
}