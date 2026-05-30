import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="relative bg-gray-200 mt-auto overflow-hidden">

      {/* Footer Card */}
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm px-10 py-10 relative z-10 m-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pb-8">

          {/* Logo + Brand */}
          <div>
            <img src="/logo.png" alt="Movie Space Logo" width={60} height={60} className="mb-3" />
            <p className="text-sm text-gray-500 leading-relaxed">
              Your go-to destination for discovering and exploring movies.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-sm font-semibold text-gray-900 mb-3">Quick Links</h2>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/about" className="hover:text-gray-800 transition-colors">About Us</Link></li>
              <li><Link href="/discover" className="hover:text-gray-800 transition-colors">Discover</Link></li>
              <li><Link href="/policy" className="hover:text-gray-800 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-gray-800 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Placeholder for future column */}
          <div />

        </div>

        {/* Divider */}
        <div className="border-t border-gray-100" />

        {/* Bottom Bar */}
        <div className="pt-6 text-center sm:text-left">
          <p className="text-xs text-gray-400">© 2026 Movie Space. All rights reserved.</p>
        </div>
      </div>

      {/* Background Watermark */}
      <div className="text-center -mt-8">
        <span className="text-[10rem] font-black text-gray-300 select-none leading-none tracking-tight whitespace-nowrap">
          MovieSpace
        </span>
      </div>

    </div>
  );
}