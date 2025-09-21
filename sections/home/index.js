import { useState } from 'react';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen hero-gradient text-white">
      {/* Header Navigation */}
      <header className="bg-[#1A1A2E] px-8 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 border-2 border-white rounded-lg flex items-center justify-center">
              <span className="text-white text-lg font-bold">aws</span>
            </div>
            <span className="text-white text-lg font-medium">PICT</span>
          </div>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden md:flex items-center space-x-10 absolute left-1/2 transform -translate-x-1/2">
            <a href="#" className="text-white hover:text-blue-400 transition-colors text-lg font-medium">Home</a>
            <a href="#" className="text-white hover:text-blue-400 transition-colors text-lg font-medium">About</a>
            <a href="#" className="text-white hover:text-blue-400 transition-colors text-lg font-medium">Events</a>
            <a href="#" className="text-white hover:text-blue-400 transition-colors text-lg font-medium">Blogs</a>
            <a href="#" className="text-white hover:text-blue-400 transition-colors text-lg font-medium">Members</a>
            <a href="#" className="text-white hover:text-blue-400 transition-colors text-lg font-medium">Contact Us</a>
          </nav>

          {/* Join Us Button */}
          <button className="hidden md:block bg-[#3498DB] text-white px-8 py-3 rounded-lg hover:bg-[#2980B9] transition-colors font-medium text-lg">
            Join Us
          </button>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              <a href="#" className="text-white hover:text-blue-400 transition-colors">Home</a>
              <a href="#" className="text-white hover:text-blue-400 transition-colors">About</a>
              <a href="#" className="text-white hover:text-blue-400 transition-colors">Events</a>
              <a href="#" className="text-white hover:text-blue-400 transition-colors">Blogs</a>
              <a href="#" className="text-white hover:text-blue-400 transition-colors">Members</a>
              <a href="#" className="text-white hover:text-blue-400 transition-colors">Contact Us</a>
              <button className="bg-[#3498DB] text-white px-6 py-2 rounded-lg hover:bg-[#2980B9] transition-colors w-fit">
                Join Us
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
            {/* Left Side - Text Content */}
            <div className="space-y-10">
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-shadow">
                  <span className="text-white">Welcome to</span>
                  <br />
                  <span className="text-[#3498DB]">AWS Cloud Club</span>
                </h1>
                <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight text-shadow">
                  Empowering Innovators.
                  <br />
                  Enabling Cloud.
                </h2>
              </div>

              <p className="text-xl text-white/90 max-w-lg leading-relaxed">
                Join a community of cloud enthusiasts, builders, and learners.
              </p>

              <div className="flex flex-col sm:flex-row gap-6">
                <button className="bg-[#3498DB] text-white px-10 py-4 rounded-lg hover:bg-[#2980B9] transition-colors font-semibold text-lg">
                  Get Started
                </button>
                <button className="border-2 border-white text-white px-10 py-4 rounded-lg hover:bg-white hover:text-[#1A1A2E] transition-colors font-semibold text-lg">
                  Join Us
                </button>
              </div>

              {/* Feature List */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-[#3498DB] rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-white">10+ Workshop Hosted</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-[#3498DB] rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-white">2000+ Active Members</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-[#3498DB] rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-white">Certified AWS Student Ambassadors</span>
                </div>
              </div>
            </div>

            {/* Right Side - Illustration */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-lg h-[500px]">
                {/* Main Illustration Container */}
                <div className="relative w-full h-full illustration-shadow">
                  {/* Background Wall */}
                  <div className="absolute inset-0 bg-gray-800 rounded-2xl"></div>
                  
                  {/* Person Figure */}
                  <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
                    {/* Head */}
                    <div className="w-16 h-16 bg-[#D4A574] rounded-full relative mb-2">
                      {/* Hair */}
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-20 h-12 bg-[#2C1810] rounded-full"></div>
                      {/* Face */}
                      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-white rounded-full"></div>
                    </div>
                    
                    {/* Body */}
                    <div className="w-20 h-24 bg-[#3498DB] rounded-t-2xl relative">
                      {/* Shirt Pattern */}
                      <div className="absolute top-2 left-2 w-2 h-2 bg-white rounded-full"></div>
                      <div className="absolute top-2 right-2 w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    
                    {/* Arms */}
                    <div className="absolute -left-4 top-6 w-6 h-16 bg-[#D4A574] rounded-full transform rotate-12"></div>
                    <div className="absolute -right-4 top-6 w-6 h-16 bg-[#D4A574] rounded-full transform -rotate-12"></div>
                    
                    {/* Legs */}
                    <div className="absolute left-4 top-20 w-6 h-16 bg-[#2C1810] rounded-full"></div>
                    <div className="absolute right-4 top-20 w-6 h-16 bg-[#2C1810] rounded-full"></div>
                  </div>

                  {/* Desk/Laptop */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-80 h-20 bg-gray-600 rounded-t-2xl">
                    {/* Laptop Screen */}
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-32 h-20 bg-gray-300 rounded-lg">
                      <div className="w-full h-2 bg-gray-400 rounded-t-lg"></div>
                    </div>
                    
                    {/* Desk Items */}
                    <div className="absolute right-8 top-4 w-6 h-6 bg-[#3498DB] rounded-full"></div>
                    <div className="absolute right-16 top-6 w-4 h-4 bg-white rounded-sm"></div>
                    <div className="absolute left-8 top-6 w-4 h-4 bg-white rounded-sm"></div>
                  </div>

                  {/* Floating Icons */}
                  {/* Cloud Icon */}
                  <div className="absolute top-8 -left-8 w-12 h-12 bg-[#3498DB] rounded-xl flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
                    </svg>
                  </div>

                  {/* Document Icon */}
                  <div className="absolute top-16 -right-12 w-8 h-8 bg-white rounded flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#1A1A2E]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z" clipRule="evenodd" />
                    </svg>
                  </div>

                  {/* Video Play Button */}
                  <div className="absolute top-24 -right-20 w-8 h-8 bg-[#3498DB] rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                    </svg>
                  </div>

                  {/* Image Icon */}
                  <div className="absolute top-32 -right-16 w-8 h-8 bg-[#3498DB] rounded flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                  </div>

                  {/* Folder Icon */}
                  <div className="absolute top-40 -right-12 w-8 h-8 bg-[#3498DB] rounded flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                    </svg>
                  </div>

                  {/* Music Notes */}
                  <div className="absolute top-48 -right-8 w-6 h-6 text-black">
                    <svg className="w-full h-full" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.369 4.369 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                    </svg>
                  </div>

                  <div className="absolute top-52 -right-16 w-6 h-6 text-black">
                    <svg className="w-full h-full" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.369 4.369 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                    </svg>
                  </div>

                  {/* White Square Frames on Wall */}
                  <div className="absolute top-16 right-8 w-12 h-12 border-2 border-white rounded"></div>
                  <div className="absolute top-32 right-12 w-12 h-12 border-2 border-white rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Blue Line */}
      <div className="w-full h-1 bg-[#3498DB]"></div>
    </div>
  );
}
