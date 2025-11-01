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
    <div className="w-full bg-transparent overflow-x-hidden relative min-h-screen">
      {/* Home Section */}
      <button
        onClick={() => {
          localStorage.removeItem("user");
          window.location.href = "/login";
        }}
        className="fixed top-4 right-3 group bg-gray-900/80 hover:bg-gradient-to-r from-red-500 to-red-600 backdrop-blur-sm text-white px-3 hover:px-6 py-3 rounded-full flex items-center transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 border border-[#327ED7] hover:border-red-400 overflow-hidden z-50"
        aria-label="Logout"
      >
        <svg
          className="w-5 h-5 text-[#327ED7] group-hover:text-white transition-all duration-300 group-hover:scale-110"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>

        <span className="text-sm font-semibold text-white max-w-0 overflow-hidden opacity-0 group-hover:max-w-[120px] group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">
          Logout
        </span>
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
