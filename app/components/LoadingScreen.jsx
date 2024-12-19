// Code to display a loading screen with a glitch effect
// Related file: app/components/LoadingScreen.jsx
// app/loading/page.jsx
// app/styles/glitchEffect.css
// Only appears the first time the user visits the site

'use client';

import React, { useEffect, useState } from "react";
import "../styles/glitchEffect.css";

const chars = "-sd_sdf~`gdf!@#dfg$g%gh^&qwe*fdg()+sdf=[]{fg}|sad;:,.<>?";

const TextEncrypted = ({ text, interval = 50 }) => {
  const [outputText, setOutputText] = useState("");

  useEffect(() => {
    let timer;

    if (outputText !== text) {
      timer = setInterval(() => {
        if (outputText.length < text.length) {
          setOutputText((prev) => prev + text[prev.length]);
        } else {
          clearInterval(timer);
        }
      }, interval);
    }

    return () => clearInterval(timer);
  }, [text, interval, outputText]);

  const remainder =
    outputText.length < text.length
      ? text
          .slice(outputText.length)
          .split("")
          .map(() => chars[Math.floor(Math.random() * chars.length)]).join("")
      : "";

  return (
    <span
      className="glitch-effect"
      data-text={`${outputText}${remainder}`}>
      {outputText}
      {remainder}
    </span>
  );
};

function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem("hasLoaded");
    if (!hasLoaded) {
      setIsVisible(true);
      sessionStorage.setItem("hasLoaded", "true");
    }
  }, []);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 3200); // Adjust duration as needed
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  if (!isVisible) {
    return null; // Stop rendering the loading screen after it is hidden
  }

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-black flex flex-col items-center justify-center z-50">
      <h1 className="text-xl mb-8 font-bold drop-shadow-black">
        <TextEncrypted text="beRichLibrary" interval={120} />
      </h1>
    </div>
  );
}

export default LoadingScreen;
