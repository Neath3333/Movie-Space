import React from "react";
import Image from "next/image";
import Link from "next/link";



export default function Footer() {
  return (
    <footer>
        <div>
            <Image src="/logo.png" alt="logo" width={100} height={100} />
        </div>
        <div>
            <h2>Quick Links</h2>
            <Link href="/about">About Us</Link>
            <Link href="/discover">Discover</Link>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
            <Link href="/settings">Settings</Link>

        </div>
      <p>© 2024 My Website. All rights reserved.</p>
    </footer>
  );
}