// import { useState } from 'react';

// export default function Home() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   return (
//     <div className="min-h-screen" style={{background: 'var(--background)'}}>
//       {/* Header Navigation */}
//       <header className="header-nav px-6 py-4 sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto flex items-center justify-between">
//           {/* Logo */}
//           <div className="flex items-center space-x-2">
//             <div className="w-8 h-8 border border-white rounded-lg flex items-center justify-center">
//               <span className="text-white text-sm font-bold">aws</span>
//             </div>
//             <span className="text-white text-sm font-medium">PICT</span>
//           </div>

//           {/* Desktop Navigation - Centered */}
//           <nav className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
//             <a href="#" className="nav-link">Home</a>
//             <a href="#" className="nav-link">About</a>
//             <a href="#" className="nav-link">Events</a>
//             <a href="#" className="nav-link">Blogs</a>
//             <a href="#" className="nav-link">Members</a>
//             <a href="#" className="nav-link">Contact Us</a>
//           </nav>

//           {/* Join Us Button */}
//           <button className="hidden md:block btn-primary">
//             Join Us
//           </button>

//           {/* Mobile Menu Button */}
//           <button 
//             className="md:hidden text-white p-1"
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//           >
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//             </svg>
//           </button>
//         </div>

//         {/* Mobile Navigation */}
//         {isMenuOpen && (
//           <div className="md:hidden mt-4 pb-4 glass-effect rounded-lg p-4">
//             <div className="flex flex-col space-y-4">
//               <a href="#" className="nav-link">Home</a>
//               <a href="#" className="nav-link">About</a>
//               <a href="#" className="nav-link">Events</a>
//               <a href="#" className="nav-link">Blogs</a>
//               <a href="#" className="nav-link">Members</a>
//               <a href="#" className="nav-link">Contact Us</a>
//               <button className="btn-primary w-fit">
//                 Join Us
//               </button>
//             </div>
//           </div>
//         )}
//       </header>

//       {/* Main Content */}
//       <main className="px-6 py-12">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
//             {/* Left Side - Text Content */}
//             <div className="space-y-8">
//               <div className="space-y-4">
//                 <h1 className="hero-title">
//                   <span className="text-white">Welcome to</span>
//                   <br />
//                   <span className="text-gradient">AWS Cloud Club</span>
//                 </h1>
//                 <h2 className="hero-subtitle text-white">
//                   Empowering Innovators.
//                   <br />
//                   Enabling Cloud.
//                 </h2>
//               </div>

//               <p className="hero-description max-w-md">
//                 Join a community of cloud enthusiasts, builders, and learners.
//               </p>

//               <div className="flex flex-col sm:flex-row gap-4">
//                 <button className="btn-primary">
//                   Get Started
//                 </button>
//                 <button className="btn-secondary">
//                   Join Us
//                 </button>
//               </div>

//               {/* Feature List */}
//               <div className="space-y-3">
//                 <div className="feature-item">
//                   <div className="feature-check">
//                     <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                     </svg>
//                   </div>
//                   <span>10+ Workshop Hosted</span>
//                 </div>
//                 <div className="feature-item">
//                   <div className="feature-check">
//                     <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                     </svg>
//                   </div>
//                   <span>2000+ Active Members</span>
//                 </div>
//                 <div className="feature-item">
//                   <div className="feature-check">
//                     <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                     </svg>
//                   </div>
//                   <span>Certified AWS Student Ambassadors</span>
//                 </div>
//               </div>
//             </div>

//             {/* Right Side - Illustration */}
//             <div className="relative flex justify-center lg:justify-end">
//               <div className="illustration-container">
//                 {/* Person Figure */}
//                 <div className="person-figure">
//                   {/* Head */}
//                   <div className="w-20 h-20 bg-[#D4A574] rounded-full relative mb-3">
//                     {/* Hair */}
//                     <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-24 h-14 bg-[#2C1810] rounded-full"></div>
//                     {/* Face */}
//                     <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-14 h-14 bg-white rounded-full"></div>
//                   </div>
                  
//                   {/* Body */}
//                   <div className="w-24 h-28 bg-[#3498DB] rounded-t-3xl relative">
//                     {/* Shirt Pattern */}
//                     <div className="absolute top-3 left-3 w-3 h-3 bg-white rounded-full"></div>
//                     <div className="absolute top-3 right-3 w-3 h-3 bg-white rounded-full"></div>
//                   </div>
                  
