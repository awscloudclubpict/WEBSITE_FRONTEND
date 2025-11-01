"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    // Auto-play video when component mounts
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Autoplay prevented:", error);
      });
    }
  }, []);

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

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  return (
    <div className="min-h-screen bg-transparent text-white font-inter overflow-x-hidden">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-5 sm:px-7 md:px-9 lg:px-13 pt-5 sm:pt-7 md:pt-9 max-w-[1400px] mx-auto">
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
        className="flex flex-col md:flex-row items-center justify-between px-5 sm:px-7 md:px-9 lg:px-13 py-9 sm:py-13 md:py-17 max-w-[1400px] mx-auto"
      >
        {/* Left Section */}
        <section className="max-w-lg lg:max-w-xl text-center md:text-left mb-8 md:mb-0">
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

        {/* Right Section with Animated Video */}
        <section className="flex justify-center md:justify-end w-full md:w-auto relative">
          {/* Floating Clouds Animation */}
          <div className="absolute -top-4 -right-4 w-20 h-20 opacity-60 animate-float-slow z-10">
            <div className="w-full h-full bg-gradient-to-br from-white to-blue-100 rounded-full blur-lg"></div>
          </div>
          <div className="absolute -bottom-6 -left-6 w-16 h-16 opacity-50 animate-float-medium z-10">
            <div className="w-full h-full bg-gradient-to-br from-white to-blue-200 rounded-full blur-md"></div>
          </div>
          <div className="absolute top-1/2 -right-8 w-12 h-12 opacity-40 animate-float-fast z-10">
            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-white rounded-full blur-md"></div>
          </div>

          {/* Video Container with Frame */}
          <div className="relative">
            {/* Outer Frame */}
            <div className="relative p-4 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-3xl shadow-2xl backdrop-blur-sm shadow-blue-400/10">
              {/* Inner Frame */}
              <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-3 shadow-inner shadow-blue-300/5">
                {/* Main Video Container */}
                <div className={`relative rounded-xl overflow-hidden transform transition-all duration-1000 ${
                  isVideoLoaded 
                    ? 'scale-100 opacity-100' 
                    : 'scale-90 opacity-0'
                }`}>
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    onLoadedData={handleVideoLoad}
                    className="w-full h-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px] lg:max-w-[400px] max-h-[280px] sm:max-h-[320px] md:max-h-[360px] lg:max-h-[400px] object-cover rounded-xl"
                    style={{ aspectRatio: "1/1" }}
                    poster="/images/video-poster.jpg"
                  >
                    <source src="/videos/IMG_5161.MOV" type="video/mp4" />
                    <source src="/videos/IMG_5161.webm" type="video/webm" />
                    Your browser does not support the video tag.
                  </video>
                  
                  {/* Video Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 via-transparent to-purple-500/10 rounded-xl pointer-events-none"></div>
                </div>
              </div>

              {/* Floating particles */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full animate-ping"></div>
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            </div>

            {/* Enhanced Loading State */}
            {!isVideoLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl backdrop-blur-sm">
                <div className="flex flex-col items-center space-y-4">
                  {/* AWS-inspired Cloud Loading Animation */}
                  <div className="relative">
                    {/* Cloud Base */}
                    <div className="w-16 h-8 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full shadow-lg shadow-blue-500/30"></div>
                    {/* Cloud Bumps */}
                    <div className="absolute -top-3 left-2 w-10 h-10 bg-gradient-to-r from-blue-300 to-blue-500 rounded-full shadow-lg shadow-blue-400/40"></div>
                    <div className="absolute -top-4 right-3 w-8 h-8 bg-gradient-to-r from-blue-200 to-blue-400 rounded-full shadow-lg shadow-blue-300/50"></div>
                    
                    {/* Moving Element */}
                    <div className="absolute -top-2 -left-2 w-6 h-6 bg-gradient-to-r from-[#327dd6] to-blue-400 rounded-full animate-bounce shadow-lg shadow-blue-500/50">
                      <div className="w-2 h-2 bg-white rounded-full absolute top-1 left-1 opacity-70"></div>
                    </div>
                  </div>

                  {/* Loading Text with Dots Animation */}
                  <div className="text-center">
                    <p className="text-blue-400 font-semibold text-sm mb-1">Loading Experience</p>
                    <div className="flex justify-center space-x-1">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-0"></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-150"></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-300"></div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-32 h-1 bg-blue-900/30 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-400 to-[#327dd6] rounded-full animate-progress"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          33% { transform: translateY(-10px) translateX(5px) rotate(120deg); }
          66% { transform: translateY(5px) translateX(-5px) rotate(240deg); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          33% { transform: translateY(-8px) translateX(-3px) rotate(120deg); }
          66% { transform: translateY(3px) translateX(8px) rotate(240deg); }
        }
        @keyframes float-fast {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          33% { transform: translateY(-5px) translateX(2px) rotate(120deg); }
          66% { transform: translateY(2px) translateX(-2px) rotate(240deg); }
        }
        @keyframes progress {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        .animate-float-medium {
          animation: float-medium 6s ease-in-out infinite;
        }
        .animate-float-fast {
          animation: float-fast 4s ease-in-out infinite;
        }
        .animate-progress {
          animation: progress 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}