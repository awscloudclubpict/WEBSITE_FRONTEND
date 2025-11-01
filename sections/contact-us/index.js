"use client";
import React, { useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { FaLinkedin, FaInstagram, FaMeetup } from "react-icons/fa";
import emailjs from "@emailjs/browser"; // <-- import EmailJS

export default function ContactUs() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Replace the following with your EmailJS keys
    const SERVICE_ID = "service_xsxyyko";
    const TEMPLATE_ID = "template_3hmj5jo";
    const PUBLIC_KEY = "I-juszNd2s2kQCJCH";

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, formData, PUBLIC_KEY);
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("EmailJS error:", err);
      alert("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Success Modal
  if (submitted) {
    return (
      <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50 p-4">
        <div className="bg-transparent rounded-2xl shadow-xl border border-gray-600 p-8 max-w-md w-full">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-global-4 mb-2">Thank You!</h3>
            <p className="text-global-4 mb-6">
              Your message has been sent successfully. We'll get back to you soon!
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="bg-[#327dd6] text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section
      id="contact"
      className="relative min-h-screen bg-transparent flex items-center section-padding overflow-hidden"
    >
      <img
        src="/images/img_image_10.png"
        alt="Cloud"
        className="absolute top-0 right-0 max-w-[220px] md:max-w-[280px] w-full h-auto opacity-100 pointer-events-none select-none z-0"
        style={{ objectFit: "contain" }}
      />

      <div className="container-custom relative z-10 w-full">
        <div className="flex flex-col max-w-5xl w-full mx-auto space-y-8">
          <div className="text-center space-y-3 px-4">
            <h1 className="text-4xl sm:text-5xl font-bold">
              Get in{" "}
              <span className="bg-gradient-to-r from-[#327ED7] to-[#9E53D1] bg-clip-text text-transparent">
                Touch
              </span>
            </h1>
            <p className="text-2xl sm:text-3xl font-semibold text-gray-300">
              We're here to answer your questions or help you connect
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 md:gap-12 px-4">
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

            <div className="flex-1 w-full md:w-auto max-w-md rounded-2xl p-6 shadow-lg bg-[#060c20]">
              <form className="space-y-6" onSubmit={handleSubmit}>
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
