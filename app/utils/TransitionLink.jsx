'use client';

import Link from 'next/link';
import React from 'react';

export default function TransitionLink({ children, href, ...props }) {
  const handleClick = (e) => {
    e.preventDefault(); // Prevent default navigation

    // Trigger your custom transition effect
    const pageContent = document.getElementById("page-content");
    if (pageContent) {
      pageContent.classList.add("page-transition");
    }

    setTimeout(() => {
      // Navigate after transition
      window.location.href = href;
    }, 300); // Match transition duration
  };

  return (
    <Link href={href} {...props} onClick={handleClick}>
      {children}
    </Link>
  );
}
