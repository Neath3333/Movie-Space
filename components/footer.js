import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-200">
        <div  className="">
            <Image src="/" alt="logo" width={100} height={100} />
        </div>
        <div className="text-blue-600">
            <h2>Quick Links</h2>
            <ul >
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/discover">Discover</Link></li>
                <li><Link href="/privacy">Privacy Policy</Link></li>
                <li><Link href="/terms">Terms of Service</Link></li>
                <li><Link href="/settings">Settings</Link></li>
            </ul>
        <p>© 2024 My Website. All rights reserved.</p>
        </div>
    </footer>
  );
}