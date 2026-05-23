"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import SearchBar from "./SearchBar";
import React, { useState } from "react";
import AuthButton from "./auth-button";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Discover", href: "/discover" },
  { name: "Reviews", href: "/review" },
  { name: "Recommendation", href: "/recommendation" },
  { name: "Setting", href: "/setting" }, // Dropdown
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#FFB7C5]/70 text-black">
      <div className="flex items-center justify-between px-3 sm:px-6 py-2 sm:py-6 gap-2">
        <div className="flex items-center gap-2 sm:gap-8">
          <Link href="/">
            <img src="/logo.png" alt="logo" width={40} height={40} className="sm:w-[100px] sm:h-[100px]" />
          </Link>
          <Link href="/" className="hidden sm:block">
            <h1 className="text-lg sm:text-xl font-bold">MOVIE SPACE</h1>
          </Link>
        </div>

        {/* Search Bar - Always visible on mobile and desktop */}
        <div className="flex-1 max-w-xs sm:max-w-sm md:max-w-md mx-2 sm:mx-4">
          <SearchBar />
        </div>

        <div className="flex items-center gap-2">
          <button
            className="sm:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <ul className="hidden sm:flex space-x-4 sm:space-x-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            if (link.name === "Setting") {
              return (
                <li key={link.href} className="relative group">
                  <span
                    className={
                      isActive
                        ? "text-lime-800 font-bold border-b-2 border-lime-600 cursor-pointer"
                        : "hover:text-lime-200 transition-colors cursor-pointer"
                    }
                  >
                    {link.name}
                  </span>

                  <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200">
                    <Link
                      href="/profiles"
                      className="block px-2 py-2 hover:bg-gray-200"
                    >
                      Profile
                    </Link>
                    <Link
                      href="/about"
                      className="block px-2 py-2 hover:bg-gray-200"
                    >
                      About
                    </Link>
                    <AuthButton variant="menu" />
                  </div>
                </li>
              );
            }

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={
                    isActive
                      ? "text-lime-400 font-bold border-b-2 "
                      : "hover:text-lime-200 transition-colors"
                  }
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="sm:hidden px-4 py-4 bg-[#FFB7C5]/90 backdrop-blur-sm">
          <ul className="flex flex-col space-y-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              if (link.name === "Setting") {
                return (
                  <li key={link.href}>
                    <span className="font-semibold">{link.name}</span>
                    <div className="ml-4 mt-2 flex flex-col space-y-2">
                      <Link href="/profiles" className="text-sm hover:text-lime-200">
                        Profile
                      </Link>
                      <Link href="/about" className="text-sm hover:text-lime-200">
                        About
                      </Link>
                      <AuthButton variant="menu" />
                    </div>
                  </li>
                );
              }

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={
                      isActive
                        ? "text-lime-800 font-bold"
                        : "hover:text-lime-200 transition-colors"
                    }
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </nav>
  );
}
