import React, { useState } from 'react';

const WriteBlogForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    title: '',
    abstract: '',
    category: '',
    customCategory: '',
    additionalInfo: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [showCustomCategory, setShowCustomCategory] = useState(false);

  const categories = ['WEB', 'AI/ML', 'AWS', 'AI', 'Cloud Computing', 'Data Science', 'Other'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'category') {
      const showCustom = value === 'Other';
      setShowCustomCategory(showCustom);
      
      // Reset custom category when switching away from "Other"
      if (!showCustom) {
        setFormData(prev => ({ ...prev, category: value, customCategory: '' }));
      } else {
        setFormData(prev => ({ ...prev, category: value }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    if (error) setError('');
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      return 'Please enter your name';
    }
    if (!formData.email.trim()) {
      return 'Please enter your email address';
    }
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return 'Please enter a valid email address';
    }
    if (!formData.title.trim()) {
      return 'Please enter a blog title';
    }
    if (!formData.category) {
      return 'Please select a category';
    }
    if (formData.category === 'Other' && !formData.customCategory.trim()) {
      return 'Please enter your custom category';
    }
    if (!formData.abstract.trim()) {
      return 'Please provide a blog abstract';
    }
    if (formData.abstract.trim().length < 50) {
      return 'Blog abstract should be at least 50 characters long';
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validate form before submission
      const validationError = validateForm();
      if (validationError) {
        throw new Error(validationError);
      }

      console.log("Submitting formData:", formData); 
      
      // Prepare data with final category
      const finalCategory = formData.category === 'Other' ? formData.customCategory : formData.category;
      
      const emailData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        title: formData.title.trim(),
        abstract: formData.abstract.trim(),
        category: finalCategory,
        additionalInfo: formData.additionalInfo?.trim() || ""
      };

      console.log("Sending email data:", emailData);

      const response = await fetch("http://localhost:3001/blogs/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emailData),
      });

      console.log("Response status:", response.status);

      // Handle different response types
      if (!response.ok) {
        let errorMessage = `Submission failed (Status: ${response.status})`;
        
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorData.message || errorMessage;
        } catch {
          const errorText = await response.text();
          if (errorText) errorMessage = errorText;
        }
        
        throw new Error(errorMessage);
      }

      const result = await response.json();
      console.log("Success response:", result);

      if (result.error) {
        throw new Error(result.error);
      }

      // Success - show confirmation
      setSubmitted(true);
      
    } catch (error) {
      console.error("Error submitting form:", error);
      
      // User-friendly error messages
      let userErrorMessage = "Failed to submit your blog abstract. ";
      
      if (error.message.includes('network') || error.message.includes('fetch')) {
        userErrorMessage += "Please check your internet connection and try again.";
      } else if (error.message.includes('500')) {
        userErrorMessage += "Our server is temporarily unavailable. Please try again in a few minutes.";
      } else {
        userErrorMessage += error.message;
      }
      
      setError(userErrorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Professional Success Modal
  if (submitted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-auto transform transition-all duration-300 scale-100">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-t-2xl p-6 text-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg className="w-10 h-10 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Submission Received!</h3>
            <p className="text-green-100 text-lg">
              Thank you for your interest in writing for us
            </p>
          </div>
          
          {/* Body */}
          <div className="p-6 text-center">
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-center space-x-2 text-gray-600">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm">We'll review your abstract within 2-3 business days</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-gray-600">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-sm">You'll hear from us at <strong>{formData.email}</strong></span>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 transform hover:scale-105 active:scale-95"
            >
              Got it, thanks!
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#071128] rounded-2xl shadow-2xl border border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-600">
          <div>
            <h3 className="text-2xl font-bold text-white">Write A Blog</h3>
            <p className="text-gray-400 text-sm mt-1">Share your knowledge with our community</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl transition-colors duration-200"
          >
            &times;
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {/* Error Display */}
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500 rounded-lg animate-pulse">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-0.5">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-400">
                      Please check your submission
                    </h3>
                    <div className="mt-1 text-sm text-red-300">
                      <p>{error}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full bg-[#060c20] border border-gray-600 rounded-lg px-4 py-3 text-white 
                    focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className="w-full bg-[#060c20] border border-gray-600 rounded-lg px-4 py-3 text-white 
                    focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Blog Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Blog Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    placeholder="An Introduction to Cloud Computing"
                    className="w-full bg-[#060c20] border border-gray-600 rounded-lg px-4 py-3 text-white 
                    focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#060c20] border border-gray-600 rounded-lg px-4 py-3 text-white 
                    focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                    disabled={loading}
                  >
                    <option value="">Choose a category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  
                  {/* Custom Category Input */}
                  {showCustomCategory && (
                    <div className="mt-3 animate-fadeIn">
                      <input
                        type="text"
                        name="customCategory"
                        value={formData.customCategory}
                        onChange={handleChange}
                        required
                        placeholder="Enter your category"
                        className="w-full bg-[#060c20] border border-blue-500 rounded-lg px-4 py-3 text-white 
                        focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                        disabled={loading}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Abstract */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Blog Abstract *
                  <span className="text-gray-500 text-xs font-normal ml-2">
                    (Minimum 50 characters)
                  </span>
                </label>
                <textarea
                  name="abstract"
                  value={formData.abstract}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Provide a detailed abstract of your blog post."
                  className="w-full bg-[#060c20] border border-gray-600 rounded-lg px-4 py-3 text-white 
                  focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 resize-none"
                  disabled={loading}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>{formData.abstract.length} characters</span>
                  <span className={formData.abstract.length < 50 ? 'text-red-400' : 'text-green-400'}>
                    {formData.abstract.length < 50 ? 'Minimum 50 characters required' : 'Good length'}
                  </span>
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Additional Information
                  <span className="text-gray-500 text-xs font-normal ml-2">(Optional)</span>
                </label>
                <textarea
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Any specific requirements, references or special notes for our editorial team..."
                  className="w-full bg-[#060c20] border border-gray-600 rounded-lg px-4 py-3 text-white 
                  focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 resize-none"
                  disabled={loading}
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-700">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-gray-900 font-bold py-3 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-900" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    'Submit'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteBlogForm;