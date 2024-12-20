// Code: Navbar component for the website
// related files: app/utils/starsAnimation.js
// responsive, Burger menu, page transition, and stars animation
// stars Animation copyrights: ColdByDefault 

'use client';

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { initializeCanvas } from "../utils/starsAnimation"; 
import { Menu, X } from 'lucide-react';

function Navbar() {

  const links = [
    { label: "Intro", path: "/pages/intro" },
    { label: "Account", path: "/pages/signup" },
  ];


  const canvasRef = useRef(null);
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      initializeCanvas(canvas);
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

    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };


  return (
    <header className="absolute top-0 z-10 w-full pt-4">
      <div className="relative mx-auto lg:w-2/3 lg:rounded-xl">
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full 
          h-full z-[-1] lg:rounded-xl bg-black"></canvas>
        <nav className="relative z-10 lg:w-2/3 mx-auto mt-2 lg:rounded-xl lg:px-4 bg-black/50 lg:bg-transparent">
          <div className="flex items-center justify-between max-w-screen-xl mx-auto p-4">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
                be<span className="text-blue-500">R</span>ich
                <span className="text-sm absolute lg:-translate-y-1/6 text-blue-400">
                  .Library
                </span>
              </span>
            </div>
            <button
              className="lg:hidden p-2 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation menu">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div
              className={`${
                isMenuOpen ? "flex" : "hidden"
              } absolute top-full left-0 right-0 lg:static lg:flex flex-col lg:flex-row w-full lg:w-auto 
              bg-black/50 backdrop-blur-sm lg:bg-transparent`}>
              <div className="flex flex-col lg:flex-row lg:space-x-8 p-4 lg:p-0">
                {links.map(({ label, path }) => (
                  <a
                    key={label}
                    href={path}
                    className="text-white hover:text-blue-500 py-2 lg:py-0 transition-colors duration-200 ease-in-out"
                    onClick={(e) => handleLinkClick(e, path)}
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;