//                   {/* Arms */}
//                   <div className="absolute -left-5 top-8 w-8 h-20 bg-[#D4A574] rounded-full transform rotate-12"></div>
//                   <div className="absolute -right-5 top-8 w-8 h-20 bg-[#D4A574] rounded-full transform -rotate-12"></div>
                  
//                   {/* Legs */}
//                   <div className="absolute left-5 top-24 w-7 h-20 bg-[#2C1810] rounded-full"></div>
//                   <div className="absolute right-5 top-24 w-7 h-20 bg-[#2C1810] rounded-full"></div>
//                 </div>

//                 {/* Desk */}
//                 <div className="desk">
//                   {/* Laptop Screen */}
//                   <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-40 h-24 bg-gray-300 rounded-xl">
//                     <div className="w-full h-3 bg-gray-400 rounded-t-xl"></div>
//                   </div>
                  
//                   {/* Desk Items */}
//                   <div className="absolute right-12 top-6 w-8 h-8 bg-[#3498DB] rounded-full"></div>
//                   <div className="absolute right-20 top-8 w-5 h-5 bg-white rounded-sm"></div>
//                   <div className="absolute left-12 top-8 w-5 h-5 bg-white rounded-sm"></div>
//                 </div>

//                 {/* Floating Icons */}
//                 {/* Cloud Icon */}
//                 <div className="floating-icon floating-animation" style={{top: '60px', left: '-40px', width: '48px', height: '48px'}}>
//                   <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
//                     <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
//                   </svg>
//                 </div>

//                 {/* Document Icon */}
//                 <div className="floating-icon floating-animation" style={{top: '120px', right: '-50px', width: '36px', height: '36px', background: 'white'}}>
//                   <svg className="w-5 h-5 text-[#1A1A2E]" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z" clipRule="evenodd" />
//                   </svg>
//                 </div>

//                 {/* Video Play Button */}
//                 <div className="floating-icon floating-animation" style={{top: '180px', right: '-60px', width: '36px', height: '36px'}}>
//                   <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
//                     <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
//                   </svg>
//                 </div>

//                 {/* Image Icon */}
//                 <div className="floating-icon floating-animation" style={{top: '240px', right: '-50px', width: '36px', height: '36px'}}>
//                   <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
//                   </svg>
//                 </div>

//                 {/* Folder Icon */}
//                 <div className="floating-icon floating-animation" style={{top: '300px', right: '-50px', width: '36px', height: '36px'}}>
//                   <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
//                     <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
//                   </svg>
//                 </div>

//                 {/* Music Notes */}
//                 <div className="floating-icon floating-animation" style={{top: '360px', right: '-30px', width: '24px', height: '24px', background: 'transparent'}}>
//                   <svg className="w-full h-full text-black" fill="currentColor" viewBox="0 0 20 20">
//                     <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.369 4.369 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
//                   </svg>
//                 </div>

//                 <div className="floating-icon floating-animation" style={{top: '380px', right: '-50px', width: '24px', height: '24px', background: 'transparent'}}>
//                   <svg className="w-full h-full text-black" fill="currentColor" viewBox="0 0 20 20">
//                     <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.369 4.369 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
//                   </svg>
//                 </div>

//                 {/* White Square Frames on Wall */}
//                 <div className="absolute top-20 right-12 w-16 h-16 border-2 border-white rounded-lg glass-effect"></div>
//                 <div className="absolute top-40 right-16 w-16 h-16 border-2 border-white rounded-lg glass-effect"></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>

//       {/* Bottom Blue Line */}
//       <div className="w-full h-1 bg-[#3498DB]"></div>
//     </div>
//   );
// }
// import { useState } from 'react';

// export default function Home() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   return (
//     <div className="min-h-screen bg-[#1A1A2E]">
//       {/* Header Navigation */}
//       <header className="px-6 py-4 sticky top-0 z-50 bg-[#1A1A2E]/95 backdrop-blur-sm border-b border-white/10">
//         <div className="max-w-7xl mx-auto flex items-center justify-between">
//           {/* Logo */}
//           <div className="flex items-center space-x-2">
//             <div className="w-8 h-8 border border-white rounded-lg flex items-center justify-center">
//               <span className="text-white text-sm font-bold">aws</span>
//             </div>
//             <span className="text-white text-sm font-medium">PICT</span>
//           </div>

