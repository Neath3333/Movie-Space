import "./globals.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import React from "react";
import PropTypes from "prop-types";
import Providers from "../components/providers";
import BackgroundMusic from "../components/BackgroundMusic";
export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body>
        <Providers>
        <Navbar />
        <main className="container mx-auto px-2 py-8">
          {children}
        </main>
        <Footer />
        </Providers>
        <BackgroundMusic />
      </body>
    </html>
  );
 
}
RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
