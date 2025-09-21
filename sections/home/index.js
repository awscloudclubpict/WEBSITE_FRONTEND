import { useState } from 'react';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#1A1A2E] text-white">
      {/* Header Navigation */}
      <header className="bg-[#1A1A2E] px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 border-2 border-white rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">aws</span>
            </div>
            <span className="text-white text-sm">PICT</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-white hover:text-blue-400 transition-colors">Home</a>
            <a href="#" className="text-white hover:text-blue-400 transition-colors">About</a>
            <a href="#" className="text-white hover:text-blue-400 transition-colors">Events</a>
            <a href="#" className="text-white hover:text-blue-400 transition-colors">Blogs</a>
            <a href="#" className="text-white hover:text-blue-400 transition-colors">Members</a>
            <a href="#" className="text-white hover:text-blue-400 transition-colors">Contact Us</a>
          </nav>

          {/* Join Us Button */}
          <button className="hidden md:block bg-[#3498DB] text-white px-6 py-2 rounded-lg hover:bg-[#2980B9] transition-colors">
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
      <main className="px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold">
                  <span className="text-white">Welcome to</span>
                  <br />
                  <span className="text-[#3498DB]">AWS Cloud Club</span>
                </h1>
                <h2 className="text-2xl lg:text-3xl font-bold text-white">
                  Empowering Innovators.
                  <br />
                  Enabling Cloud.
                </h2>
              </div>

              <p className="text-lg text-white/90 max-w-lg">
                Join a community of cloud enthusiasts, builders, and learners.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-[#3498DB] text-white px-8 py-3 rounded-lg hover:bg-[#2980B9] transition-colors font-medium">
                  Get Started
                </button>
                <button className="bg-white text-[#1A1A2E] px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium">
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
              <div className="relative w-full max-w-md">
                {/* Person Working Illustration */}
                <div className="relative">
                  {/* Desk */}
                  <div className="w-full h-32 bg-gray-600 rounded-lg relative">
                    {/* Laptop */}
                    <div className="absolute left-1/2 top-4 transform -translate-x-1/2 w-24 h-16 bg-gray-300 rounded-sm">
                      <div className="w-full h-2 bg-gray-400 rounded-sm"></div>
                    </div>
                    
                    {/* Person */}
                    <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                      {/* Head */}
                      <div className="w-8 h-8 bg-[#FFDBAC] rounded-full relative">
                        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-[#2C1810] rounded-full"></div>
                      </div>
                      {/* Body */}
                      <div className="w-12 h-16 bg-[#3498DB] rounded-t-lg relative -mt-1">
                        <div className="absolute top-2 left-1 w-2 h-2 bg-white rounded-full"></div>
                        <div className="absolute top-2 right-1 w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      {/* Arms */}
                      <div className="absolute -left-2 top-4 w-3 h-8 bg-[#FFDBAC] rounded-full"></div>
                      <div className="absolute -right-2 top-4 w-3 h-8 bg-[#FFDBAC] rounded-full"></div>
                      {/* Legs */}
                      <div className="absolute left-2 top-12 w-3 h-8 bg-[#2C1810] rounded-full"></div>
                      <div className="absolute right-2 top-12 w-3 h-8 bg-[#2C1810] rounded-full"></div>
                    </div>

                    {/* Desk Items */}
                    <div className="absolute right-4 top-4 w-4 h-4 bg-[#3498DB] rounded-full"></div>
                    <div className="absolute right-8 top-6 w-3 h-3 bg-white rounded-sm"></div>
                    <div className="absolute left-4 top-6 w-3 h-3 bg-white rounded-sm"></div>
                  </div>

                  {/* Floating Icons */}
                  <div className="absolute -top-8 -left-4 w-8 h-8 bg-[#3498DB] rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                    </svg>
                  </div>

                  <div className="absolute -top-4 -right-8 w-6 h-6 bg-[#3498DB] rounded flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z" clipRule="evenodd" />
                    </svg>
                  </div>

                  <div className="absolute top-4 -right-12 w-4 h-4 bg-white rounded flex items-center justify-center">
                    <svg className="w-3 h-3 text-[#1A1A2E]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z" clipRule="evenodd" />
                    </svg>
                  </div>

                  <div className="absolute top-8 -right-16 w-4 h-4 bg-[#3498DB] rounded flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                    </svg>
                  </div>

                  <div className="absolute top-12 -right-8 w-4 h-4 bg-[#3498DB] rounded flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                  </div>

                  <div className="absolute top-16 -right-12 w-4 h-4 bg-white rounded flex items-center justify-center">
                    <svg className="w-3 h-3 text-[#1A1A2E]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>

                  <div className="absolute top-20 -right-16 w-4 h-4 bg-white rounded flex items-center justify-center">
                    <svg className="w-3 h-3 text-[#1A1A2E]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z" clipRule="evenodd" />
                    </svg>
                  </div>

                  {/* Music Notes */}
                  <div className="absolute top-24 -right-8 w-3 h-3 text-black">
                    <svg className="w-full h-full" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.369 4.369 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                    </svg>
                  </div>

                  <div className="absolute top-28 -right-12 w-3 h-3 text-black">
                    <svg className="w-full h-full" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.369 4.369 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
