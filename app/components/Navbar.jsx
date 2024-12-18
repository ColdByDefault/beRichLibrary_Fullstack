'use client';

import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation"; // For programmatic navigation

function Navbar() {
  const canvasRef = useRef(null);
  const router = useRouter();

  // Background Animation Logic
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const starCount = 150;
    const stars = [];
    const speed = 0.3;
    const maxDepth = 50;

    const createStar = () => {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const z = Math.random() * maxDepth;
      const dx = (Math.random() - 0.5) * speed * (z / maxDepth);
      const dy = (Math.random() - 0.5) * speed * (z / maxDepth);
      return { x, y, dx, dy, z };
    };

    const initializeStars = () => {
      for (let i = 0; i < starCount; i++) {
        stars.push(createStar());
      }
    };

    const drawStar = (star) => {
      ctx.beginPath();
      const adjustedSize = 1 * (star.z / maxDepth);
      ctx.arc(star.x, star.y, adjustedSize, 0, Math.PI * 2);
      ctx.fillStyle = "#b8e3ff";
      ctx.fill();
      ctx.closePath();
    };

    const updateStar = (star) => {
      star.x += star.dx;
      star.y += star.dy;

      if (star.x > canvas.width) star.x = 0;
      if (star.x < 0) star.x = canvas.width;
      if (star.y > canvas.height) star.y = 0;
      if (star.y < 0) star.y = canvas.height;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((star) => {
        drawStar(star);
        updateStar(star);
      });
      requestAnimationFrame(animate);
    };

    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
    initializeStars();
    animate();
  }, []);

  // Page Transition Logic
  const handleLinkClick = (e, href) => {
    e.preventDefault();
  
    const pageContent = document.getElementById("page-content");
    if (pageContent) {
      // Add exit animation
      pageContent.classList.add("page-transition-exit");
    }
  
    setTimeout(() => {
      // Navigate using router.push
      router.push(href);
  
      // Reset transition class on navigation
      setTimeout(() => {
        if (pageContent) {
          pageContent.classList.remove("page-transition-exit");
          pageContent.classList.add("page-transition-enter");
        }
      }, 50); // Small delay for entering animation
    }, 400); // Match the exit animation duration
  };
  

  return (
    <header className="absolute top-0 z-10 w-full">
      {/* Background Canvas */}
      <div className="relative mx-auto lg:w-2/3 lg:rounded-xl">
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full z-[-1] rounded-xl"
        ></canvas>

        {/* Navbar Content */}
        <nav className="relative z-10 lg:w-2/3 mx-auto mt-2 lg:rounded-xl lg:px-4 bg-black lg:bg-transparent">
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
              <a
                href="/"
                className="text-white hover:text-blue-500"
                onClick={(e) => handleLinkClick(e, "/")}
              >
                Home
              </a>
              <a
                href="/docs"
                className="text-white hover:text-blue-500"
                onClick={(e) => handleLinkClick(e, "/docs")}
              >
                Docs
              </a>
              <a
                href="/others"
                className="text-white hover:text-blue-500"
                onClick={(e) => handleLinkClick(e, "/others")}
              >
                Others
              </a>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
