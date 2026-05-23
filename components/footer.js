import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-200 px-4 sm:px-6 py-8 sm:py-12 w-full mt-auto">

      <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start gap-6 sm:gap-12 mb-6 sm:mb-8">

        {/* Logo */}
        <div className="flex-shrink-0">
          <img src="/logo.png" alt="Movie Space Logo" width={60} height={60} className="sm:w-[80px] sm:h-[80px]" />
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-base sm:text-xl text-gray-900 mb-3 sm:mb-2 font-semibold">Quick Links</h2>
          <ul className="flex flex-row sm:flex-col flex-wrap gap-4 sm:gap-2 text-blue-600 text-sm sm:text-base">
            <li><Link href="/about" className="hover:underline">About Us</Link></li>
            <li><Link href="/discover" className="hover:underline">Discover</Link></li>
            <li><Link href="/policy" className="hover:underline">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:underline">Terms of Service</Link></li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center border-t border-gray-300 pt-4">
        <p className="text-gray-600 text-sm sm:text-base">© 2026 Movie Space. All rights reserved.</p>
      </div>

    </footer>
  );
}