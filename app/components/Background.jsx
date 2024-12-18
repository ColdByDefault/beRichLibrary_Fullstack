'use client'
import React, { useRef, useEffect } from "react";

const Background = () => {
    const canvasRef = useRef(null);
  
    useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
  
      const starCount = 150; // Adjust for density
      const stars = [];
      const speed = 0.3; // Adjust for movement speed
      const maxDepth = 50;
      const sizes = [0.5, 1, 1.5]; // Different sizes for variety
      let shiningStarIndex = -1; // Tracks the currently shining star
  
      const createStar = () => {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const z = Math.random() * maxDepth;
        const dx = (Math.random() - 0.5) * speed * (z / maxDepth);
        const dy = (Math.random() - 0.5) * speed * (z / maxDepth);
        const size = sizes[Math.floor(Math.random() * sizes.length)];
        return { x, y, dx, dy, z, size, shineFactor: 1 };
      };
  
      const initializeStars = () => {
        stars.length = 0;
        for (let i = 0; i < starCount; i++) {
          stars.push(createStar());
        }
      };
  
      const drawStar = (star, isShining) => {
        ctx.beginPath();
        const adjustedRadius = star.size * (star.z / maxDepth) * star.shineFactor;
        ctx.arc(star.x, star.y, adjustedRadius, 0, Math.PI);
        ctx.fillStyle = isShining ? "#ffffff" : "#b8e3ff"; // White for shining star
        ctx.shadowBlur = isShining ? 10 : 5; // Glow intensity for shining stars
        ctx.shadowColor = isShining ? "#0582dbf1" : "transparent"; // High-opacity glow
        ctx.fill();
        ctx.closePath();
      };
  
      const updateStar = (star) => {
        // Move the star
        star.x += star.dx;
        star.y += star.dy;
  
        // Wrap stars around screen edges
        if (star.x > canvas.width) star.x = 0;
        if (star.x < 0) star.x = canvas.width;
        if (star.y > canvas.height) star.y = 0;
        if (star.y < 0) star.y = canvas.height;
      };
  
      const selectShiningStar = () => {
        // Reset the previous shining star
        if (shiningStarIndex >= 0) {
          stars[shiningStarIndex].shineFactor = 1;
        }
  
        // Select a new random star to shine
        shiningStarIndex = Math.floor(Math.random() * stars.length);
        const shiningStar = stars[shiningStarIndex];
        shiningStar.shineFactor = 2; // Increase the size of the star while shining
      };
  
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach((star, index) => {
          const isShining = index === shiningStarIndex;
          drawStar(star, isShining);
          updateStar(star);
        });
        requestAnimationFrame(animate);
      };
  
      // Set canvas size and initialize stars
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
      initializeStars();
  
      // Start animation
      animate();
  
      // Handle one shining star at a time
      const shineInterval = setInterval(() => {
        selectShiningStar();
      }, 500); // Change star every second
  
      return () => {
        clearInterval(shineInterval);
      };
    }, []);
  
    return (
      <canvas
        ref={canvasRef}
        className="hidden lg:block lg:absolute lg:top-0 lg:mx-auto lg:w-full lg:h-full lg:z-[-1] lg:bg-black lg:rounded-xl"
      />
    );
  };
  
  export default Background;
  