//           {/* Desktop Navigation - Centered */}
//           <nav className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
//             <a href="#" className="text-white hover:text-[#3498DB] transition-colors duration-300 font-medium">Home</a>
//             <a href="#" className="text-white hover:text-[#3498DB] transition-colors duration-300 font-medium">About</a>
//             <a href="#" className="text-white hover:text-[#3498DB] transition-colors duration-300 font-medium">Events</a>
//             <a href="#" className="text-white hover:text-[#3498DB] transition-colors duration-300 font-medium">Blogs</a>
//             <a href="#" className="text-white hover:text-[#3498DB] transition-colors duration-300 font-medium">Members</a>
//             <a href="#" className="text-white hover:text-[#3498DB] transition-colors duration-300 font-medium">Contact Us</a>
//           </nav>

//           {/* Join Us Button */}
//           <button className="hidden md:block bg-[#3498DB] hover:bg-[#2980B9] text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:shadow-lg">
//             Join Us
//           </button>

//           {/* Mobile Menu Button */}
//           <button 
//             className="md:hidden text-white p-1"
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//           >
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//             </svg>
//           </button>
//         </div>

//         {/* Mobile Navigation */}
//         {isMenuOpen && (
//           <div className="md:hidden mt-4 pb-4 bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
//             <div className="flex flex-col space-y-4">
//               <a href="#" className="text-white hover:text-[#3498DB] transition-colors">Home</a>
//               <a href="#" className="text-white hover:text-[#3498DB] transition-colors">About</a>
//               <a href="#" className="text-white hover:text-[#3498DB] transition-colors">Events</a>
//               <a href="#" className="text-white hover:text-[#3498DB] transition-colors">Blogs</a>
//               <a href="#" className="text-white hover:text-[#3498DB] transition-colors">Members</a>
//               <a href="#" className="text-white hover:text-[#3498DB] transition-colors">Contact Us</a>
//               <button className="bg-[#3498DB] hover:bg-[#2980B9] text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 w-fit">
//                 Join Us
//               </button>
//             </div>
//           </div>
//         )}
//       </header>

//       {/* Main Content */}
//       <main className="px-6 py-8">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[75vh]">
//             {/* Left Side - Text Content */}
//             <div className="space-y-6">
//               <div className="space-y-3">
//                 <h1 className="text-3xl lg:text-5xl font-bold leading-tight">
//                   <span className="text-white">Welcome to</span>
//                   <br />
//                   <span className="bg-gradient-to-r from-[#3498DB] to-[#5DADE2] bg-clip-text text-transparent">AWS Cloud Club</span>
//                 </h1>
//                 <h2 className="text-lg lg:text-xl font-semibold text-white">
//                   Empowering Innovators.
//                   <br />
//                   Enabling Cloud.
//                 </h2>
//               </div>

//               <p className="text-base text-white/80 max-w-md leading-relaxed">
//                 Join a community of cloud enthusiasts, builders, and learners.
//               </p>

//               <div className="flex flex-col sm:flex-row gap-3">
//                 <button className="bg-[#3498DB] hover:bg-[#2980B9] text-white px-6 py-2.5 rounded-md font-medium text-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
//                   Get Started
//                 </button>
//                 <button className="border border-white text-white hover:bg-white hover:text-[#1A1A2E] px-6 py-2.5 rounded-md font-medium text-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
//                   Join Us
//                 </button>
//               </div>

//               {/* Feature List */}
//               <div className="space-y-2.5">
//                 <div className="flex items-center gap-3">
//                   <div className="w-4 h-4 bg-[#3498DB] rounded-full flex items-center justify-center flex-shrink-0">
//                     <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                     </svg>
//                   </div>
//                   <span className="text-white text-sm">10+ Workshop Hosted</span>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <div className="w-4 h-4 bg-[#3498DB] rounded-full flex items-center justify-center flex-shrink-0">
//                     <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                     </svg>
//                   </div>
//                   <span className="text-white text-sm">2000+ Active Members</span>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <div className="w-4 h-4 bg-[#3498DB] rounded-full flex items-center justify-center flex-shrink-0">
//                     <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                     </svg>
//                   </div>
//                   <span className="text-white text-sm">Certified AWS Student Ambassadors</span>
//                 </div>
//               </div>
//             </div>

//             {/* Right Side - Illustration */}
//             <div className="relative flex justify-center lg:justify-end">
//               <div className="relative w-full max-w-md h-80 bg-gradient-to-br from-[#2C3E50] to-[#34495E] rounded-2xl overflow-visible shadow-2xl">
                
//                 {/* Desk Surface */}
//                 <div className="absolute bottom-0 left-0 w-full h-16 bg-[#34495E] rounded-b-2xl"></div>
                
