import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-200 p-6 w-full">

      <div className="flex items-center ml-25 mb-4">

        <div className="">
          <Image src="/logo.png" alt="Movie Space Logo" width={80} height={80} />
        </div>

        <div className=" pt-10">
          <h2 className="text-xl ml-20 text-gray-900 mb-2 font-semibold">Quick Links</h2>
          <ul className="text-blue-600 ml-[80px] space-x-10 font-light">
            <li><Link href="/about" >About Us</Link></li>
            <li><Link href="/discover">Discover</Link></li>
            <li><Link href="/privacy_policy">Privacy Policy</Link></li>
            <li><Link href="/terms_service" >Terms of Service</Link></li>
            <li><Link href="/setting">Settings</Link></li>
          </ul>
        </div>
        <div></div>

      </div>


      <div className="text-center border-t border-gray-300 pt-4">
        <p className="text-gray-600">© 2024 Movie Space. All rights reserved.</p>
      </div>

    </footer>
  );
}