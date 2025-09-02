"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import GradientText from "../magicui/TextAnimations/GradientText/GradientText";
import { signOut } from "@/lib/actions/auth.action";

const Hero = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  async function handleLogout() {
    await signOut();      // remove cookie on server
    router.push("/sign-in"); // redirect to login page
  }
const navItems = [
  { label: "Your Interviews", href: "#your-interviews" },
  { label: "Stories", href: "#stories" },
  { label: "Latest Hiring", href: "#latest-hiring" },
];
  return (
  <section className="relative w-full flex flex-col items-center bg-gradient-to-t from-black to-gray-900 text-white 
  py-16 md:min-h-screen md:py-10 px-4 bg-center bg-cover">

      {/* Logout Button - Absolute Top Right */}
      <button
        onClick={handleLogout}
        className="absolute top-6 right-8 z-20 px-6 py-2 font-bold text-sm bg-indigo-600 hover:bg-indigo-700 rounded-full
          transition-all duration-300 hover:scale-105 
          hover:shadow-lg hover:shadow-indigo-500/50
          active:scale-95 active:shadow-none
          flex items-center gap-2"
      >
        <span>Logout</span>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
      </button>

      {/* Navbar */}
      <div className="flex flex-row">
        <nav className=" flex items-center border mx-4 max-md:w-full max-md:justify-between border-slate-700 px-6 py-4 rounded-full text-white text-sm">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/mainicon.png"
              alt="Prep.io Logo"
              width={50}
              height={50}
              className="hover:scale-105 transition-transform duration-300"
            />
          </Link>


          {/* Desktop Menu */}
       <div className="hidden md:flex items-center gap-6 ml-7">
  {navItems.map((item) => (
    <a
      key={item.label}
      href={item.href}
      className="relative overflow-hidden h-6 group"
    >
      <span className="block group-hover:-translate-y-full transition-transform duration-300">
        {item.label}
      </span>
      <span className="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300">
        {item.label}
      </span>
    </a>
  ))}
</div>


          {/* Desktop Buttons */}
          <div className="hidden ml-14 md:flex items-center gap-4">
            <Link href="#footer-link">
            <button  className="border border-slate-600 hover:bg-slate-800 px-4 py-2 rounded-full text-sm font-medium transition">
              Contact
            </button></Link>
            <Link href="/interview">
              <button className="bg-white hover:shadow-[0px_0px_30px_14px] shadow-[0px_0px_30px_7px] hover:shadow-white/50 shadow-white/50 text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-100 transition duration-300">
                Start An Interview
              </button>
            </Link>
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
         {/* Mobile Menu */}
{menuOpen && (
  <div className="absolute top-0 left-0 bg-black w-full h-full flex flex-col items-center justify-center gap-6 text-lg">
    {navItems.map((item) => (
      <a
        key={item.label}
        href={item.href}
        onClick={() => setMenuOpen(false)} // close menu on click
        className="hover:text-indigo-400 transition"
      >
        {item.label}
      </a>
    ))}

    <Link href="#footer-link"><button
      onClick={() => setMenuOpen(false)}
      className="border border-slate-600 hover:bg-slate-800 px-4 py-2 rounded-full text-sm font-medium transition"
    >
      Contact
    </button></Link>
   <Link href="/interview">
    <button
      onClick={() => setMenuOpen(false)}
      
      className="bg-white hover:shadow-[0px_0px_30px_14px] shadow-[0px_0px_30px_7px] hover:shadow-white/50 shadow-white/50 text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-100 transition duration-300"
    >
      Get Started
    </button></Link>
  </div>
)}

        </nav>
      </div>

      {/* Hero Content */}
      <div className="flex items-center    px-4 py-2 text-sm mt-24">
       
      
      </div>

      <h1 className="text-4xl md:text-6xl text-center font-semibold max-w-3xl mt-5 bg-gradient-to-r from-white to-[#748298] text-transparent bg-clip-text">
        Master Your Next <br />
        Interview with
        <br /><span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 text-transparent bg-clip-text">
          AI Powered Practice
        </span>
      </h1>
      <p className="text-slate-300 md:text-base line-clamp-3 max-md:px-2 text-center max-w-2xl mt-3">
        Simulate real interviews, receive instant AI-driven feedback, and boost your confidence before facing recruiters.
      </p>

      {/* Buttons */}
      <div className="grid grid-cols-2 gap-2 mt-8 text-sm">
        <Link href="#start">
          <button className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 transition rounded-full">
            Get Started
          </button>
        </Link>
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
    </section>
  );
};
export default Hero;