import React, { useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { FaLinkedin, FaInstagram, FaMeetup } from "react-icons/fa";

export default function ContactUs() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Message sent!\nName: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`);
    setFormData({ name: "", email: "", message: "" }); // Reset form
  };

  return (
    <div
      className="relative min-h-screen flex justify-center items-start text-white p-6"
      style={{
        background:
          "radial-gradient(circle at left bottom, #060717 70%, #11133B 100%, #327ED7 100%)",
      }}
    >
      {/* Cloud Image */}
      <img
        src="/image10.svg"
        alt="Cloud"
        className="absolute -top-0 right-50 w-42 h-auto opacity-100"
      />

      <div className="flex flex-col max-w-5xl w-full relative space-y-6">
        {/* Top Title Section */}
        <div className="relative text-center space-y-4">
          <h1 className="text-5xl font-bold relative inline-block">
            Get in{" "}
            <span className="bg-gradient-to-r from-[#327ED7] to-[#9E53D1] bg-clip-text text-transparent relative">
              Touch
            </span>
          </h1>
          <p className="text-xl text-gray-300">
            We’re here to answer your questions or help you connect
          </p>
          <p className="text-xl text-gray-300">help you connect</p>
        </div>

        {/* Contact + Form Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
          {/* Left Side - Contact Info */}
          <div className="flex-1 space-y-6 flex flex-col justify-center text-base">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <Phone className="text-purple-400 w-5 h-5" />
                <span className="text-lg">+91 9090909090</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="text-purple-400 w-5 h-5" />
                <span className="text-lg">PICT Campus, Pune, Maharashtra</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="text-purple-400 w-5 h-5" />
                <span className="text-lg">awscloudclub@pict.edu</span>
              </div>
            </div>

            <div className="flex space-x-7 text-2xl mt-4">
              <a
                href="https://www.linkedin.com/company/aws-cloud-club-pict/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin className="cursor-pointer hover:text-purple-400" />
              </a>
              <a
                href="https://www.instagram.com/awscloudclubs.pict/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="cursor-pointer hover:text-purple-400" />
              </a>
              <a
                href="https://www.meetup.com/aws-cloud-club-at-pict/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaMeetup className="cursor-pointer hover:text-purple-400" />
              </a>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="flex-1 w-full md:w-auto max-w-md rounded-2xl p-6 shadow-lg bg-[linear-gradient(to_bottom,_#071128_70%,_#07073b_100%)]">
            <form className="space-y-3" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your name"
                className="w-full p-3 rounded-lg text-base bg-[linear-gradient(to_bottom,_#071128_100%,_#01254e_0%)] border border-indigo-900"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your email"
                className="w-full p-3 rounded-lg text-base bg-[linear-gradient(to_bottom,_#071128_100%,_#01254e_0%)] border border-indigo-900"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <textarea
                name="message"
                placeholder="Message"
                className="w-full p-3 h-32 rounded-lg text-base bg-[linear-gradient(to_bottom,_#071128_100%,_#01254e_0%)] border border-indigo-900"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>

              <button
                type="submit"
                className="w-full p-3 bg-yellow-400 text-black font-bold rounded-lg"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
