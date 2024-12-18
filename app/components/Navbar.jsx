'use client';

import React from "react";
import Background from "./Background";
import Link from "next/link";

function Navbar() {
  return (
    <header className="absolute top-0 z-10 w-full">
      <div className="relative mx-auto lg:w-2/3 lg:rounded-xl">
        <Background />
        <nav className="lg:w-2/3 mx-auto mt-2 lg:rounded-xl lg:px-4 bg-black lg:bg-transparent">
          <div className="flex flex-wrap items-center justify-between max-w-screen-xl mx-auto p-4">
            {/* Logo Section */}
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                be<span className="text-blue-500">R</span>ich
                <span className="text-sm absolute lg:-translate-y-1/6 text-blue-400">
                  .Library
                </span>
              </span>
            </div>
            {/* Navigation Links */}
            <div className="flex space-x-4">
              <Link href="/" className="text-white hover:text-blue-500">
                Home
              </Link>
              <Link href="/docs" className="text-white hover:text-blue-500">
                Docs
              </Link>
              <Link href="/others" className="text-white hover:text-blue-500">
                Others
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
