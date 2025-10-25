import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import EventSection from "../sections/event"; // Import the EventSection
import AboutSection from "../sections/about"; // Import the AboutSection
import HomeSection from "../sections/home"; // Import the HomeSection
import MemberSection from "../sections/members"; // Import the MemberSection
import BlogSection from "../sections/blog"; // Import the BlogSection
import ContactSection from "../sections/contact-us"; // Import the ContactSection
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className="w-full bg-[#060717] overflow-x-hidden relative min-h-screen">
      {/* Home Section with ID */}
      <div id="home">
        <HomeSection />
      </div>
      
      {/* Add IDs to other sections */}
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
