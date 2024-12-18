'use client';

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { initializeCanvas } from "../utils/starsAnimation"; // Adjust the path as needed

function Navbar() {
  const canvasRef = useRef(null);
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      initializeCanvas(canvas); // Pass the canvas to the utility function
    }
  }, []);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    const pageContent = document.getElementById("page-content");
    if (pageContent) {
      pageContent.classList.add("page-transition-exit");
    }

    setTimeout(() => {
      router.push(href);

      setTimeout(() => {
        if (pageContent) {
          pageContent.classList.remove("page-transition-exit");
          pageContent.classList.add("page-transition-enter");
        }
      }, 50);
    }, 400);

    setIsMenuOpen(false); // Close menu after navigation
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className="absolute top-0 z-10 w-full pt-4">
      <div className="relative mx-auto lg:w-2/3 lg:rounded-xl">
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full z-[-1] rounded-xl"
        ></canvas>
        <nav className="relative z-10 lg:w-2/3 mx-auto mt-2 lg:rounded-xl lg:px-4 bg-black lg:bg-transparent">
          <div className="flex flex-wrap items-center justify-between max-w-screen-xl mx-auto p-4">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                be<span className="text-blue-500">R</span>ich
                <span className="text-sm absolute lg:-translate-y-1/6 text-blue-400">
                  .Library
                </span>
              </span>
            </div>
            {/* Burger Menu Button */}
            <button
              className="inline-flex items-center p-2 text-sm text-white rounded-lg lg:hidden hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
              onClick={toggleMenu}
              aria-label="Toggle navigation menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
            {/* Navigation Links */}
            <div
                className={`${
                  isMenuOpen ? "block" : "hidden"
                } w-full lg:flex lg:w-auto`}
              >
                <div className="flex flex-col lg:flex-row lg:space-x-4">
                  <a
                    href="/"
                    className="text-white hover:text-blue-500 px-4 py-2"
                    onClick={(e) => handleLinkClick(e, "/")}
                  >
                    Home
                  </a>
                  <a
                    href="/docs"
                    className="text-white hover:text-blue-500 px-4 py-2"
                    onClick={(e) => handleLinkClick(e, "/docs")}
                  >
                    Docs
                  </a>
                  <a
                    href="/others"
                    className="text-white hover:text-blue-500 px-4 py-2"
                    onClick={(e) => handleLinkClick(e, "/others")}
                  >
                    Others
                  </a>
                  <a
                    href="/signup"
                    className="text-white hover:text-blue-500 px-4 py-2 font-semibold"
                    onClick={(e) => handleLinkClick(e, "/signup")}
                  >
                    Sign Up
                  </a>
                </div>
              </div>

          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
