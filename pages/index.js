import React from 'react';
import BlogSection from '../sections/blog';
import HomeSection from '../sections/home';
// Import other sections as needed

export default function Home() {
  return (
    <div className="w-full bg-[#060717] overflow-x-hidden relative min-h-screen">
      {/* Home Section with ID */}
      <div id="home">
        <HomeSection />
      </div>
      
      {/* Add IDs to other sections */}
      <div id="about">
        {/* <AboutSection /> */}
      </div>
      
      <div id="events">
        {/* <EventsSection /> */}
      </div>
      
      <div id="blogs">
        <BlogSection />
      </div>
      
      <div id="members">
        {/* <MembersSection /> */}
      </div>
      
      <div id="contact">
        {/* <ContactSection /> */}
      </div>
    </div>
  );
}