//                 {/* Person sitting at desk */}
//                 <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
//                   {/* Head */}
//                   <div className="w-10 h-10 bg-[#FDBCB4] rounded-full relative mb-1 mx-auto">
//                     {/* Hair */}
//                     <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-12 h-8 bg-[#8B4513] rounded-full"></div>
//                     {/* Face details */}
//                     <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white rounded-full"></div>
//                   </div>
                  
//                   {/* Body */}
//                   <div className="w-12 h-16 bg-[#3498DB] rounded-t-2xl relative mx-auto">
//                     {/* Shirt details */}
//                     <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-white rounded-full"></div>
//                     <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-white rounded-full"></div>
//                   </div>
                  
//                   {/* Arms */}
//                   <div className="absolute -left-2 top-6 w-4 h-12 bg-[#FDBCB4] rounded-full transform rotate-12"></div>
//                   <div className="absolute -right-2 top-6 w-4 h-12 bg-[#FDBCB4] rounded-full transform -rotate-12"></div>
                  
//                   {/* Legs */}
//                   <div className="absolute left-2 top-12 w-3 h-12 bg-[#2C1810] rounded-full"></div>
//                   <div className="absolute right-2 top-12 w-3 h-12 bg-[#2C1810] rounded-full"></div>
//                 </div>

//                 {/* Laptop on desk */}
//                 <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-20 h-12 bg-gray-800 rounded-lg">
//                   <div className="w-full h-1.5 bg-gray-600 rounded-t-lg"></div>
//                   <div className="mt-0.5 w-16 h-9 bg-gray-300 rounded-md mx-auto"></div>
//                 </div>
                
//                 {/* Desk items */}
//                 <div className="absolute bottom-8 right-6 w-4 h-4 bg-[#3498DB] rounded-full"></div>
//                 <div className="absolute bottom-9 right-9 w-3 h-3 bg-white rounded"></div>
//                 <div className="absolute bottom-9 left-6 w-3 h-3 bg-white rounded"></div>

//                 {/* Floating Icons */}
//                 {/* Cloud Icon */}
//                 <div className="absolute top-8 -left-6 w-10 h-10 bg-[#3498DB] rounded-xl flex items-center justify-center shadow-lg animate-bounce">
//                   <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
//                     <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
//                   </svg>
//                 </div>

//                 {/* Document Icon */}
//                 <div className="absolute top-20 -right-6 w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-lg animate-bounce">
//                   <svg className="w-4 h-4 text-[#1A1A2E]" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z" clipRule="evenodd" />
//                   </svg>
//                 </div>

//                 {/* Video Play Button */}
//                 <div className="absolute top-32 -right-8 w-8 h-8 bg-[#3498DB] rounded-xl flex items-center justify-center shadow-lg animate-bounce">
//                   <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
//                     <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
//                   </svg>
//                 </div>

//                 {/* Image Icon */}
//                 <div className="absolute top-44 -right-6 w-8 h-8 bg-[#3498DB] rounded-xl flex items-center justify-center shadow-lg animate-bounce">
//                   <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
//                   </svg>
//                 </div>

//                 {/* Folder Icon */}
//                 <div className="absolute top-56 -right-6 w-8 h-8 bg-[#3498DB] rounded-xl flex items-center justify-center shadow-lg animate-bounce">
//                   <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
//                     <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
//                   </svg>
//                 </div>

//                 {/* Music Notes */}
//                 <div className="absolute top-64 -right-2 w-6 h-6 bg-transparent flex items-center justify-center animate-bounce">
//                   <svg className="w-5 h-5 text-[#3498DB]" fill="currentColor" viewBox="0 0 20 20">
//                     <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.369 4.369 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
//                   </svg>
//                 </div>

//                 {/* Additional Music Note */}
//                 <div className="absolute bottom-8 -right-6 w-5 h-5 bg-transparent flex items-center justify-center animate-bounce">
//                   <svg className="w-4 h-4 text-[#3498DB]" fill="currentColor" viewBox="0 0 20 20">
//                     <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.369 4.369 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
//                   </svg>
//                 </div>

//                 {/* White Square Frames on Wall */}
//                 <div className="absolute top-12 right-6 w-10 h-10 border-2 border-white/20 rounded-lg bg-white/5 backdrop-blur-sm"></div>
//                 <div className="absolute top-28 right-9 w-10 h-10 border-2 border-white/20 rounded-lg bg-white/5 backdrop-blur-sm"></div>

