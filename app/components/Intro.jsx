// app/components/NewComp.jsx
import React from 'react';

function Intro () {
    return (
        <div className="relative w-full h-screen pt-32 flex items-center justify-center overflow-hidden">
            {/* Text Content with 3D Effect */}
            <div className="text-black text-center z-20 px-4">
                <h4 className="uppercase text-sm tracking-wider mb-2">Exclusive Window</h4>
                <h1 className="text-3xl lg:text-5xl font-bold mb-4" style={{ transform: "translateZ(20px)" }}>
                    beRich<span className="text-blue-800">Hub</span><span className="text-sm">v3.1.1=&gt;</span><br />
                    <span className="text-blue-800">&#123;Digital Library&#125;</span>
                </h1>
                <p className="text-black text-sm mb-6 max-w-2xl mx-auto" style={{ textShadow: "0px 2px 10px #5b7080f1" }}>
                    This is my personal hub where I upload documentation, books, and learning materials tailored for software developers.
                    As I progress in my academic journey, I share my experiences, roadmaps, and curated resources to inspire and support others in their learning.
                </p>
                <div className="flex space-x-4 justify-center">
                    <a href="/signup"
                        className="bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-300 transition"
                        style={{ transform: "translateZ(30px)" }}>
                        Get Started
                    </a>
                    <a href="https://github.com/ColdByDefault/beRichLibrary_Fullstack"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-transparent border border-white font-semibold text-white py-3 px-6 
                        rounded-lg hover:bg-white hover:text-black transition"
                        style={{ transform: "translateZ(30px)" }}>
                        See Source Code
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Intro;
