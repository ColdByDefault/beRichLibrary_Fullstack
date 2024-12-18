export const initializeCanvas = (
    canvas,
    starCount = 100,
    speed = 0.3,
    maxDepth = 30,
    starSizes = [0.3, 0.5, 0.7, 1, 1.2], // Array of star sizes
    flashIntensity = 50, // Intensity multiplier for the flash
    flashDuration = 500, // Duration of the flash in milliseconds
    flashInterval = 300 // Minimum interval between flashes in milliseconds
  ) => {
    const ctx = canvas.getContext("2d");
    const stars = [];
    let flashingStarIndex = null;
  
    // Create a star with a size picked from the array
    const createStar = () => {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const z = Math.random() * maxDepth;
      const size = starSizes[Math.floor(Math.random() * starSizes.length)];
      const dx = (Math.random() - 0.5) * speed * (z / maxDepth);
      const dy = (Math.random() - 0.5) * speed * (z / maxDepth);
      return { x, y, dx, dy, z, size, shine: 1 }; // Shine controls brightness
    };
  
    const drawStar = (star) => {
      ctx.beginPath();
      const adjustedSize = star.size * (star.z / maxDepth);
      ctx.arc(star.x, star.y, adjustedSize, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(184, 227, 255, ${star.shine})`;
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
  
    const initializeStars = () => {
      for (let i = 0; i < starCount; i++) {
        stars.push(createStar());
      }
    };
  
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((star, index) => {
        if (index === flashingStarIndex) {
          // Apply the flash effect
          star.shine = flashIntensity;
        } else {
          // Reset shine
          star.shine = 1;
        }
        drawStar(star);
        updateStar(star);
      });
      requestAnimationFrame(animate);
    };
  
    // Handle random star flash
    const flashRandomStar = () => {
      flashingStarIndex = Math.floor(Math.random() * stars.length);
      setTimeout(() => {
        flashingStarIndex = null; // Reset flash effect
      }, flashDuration);
  
      // Schedule the next flash
      setTimeout(flashRandomStar, flashInterval + Math.random() * flashInterval);
    };
  
    // Initialize canvas and start animation
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
    initializeStars();
    animate();
    flashRandomStar(); // Start the flashing effect
  };
  