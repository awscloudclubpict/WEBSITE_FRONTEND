"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import EventSection from "../sections/event";
import AboutSection from "../sections/about";
import HomeSection from "../sections/home";
import MemberSection from "../sections/members";
import BlogSection from "../sections/blog";
import ContactSection from "../sections/contact-us";

export default function Home() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      router.push("/login");   
    } else {
      const user = JSON.parse(storedUser);
      console.log("Logged-in User Details:", user);
      console.log("Role:", user.role);
      setIsChecking(false);    
    }
  }, [router]);

  if (isChecking) {
    return (
      <div className="text-white flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full bg-[#060717] overflow-x-hidden relative min-h-screen">
      {/* Home Section */}
       <button
  onClick={() => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  }}
  className="fixed top-4 right-4 group bg-transparent hover:bg-gradient-to-r from-red-500 to-red-600 text-gray-400 hover:text-white px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 border border-gray-600 hover:border-red-500"
>
  <svg 
    className="w-4 h-4 transform group-hover:rotate-180 transition-transform duration-300" 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
    />
  </svg>
  <span className="font-medium">Logout</span>
</button>
      <div id="home">
        <HomeSection />
      </div>

      <div id="about">
        <AboutSection />
      </div>

      <div id="events">
        <EventSection />
      </div>

      <div id="blogs">
        <BlogSection />
      </div>

      <div id="members">
        <MemberSection />
      </div>

      <div id="contact">
        <ContactSection />
      </div>
    </div>
  );
}