//                 {/* Plant */}
//                 <div className="absolute bottom-6 right-3 w-4 h-8 bg-green-600 rounded-full"></div>
//                 <div className="absolute bottom-3 right-2 w-6 h-3 bg-orange-800 rounded-full"></div>

//                 {/* Trash bin */}
//                 <div className="absolute bottom-6 left-3 w-4 h-6 bg-gray-600 rounded-sm">
//                   <div className="w-full h-0.5 bg-gray-400 rounded-t-sm"></div>
//                   <div className="mt-0.5 w-3 h-4 bg-gray-700 rounded-sm mx-auto"></div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>

//       {/* Bottom Blue Line */}
//       <div className="w-full h-1 bg-[#3498DB]"></div>
//     </div>
//   );
// }
// import { useState } from 'react';

// export default function Home() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   return (
//     <div className="min-h-screen bg-[#1A1A2E]">
//       {/* Header Navigation */}
//       <header className="px-6 py-4 sticky top-0 z-50 bg-[#1A1A2E]/95 backdrop-blur-sm border-b border-white/10">
//         <div className="max-w-7xl mx-auto flex items-center justify-between">
//           {/* Logo */}
//           <div className="flex items-center space-x-2">
//             <div className="w-8 h-8 border border-white rounded-lg flex items-center justify-center">
//               <span className="text-white text-sm font-bold">aws</span>
//             </div>
//             <span className="text-white text-sm font-medium">PICT</span>
//           </div>
          
//           {/* Centered Navigation */}
//           <nav className="hidden md:flex h-16 items-center justify-center flex-1 gap-10">
//             <a href="#" className="nav-link">Home</a>
//             <a href="#" className="nav-link">About</a>
//             <a href="#" className="nav-link">Events</a>
//             <a href="#" className="nav-link">Blogs</a>
//             <a href="#" className="nav-link">Members</a>
//             <a href="#" className="nav-link">Contact Us</a>
//           </nav>

//           {/* Large "Join Us" Button */}
//           <button className="hidden md:block bg-[#3498DB] hover:bg-[#2980B9] text-white px-8 py-3 rounded-lg font-semibold text-base shadow hover:shadow-lg transition-all duration-300 ml-6">
//             Join Us
//           </button>

//           {/* Mobile Menu Button */}
//           <button
//             className="md:hidden text-white p-2 ml-auto"
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//           >
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//             </svg>
//           </button>
//         </div>

//         {/* Mobile Navigation */}
//         {isMenuOpen && (
//           <div className="md:hidden mt-4 pb-4 bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
//             <div className="flex flex-col space-y-4">
//               <a href="#" className="nav-link">Home</a>
//               <a href="#" className="nav-link">About</a>
//               <a href="#" className="nav-link">Events</a>
//               <a href="#" className="nav-link">Blogs</a>
//               <a href="#" className="nav-link">Members</a>
//               <a href="#" className="nav-link">Contact Us</a>
//               <button className="bg-[#3498DB] hover:bg-[#2980B9] text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 w-fit mt-2">
//                 Join Us
//               </button>
//             </div>
//           </div>
//         )}
//       </header>

//       {/* Main Content */}
//       <main className="px-6 py-14">
//         <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16 min-h-[70vh]">
//           {/* Left Side - Text Content */}
//           <div className="flex-1 space-y-8 w-full lg:max-w-xl">
//             <div className="space-y-4">
//               <h1 className="hero-title">
//                 <span className="text-white">Welcome to</span>
//                 <br />
//                 <span className="text-gradient">AWS Cloud Club</span>
//               </h1>
//               <h2 className="hero-subtitle text-white font-semibold">
//                 Empowering Innovators.<br/>Enabling Cloud.
//               </h2>
//             </div>
//             <p className="hero-description max-w-lg">
//               Join a community of cloud enthusiasts, builders, and learners.
//             </p>

//             {/* Button Group */}
//             <div className="flex flex-wrap gap-5 mt-4">
//               <button className="btn-primary px-7 py-3 text-base font-semibold">
//                 Get Started
//               </button>
//               <button className="btn-secondary px-7 py-3 text-base font-semibold">
//                 Join Us
//               </button>
//             </div>

