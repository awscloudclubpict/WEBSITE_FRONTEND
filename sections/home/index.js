"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/login");
  };

  const handleJoinUs = () => {
    window.open("https://www.meetup.com/aws-cloud-club-at-pict/", "_blank");
  };

   const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#060717] text-white font-inter">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-5 sm:px-7 md:px-9 lg:px-13 pt-5 sm:pt-7 md:pt-9">
        {/* Logo Section */}
        <div className="flex flex-col items-center">
          <img
            src="/images/img_th_removebg_preview.png"
            alt="AWS Cloud Club"
            className="h-12 sm:h-13 md:h-15 cursor-pointer"
            onClick={() => scrollToSection("home")}
          />
          <span className="font-semibold text-sm sm:text-base md:text-lg text-[#67a5de] mt-1">
            PICT
          </span>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-5 lg:gap-7 text-base md:text-lg font-medium">
          <li
            className="hover:text-[#327dd6] transition-colors cursor-pointer"
            onClick={() => scrollToSection("home")}
          >
            Home
          </li>
          <li
            className="hover:text-[#327dd6] transition-colors cursor-pointer"
            onClick={() => scrollToSection("about")}
          >
            About
          </li>
          <li
            className="hover:text-[#327dd6] transition-colors cursor-pointer"
            onClick={() => scrollToSection("events")}
          >
            Events
          </li>
          <li
            className="hover:text-[#327dd6] transition-colors cursor-pointer"
            onClick={() => scrollToSection("blogs")}
          >
            Blogs
          </li>
          <li
            className="hover:text-[#327dd6] transition-colors cursor-pointer"
            onClick={() => scrollToSection("members")}
          >
            Members
          </li>
          <li
            className="hover:text-[#327dd6] transition-colors cursor-pointer"
            onClick={() => scrollToSection("contact")}
          >
            Contact Us
          </li>
        </ul>

        <div className="flex items-center gap-4 sm:gap-5">
          {/* Join Us Button (Desktop) */}
          <button
            className="hidden md:block bg-[#327dd6] text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-600 transition-colors text-base md:text-lg whitespace-nowrap"
            onClick={handleJoinUs}
          >
            Join Us
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-[#67a5de]"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              className="w-6 h-6 sm:w-7 sm:h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="md:hidden bg-[#0f172a] rounded-lg mx-5 mt-3 p-5">
          <div className="flex flex-col space-y-4">
            <button
              onClick={() => scrollToSection("home")}
              className="text-white py-2.5 px-5 hover:bg-[#1e293b] rounded transition-colors text-base text-left"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-white py-2.5 px-5 hover:bg-[#1e293b] rounded transition-colors text-base text-left"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("events")}
              className="text-white py-2.5 px-5 hover:bg-[#1e293b] rounded transition-colors text-base text-left"
            >
              Events
            </button>
            <button
              onClick={() => scrollToSection("blogs")}
              className="text-white py-2.5 px-5 hover:bg-[#1e293b] rounded transition-colors text-base text-left"
            >
              Blogs
            </button>
            <button
              onClick={() => scrollToSection("members")}
              className="text-white py-2.5 px-5 hover:bg-[#1e293b] rounded transition-colors text-base text-left"
            >
              Members
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-white py-2.5 px-5 hover:bg-[#1e293b] rounded transition-colors text-base text-left"
            >
              Contact Us
            </button>
            <button
              className="bg-[#327dd6] text-white py-2.5 px-5 rounded font-semibold hover:bg-blue-600 transition-colors mt-2 text-base whitespace-nowrap"
              onClick={handleJoinUs}
            >
              Join Us
            </button>
          </div>
        </div>
      )}
      <div className="h-6 sm:h-7"></div>
      {/* Main Content - Home Section */}
      <main
        id="home"
        className="flex flex-col md:flex-row items-center justify-between px-5 sm:px-7 md:px-9 lg:px-13 py-9 sm:py-13 md:py-17"
      >
        {/* Left Section */}
        <section className="max-w-lg lg:max-w-xl text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#327dd6] mb-4 sm:mb-5 leading-tight">
            Welcome to
            <br />
            AWS Cloud Club
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 sm:mb-5 text-white">
            Empowering Innovators.
            <br />
            Enabling Cloud.
          </h2>
          <p className="text-base sm:text-lg mb-5 sm:mb-7 text-gray-300">
            Join a community of cloud enthusiasts, builders, and learners.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 mb-7 sm:mb-9 justify-center md:justify-start">
            <button
              className="bg-[#327dd6] text-white px-6 py-3 sm:px-7 sm:py-3.5 rounded-lg font-semibold hover:bg-blue-600 transition-colors text-base sm:text-lg whitespace-nowrap"
              onClick={handleGetStarted}
            >
              Get Started
            </button>

            <button
              className="bg-white text-[#060717] px-6 py-3 sm:px-7 sm:py-3.5 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-base sm:text-lg whitespace-nowrap"
              onClick={handleJoinUs}
            >
              Join Us
            </button>
          </div>
          <ul className="space-y-3 sm:space-y-4 mt-5 text-base sm:text-lg md:text-xl text-left">
            <li className="flex items-center text-gray-300">
              <span className="text-[#327dd6] mr-2">✔</span>
              10+ Workshop Hosted
            </li>
            <li className="flex items-center text-gray-300">
              <span className="text-[#327dd6] mr-2">✔</span>
              2000+ Active Members
            </li>
            <li className="flex items-center text-gray-300">
              <span className="text-[#327dd6] mr-2">✔</span>
              Certified AWS Student Ambassadors
            </li>
          </ul>
        </section>

        {/* Right Section */}
        <section className="mt-9 md:mt-0 flex justify-center md:justify-end w-full md:w-auto">
          <img
            src="/images/img_uploading_pana_1.png"
            alt="Cloud Club Illustration"
            className="w-72 sm:w-80 md:w-96 lg:w-[28rem] max-w-full"
          />
        </section>
      </main>
    </div>
  );
}
