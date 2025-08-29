"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import GradientText from "../magicui/TextAnimations/GradientText/GradientText";

const Hero = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center bg-black text-white pb-16 pt-8 bg-[url(https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/bg-gradient-3.svg)] bg-center bg-cover">
      {/* Navbar */}
      <nav className="flex items-center border mx-4 max-md:w-full max-md:justify-between border-slate-700 px-6 py-4 rounded-full text-white text-sm">
        {/* Logo */}
     <Link href="/" className="flex items-center">
  <Image
    src="/mainicon.png"  // Adjust the file extension if different (.svg, .jpg, etc.)
    alt="Prep.io Logo"
    width={50}
    height={50}
    className="hover:scale-105 transition-transform duration-300"
  />
</Link>
    

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 ml-7">
          {["Products", "Stories", "Pricing"].map((item) => (
            <a key={item} href="#" className="relative overflow-hidden h-6 group">
              <span className="block group-hover:-translate-y-full transition-transform duration-300">
                {item}
              </span>
              <span className="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300">
                {item}
              </span>
            </a>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden ml-14 md:flex items-center gap-4">
          <button className="border border-slate-600 hover:bg-slate-800 px-4 py-2 rounded-full text-sm font-medium transition">
            Contact
          </button>
         <Link href="/interview"> <button className="bg-white hover:shadow-[0px_0px_30px_14px] shadow-[0px_0px_30px_7px] hover:shadow-white/50 shadow-white/50 text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-100 transition duration-300">
            Start An Interview
          </button></Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="md:hidden text-gray-600"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="absolute top-0 left-0 bg-black w-full h-full flex flex-col items-center justify-center gap-4 text-base">
            {["Products", "Customer Stories", "Pricing", "Docs"].map((item) => (
              <a
                key={item}
                href="#"
                onClick={() => setMenuOpen(false)}
                className="hover:text-indigo-600"
              >
                {item}
              </a>
            ))}
            <button
              onClick={() => setMenuOpen(false)}
              className="border border-slate-600 hover:bg-slate-800 px-4 py-2 rounded-full text-sm font-medium transition"
            >
              Contact
            </button>
            <button
              onClick={() => setMenuOpen(false)}
              className="bg-white hover:shadow-[0px_0px_30px_14px] shadow-[0px_0px_30px_7px] hover:shadow-white/50 shadow-white/50 text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-100 transition duration-300"
            >
              Get Started
            </button>
          </div>
        )}
      </nav>

      {/* Hero Content */}
      <div className="flex items-center gap-2 border border-white/15 rounded-full px-4 py-2 text-sm mt-24">
        <p>Explore how we help grow brands.</p>
        <a href="#" className="flex items-center gap-1 font-medium">
          Read more
          <svg
            className="mt-0.5"
            width="19"
            height="19"
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.959 9.5h11.083m0 0L9.501 3.96m5.541 5.54-5.541 5.542"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>

      <h1 className="text-4xl md:text-6xl text-center font-semibold max-w-3xl mt-5 bg-gradient-to-r from-white to-[#748298] text-transparent bg-clip-text">
      Master Your Next <br/>
        Interview with 
        <br/><span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 text-transparent bg-clip-text">
    AI Powered Practice
    </span>
      </h1>
      <p className="text-slate-300 md:text-base line-clamp-3 max-md:px-2 text-center max-w-2xl mt-3">
        Simulate real interviews, receive instant AI-driven feedback, and boost your confidence before facing recruiters.
      </p>
{/* <h1 className="text-5xl md:text-7xl text-center font-bold max-w-4xl mt-10 leading-tight">
  <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400 text-transparent bg-clip-text">
    Mock Interviews,<br />
    <span className="bg-gradient-to-r from-white via-blue-300 to-cyan-200 text-transparent bg-clip-text">
      Real Feedback,
    </span><br />
    <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 text-transparent bg-clip-text">
      Instant Growth.
    </span>
  </span>
</h1> */}
      {/* Buttons */}
      <div className="grid grid-cols-2 gap-2 mt-8 text-sm">
      <Link href="/interview">
        <button className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 transition rounded-full">
          Get Started
        </button></Link>
        {/* add a demo video here or documnetation link */}
        <button className="flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-6 py-3">
          <span>Learn More</span>
          <svg
            className="mt-0.5"
            width="6"
            height="8"
            viewBox="0 0 6 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.25.5 4.75 4l-3.5 3.5"
              stroke="currentColor"
              strokeOpacity=".4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Images */}
     
    </section>
  );
};

export default Hero;
