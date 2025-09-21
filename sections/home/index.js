import { useState } from "react";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Function to handle smooth scrolling to sections
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false); // Close mobile menu after clicking
  };

  return (
    <div className="min-h-screen bg-[#060717] text-white font-inter">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 pt-4 sm:pt-6 md:pt-8">
        {/* Logo Section */}
        <div className="flex flex-col items-center">
          <img
            src="/images/img_th_removebg_preview.png"
            alt="AWS Cloud Club"
            className="h-10 sm:h-12 md:h-14 cursor-pointer"
            onClick={() => scrollToSection("home")}
          />
          <span className="font-semibold text-xs sm:text-sm md:text-base text-[#67a5de] mt-1">
            PICT
          </span>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-4 lg:gap-6 text-sm md:text-base font-medium">
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

        <div className="flex items-center gap-3 sm:gap-4">
          {/* Join Us Button (Desktop) */}
          <button className="hidden md:block bg-[#327dd6] text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors text-sm md:text-base whitespace-nowrap">
            Join Us
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-[#67a5de]"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
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
        <div className="md:hidden bg-[#0f172a] rounded-lg mx-4 mt-2 p-4">
          <div className="flex flex-col space-y-3">
            <button
              onClick={() => scrollToSection("home")}
              className="text-white py-2 px-4 hover:bg-[#1e293b] rounded transition-colors text-sm text-left"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-white py-2 px-4 hover:bg-[#1e293b] rounded transition-colors text-sm text-left"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("events")}
              className="text-white py-2 px-4 hover:bg-[#1e293b] rounded transition-colors text-sm text-left"
            >
              Events
            </button>
            <button
              onClick={() => scrollToSection("blogs")}
              className="text-white py-2 px-4 hover:bg-[#1e293b] rounded transition-colors text-sm text-left"
            >
              Blogs
            </button>
            <button
              onClick={() => scrollToSection("members")}
              className="text-white py-2 px-4 hover:bg-[#1e293b] rounded transition-colors text-sm text-left"
            >
              Members
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-white py-2 px-4 hover:bg-[#1e293b] rounded transition-colors text-sm text-left"
            >
              Contact Us
            </button>
            <button className="bg-[#327dd6] text-white py-2 px-4 rounded font-semibold hover:bg-blue-600 transition-colors mt-2 text-sm whitespace-nowrap">
              Join Us
            </button>
          </div>
        </div>
      )}

      {/* Main Content - Home Section */}
      <main id="home" className="flex flex-col md:flex-row items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-16">
        {/* Left Section */}
        <section className="max-w-md lg:max-w-lg text-center md:text-left">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#327dd6] mb-3 sm:mb-4 leading-tight">
            Welcome to
            <br />
            AWS Cloud Club
          </h1>
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4 text-white">
            Empowering Innovators.
            <br />
            Enabling Cloud.
          </h2>
          <p className="text-sm sm:text-base mb-4 sm:mb-6 text-gray-300">
            Join a community of cloud enthusiasts, builders, and learners.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8 justify-center md:justify-start">
            <button className="bg-[#327dd6] text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors text-sm sm:text-base whitespace-nowrap">
              Get Started
            </button>
            <button className="bg-white text-[#060717] px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm sm:text-base whitespace-nowrap">
              Join Us
            </button>
          </div>
          <ul className="space-y-2 sm:space-y-3 mt-4 text-xs sm:text-sm md:text-base">
            <li className="flex items-center justify-center md:justify-start text-gray-300">
              <span className="text-[#327dd6] mr-2">✔</span>
              10+ Workshop Hosted
            </li>
            <li className="flex items-center justify-center md:justify-start text-gray-300">
              <span className="text-[#327dd6] mr-2">✔</span>
              2000+ Active Members
            </li>
            <li className="flex items-center justify-center md:justify-start text-gray-300">
              <span className="text-[#327dd6] mr-2">✔</span>
              Certified AWS Student Ambassadors
            </li>
          </ul>
        </section>

        {/* Right Section */}
        <section className="mt-8 md:mt-0 flex justify-center md:justify-end w-full md:w-auto">
          <img
            src="/images/img_uploading_pana_1.png"
            alt="Cloud Club Illustration"
            className="w-56 sm:w-64 md:w-72 lg:w-80 max-w-full"
          />
        </section>
      </main>
    </div>
  );
}