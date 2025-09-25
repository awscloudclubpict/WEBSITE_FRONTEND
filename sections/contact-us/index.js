"use client";
import React, { useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { FaLinkedin, FaInstagram, FaMeetup } from "react-icons/fa";
import emailjs from "@emailjs/browser";

export default function ContactUs() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        formData,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      )
      .then((result) => {
        alert("Message sent successfully!");
        console.log("EmailJS Result:", result.text);
      })
      .catch((error) => {
        alert("Failed to send message. Please try again later.");
        console.error("EmailJS Error:", error.text || error);
      })
      .finally(() => {
        setLoading(false);
        setFormData({ name: "", email: "", message: "" });
      });
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen bg-global-1 flex items-center section-padding overflow-hidden"
    >
      {/* Cloud Image */}
      <img
        src="/images/img_image_10.png"
        alt="Cloud"
        className="absolute top-0 right-0 max-w-[220px] md:max-w-[280px] w-full h-auto opacity-100 pointer-events-none select-none z-0"
        style={{ objectFit: "contain" }}
      />

      <div className="container-custom relative z-10 w-full">
        <div className="flex flex-col max-w-5xl w-full mx-auto space-y-8">
          {/* Top Title Section */}
          <div className="text-center space-y-3 px-4">
            <h1 className="text-4xl sm:text-5xl font-bold">
              Get in{" "}
              <span className="bg-gradient-to-r from-[#327ED7] to-[#9E53D1] bg-clip-text text-transparent">
                Touch
              </span>
            </h1>
            <p className="text-2xl sm:text-3xl font-semibold text-gray-300">
              We’re here to answer your questions or help you connect
            </p>
          </div>

          {/* Contact + Form Section */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 px-4">
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
            <div className="flex-1 w-full md:w-auto max-w-md rounded-2xl p-6 shadow-lg bg-[#060c20]">
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Name Field */}
                <div className="flex flex-col">
                  <label className="mb-1 text-gray-300 font-medium">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    className="w-full p-3 rounded-lg text-base bg-[#071128] border border-indigo-900 focus:outline-none focus:border-purple-400"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Email Field */}
                <div className="flex flex-col">
                  <label className="mb-1 text-gray-300 font-medium">Your Email</label>
                  <input
                    type="email"
                    name="email"
                    className="w-full p-3 rounded-lg text-base bg-[#071128] border border-indigo-900 focus:outline-none focus:border-purple-400"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Message Field */}
                <div className="flex flex-col">
                  <label className="mb-1 text-gray-300 font-medium">Message</label>
                  <textarea
                    name="message"
                    className="w-full p-3 h-32 rounded-lg text-base bg-[#071128] border border-indigo-900 focus:outline-none focus:border-purple-400"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full p-3 bg-yellow-400 text-black font-bold rounded-lg disabled:opacity-70"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
