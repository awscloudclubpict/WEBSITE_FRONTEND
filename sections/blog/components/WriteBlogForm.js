import React, { useState } from "react";
import { blogAPI, handleApiError } from "../../../utils/api";

const WriteBlogForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    category: "",
    abstract: "",
    additionalInfo: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await blogAPI.sendEmail(formData);
      setSubmitted(true);
    } catch (error) {
      const errorMessage = handleApiError(error, "Failed to send email");
      console.error("Error submitting form:", errorMessage);
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-[#071128] rounded-2xl shadow-xl border border-gray-600 p-8 max-w-md w-full">
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
            <h3 className="text-2xl font-bold text-global-4 mb-2">
              Thank You!
            </h3>
            <p className="text-global-4 mb-6">
              Your blog abstract has been submitted successfully. We'll review
              it and get back to you soon!
            </p>
            <button
              onClick={onClose}
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#071128] rounded-2xl shadow-2xl border border-gray-700 p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-global-4">Write A Blog</h3>
          <button
            onClick={onClose}
            className="text-global-4 hover:text-white text-2xl"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-global-4 mb-2">Your Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
                className="w-full bg-[#060c20] border border-gray-500 rounded-lg px-4 py-3 text-white 
                focus:outline-none focus:border-[#327dd6] hover:border-[#327dd6] transition"
              />
            </div>

            <div>
              <label className="block text-global-4 mb-2">Your Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email address"
                className="w-full bg-[#060c20] border border-gray-500 rounded-lg px-4 py-3 text-white 
                focus:outline-none focus:border-[#327dd6] hover:border-[#327dd6] transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-global-4 mb-2">Blog Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Enter your blog title"
                className="w-full bg-[#060c20] border border-gray-500 rounded-lg px-4 py-3 text-white 
                focus:outline-none focus:border-[#327dd6] hover:border-[#327dd6] transition"
              />
            </div>

            <div>
              <label className="block text-global-4 mb-2">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full bg-[#060c20] border border-gray-500 rounded-lg px-4 py-3 text-white 
                focus:outline-none focus:border-[#327dd6] hover:border-[#327dd6] transition"
              >
                <option value="">Select Category</option>
                <option value="WEB">WEB</option>
                <option value="AI/ML">AI/ML</option>
                <option value="AWS">AWS</option>
                <option value="AI">AI</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-global-4 mb-2">Blog Abstract *</label>
            <textarea
              name="abstract"
              value={formData.abstract}
              onChange={handleChange}
              required
              rows={4}
              placeholder="Provide a brief abstract of your blog (200-300 words)"
              className="w-full bg-[#060c20] border border-gray-500 rounded-lg px-4 py-3 text-white 
              focus:outline-none focus:border-[#327dd6] hover:border-[#327dd6] transition resize-none"
            />
          </div>

          <div>
            <label className="block text-global-4 mb-2">
              Additional Information
            </label>
            <textarea
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
              rows={3}
              placeholder="Any additional details, references, or special requests"
              className="w-full bg-[#060c20] border border-gray-500 rounded-lg px-4 py-3 text-white 
              focus:outline-none focus:border-[#327dd6] hover:border-[#327dd6] transition resize-none"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-[#f4b631] text-global-1 px-6 py-3 rounded-lg hover:bg-yellow-500 disabled:opacity-50 transition-colors font-bold"
            >
              {loading ? "Submitting..." : "Submit Abstract"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WriteBlogForm;
