'use client';
import "./globals.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import React from "react";
import PropTypes from "prop-types";
import Providers from "../components/providers";
import BackgroundMusic from "../components/BackgroundMusic";
import PageBackground from "../components/PageBackground";
import { usePathname } from "next/navigation";
export default function RootLayout({children}) {
  const pathname = usePathname();
  const hideNavbar = pathname === "/signin" ;
  const hideFooter = pathname === "/signin";
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <PageBackground />
        <Providers>
        { !hideNavbar && <Navbar /> }
        <main>
          {children}
        </main>
        {!hideFooter && <Footer />}
        </Providers>
        <BackgroundMusic />
      </body>
    </html>
  );
 
}
RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