//             {/* Feature List */}
//             <div className="space-y-4 mt-6">
//               <div className="feature-item">
//                 <div className="feature-check">
//                   <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                   </svg>
//                 </div>
//                 <span>10+ Workshop Hosted</span>
//               </div>
//               <div className="feature-item">
//                 <div className="feature-check">
//                   <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                   </svg>
//                 </div>
//                 <span>2000+ Active Members</span>
//               </div>
//               <div className="feature-item">
//                 <div className="feature-check">
//                   <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                   </svg>
//                 </div>
//                 <span>Certified AWS Student Ambassadors</span>
//               </div>
//             </div>
//           </div>

//           {/* Right Side - Dummy Illustration Placeholder */}
//           <div className="flex-1 w-full flex justify-center items-center">
//             <div className="w-full max-w-md h-96 flex justify-center items-center bg-[#eaf6fe] rounded-2xl shadow-lg">
//               <span className="text-[#3498DB] text-xl font-medium">[Illustration Placeholder]</span>
//             </div>
//           </div>
//         </div>
//       </main>
//       {/* Bottom Blue Line */}
//       <div className="w-full h-1 bg-[#3498DB]"></div>
//     </div>
//   );
// }
import { useState } from 'react';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#1A1A2E]">
      {/* Header Navigation */}
      <header className="px-6 py-4 sticky top-0 z-50 bg-[#1A1A2E]/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 border border-white rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">aws</span>
            </div>
            <span className="text-white text-sm font-medium">PICT</span>
          </div>
          
          {/* Centered Navigation */}
          <nav className="hidden md:flex h-16 items-center justify-center flex-1 gap-10">
            <a href="#" className="nav-link">Home</a>
            <a href="#" className="nav-link">About</a>
            <a href="#" className="nav-link">Events</a>
            <a href="#" className="nav-link">Blogs</a>
            <a href="#" className="nav-link">Members</a>
            <a href="#" className="nav-link">Contact Us</a>
          </nav>

          {/* Large "Join Us" Button */}
          <button className="hidden md:block bg-[#3498DB] hover:bg-[#2980B9] text-white px-8 py-3 rounded-lg font-semibold text-base shadow hover:shadow-lg transition-all duration-300 ml-6">
            Join Us
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2 ml-auto"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
            <div className="flex flex-col space-y-4">
              <a href="#" className="nav-link">Home</a>
              <a href="#" className="nav-link">About</a>
              <a href="#" className="nav-link">Events</a>
              <a href="#" className="nav-link">Blogs</a>
              <a href="#" className="nav-link">Members</a>
              <a href="#" className="nav-link">Contact Us</a>
              <button className="bg-[#3498DB] hover:bg-[#2980B9] text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 w-fit mt-2">
                Join Us
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content with main-wrapper */}
      <main className="px-6 py-14">
        <div className="main-wrapper max-w-7xl mx-auto">
          {/* Left Side - Text Content */}
          <div className="flex-1 space-y-8 w-full lg:max-w-xl">
            <div className="space-y-4">
              <h1 className="hero-title">
                <span className="text-white">Welcome to</span>
                <br />
                <span className="text-gradient">AWS Cloud Club</span>
              </h1>
              <h2 className="hero-subtitle text-white font-semibold">
                Empowering Innovators.<br/>Enabling Cloud.
              </h2>
            </div>

            <p className="hero-description max-w-lg">
              Join a community of cloud enthusiasts, builders, and learners.
            </p>

            {/* Button Group */}
            <div className="flex flex-wrap gap-5 mt-4">
              <button className="btn-primary px-7 py-3 text-base font-semibold">
                Get Started
              </button>
              <button className="btn-secondary px-7 py-3 text-base font-semibold">
                Join Us
              </button>
            </div>

            {/* Feature List */}
            <div className="space-y-4 mt-6">
              <div className="feature-item">
                <div className="feature-check">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>10+ Workshop Hosted</span>
              </div>
              <div className="feature-item">
                <div className="feature-check">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>2000+ Active Members</span>
              </div>
              <div className="feature-item">
                <div className="feature-check">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>Certified AWS Student Ambassadors</span>
              </div>
            </div>
          </div>

          {/* Right Side - Dummy Illustration Placeholder */}
          <div className="flex-1 w-full flex justify-center items-center">
            <div className="w-full max-w-md h-96 flex justify-center items-center bg-[#eaf6fe] rounded-2xl shadow-lg">
              <span className="text-[#3498DB] text-xl font-medium">[Illustration Placeholder]</span>
            </div>
          </div>
        </div>
      </main>
      
      {/* Bottom Blue Line */}
      <div className="w-full h-1 bg-[#3498DB]"></div>
    </div>
  );
}
