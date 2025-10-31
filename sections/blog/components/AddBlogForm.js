import React, { useState } from 'react';
import { BlogLoader } from '../api/loader';

const AddBlogForm = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    author_name: '',
    author_profile_url: '',
    short_description: '',
    tags: '',
    customCategory: '',
    publish_date: '',
    share_url: ''
  });
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [showCustomCategory, setShowCustomCategory] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({}); // For field-specific errors

  const categories = ['WEB', 'AI/ML', 'AWS', 'AI', 'Cloud Computing', 'Data Science', 'tech', 'Other'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'tags') {
      const showCustom = value === 'Other';
      setShowCustomCategory(showCustom);
      
      // Reset custom category when switching away from "Other"
      if (!showCustom) {
        setFormData(prev => ({ ...prev, tags: value, customCategory: '' }));
      } else {
        setFormData(prev => ({ ...prev, tags: value }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear errors when user starts typing
    if (error) setError('');
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailImage(file);
      
      // Create image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
    
    // Clear file errors
    if (error) setError('');
    if (fieldErrors.thumbnail_image) {
      setFieldErrors(prev => ({ ...prev, thumbnail_image: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.title.trim()) {
      errors.title = 'Please enter a blog title';
    } else if (formData.title.trim().length < 3) {
      errors.title = 'Blog title should be at least 3 characters long';
    }
    
    if (!formData.author_name.trim()) {
      errors.author_name = 'Please enter author name';
    } else if (formData.author_name.trim().length < 2) {
      errors.author_name = 'Author name should be at least 2 characters long';
    }
    
    if (!formData.short_description.trim()) {
      errors.short_description = 'Please provide a short description';
    } else if (formData.short_description.trim().length < 10) {
      errors.short_description = 'Short description should be at least 10 characters long';
    }
    
    if (!formData.tags) {
      errors.tags = 'Please select a category';
    } else if (formData.tags === 'Other' && !formData.customCategory.trim()) {
      errors.customCategory = 'Please enter your custom category';
    }
    
    if (!formData.publish_date) {
      errors.publish_date = 'Please select a publish date';
    }
    
    if (!formData.share_url.trim()) {
      errors.share_url = 'Please enter blog URL';
    }
    
    if (!thumbnailImage) {
      errors.thumbnail_image = 'Please upload a thumbnail image';
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setFieldErrors({});

    try {
      // Validate form before submission
      const validationErrors = validateForm();
      
      if (Object.keys(validationErrors).length > 0) {
        setFieldErrors(validationErrors);
        
        // Scroll to first error field
        const firstErrorField = Object.keys(validationErrors)[0];
        const errorElement = document.querySelector(`[name="${firstErrorField}"]`);
        if (errorElement) {
          errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          errorElement.focus();
        }
        
        throw new Error('Please fix the validation errors above');
      }

      // Prepare data with final category
      const finalCategory = formData.tags === 'Other' ? formData.customCategory : formData.tags;

      const formDataToSend = new FormData();
      
      formDataToSend.append("title", formData.title.trim());
      formDataToSend.append("author_name", formData.author_name.trim());
      formDataToSend.append("author_profile_url", formData.author_profile_url?.trim() || "");
      formDataToSend.append("short_description", formData.short_description.trim());
      formDataToSend.append("tags", finalCategory);
      formDataToSend.append("publish_date", formData.publish_date);
      formDataToSend.append("share_url", formData.share_url.trim());
      
      if (thumbnailImage) {
        formDataToSend.append("thumbnail_image_url", thumbnailImage);
      }

      const { data, error: apiError } = await BlogLoader.addBlog(formDataToSend);
      
      if (apiError) {
        // Handle validation errors from backend with detailed parsing
        if (apiError.includes('Validation failed') || apiError.includes('details')) {
          try {
            const errorMatch = apiError.match(/details: (\[.*\])/);
            if (errorMatch) {
              const errorDetails = JSON.parse(errorMatch[1]);
              const backendErrors = {};
              errorDetails.forEach(err => {
                const fieldName = err.path[0];
                backendErrors[fieldName] = err.message;
              });
              setFieldErrors(backendErrors);
              throw new Error('Please fix the validation errors above');
            }
          } catch (parseError) {
            throw new Error(apiError);
          }
        }
        throw new Error(apiError);
      }

      // Success - show confirmation
      setSubmitted(true);
      
    } catch (error) {
      console.error("Error adding blog:", error);
      
      // User-friendly error messages
      let userErrorMessage = "Failed to add blog. ";
      
      if (error.message.includes('network') || error.message.includes('fetch')) {
        userErrorMessage += "Please check your internet connection and try again.";
      } else if (error.message.includes('500')) {
        userErrorMessage += "Our server is temporarily unavailable. Please try again in a few minutes.";
      } else if (!error.message.includes('validation errors above')) {
        userErrorMessage += error.message;
      }
      
      if (!error.message.includes('validation errors above')) {
        setError(userErrorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  // Helper function to get field error class
  const getFieldErrorClass = (fieldName) => {
    return fieldErrors[fieldName] ? 'border-red-500 focus:border-red-500' : 'border-gray-600 focus:border-blue-500';
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
            <h3 className="text-2xl font-bold text-white mb-2">Blog Added Successfully!</h3>
            <p className="text-green-100 text-lg">
              Your blog has been published to the platform
            </p>
          </div>
          
          {/* Body */}
          <div className="p-6 text-center">
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-center space-x-2 text-gray-600">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm">Your blog is now live on the platform</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-gray-600">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                <span className="text-sm">Readers can now discover your content</span>
              </div>
            </div>
            
            <button
              onClick={() => {
                onSubmit(formData);
                onClose();
              }}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 transform hover:scale-105 active:scale-95"
            >
              View Blog
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
            <h3 className="text-2xl font-bold text-white">Add New Blog</h3>
            <p className="text-gray-400 text-sm mt-1">Publish a new blog to the platform</p>
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
            {/* General Error Display */}
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
                    placeholder="Enter Your Blog Title"
                    className={`w-full bg-[#060c20] border rounded-lg px-4 py-3 text-white 
                    focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 ${getFieldErrorClass('title')}`}
                    disabled={loading}
                  />
                  {fieldErrors.title && (
                    <p className="text-red-400 text-xs mt-1">{fieldErrors.title}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Author Name *
                  </label>
                  <input
                    type="text"
                    name="author_name"
                    value={formData.author_name}
                    onChange={handleChange}
                    required
                    placeholder="Enter Author's Full Name"
                    className={`w-full bg-[#060c20] border rounded-lg px-4 py-3 text-white 
                    focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 ${getFieldErrorClass('author_name')}`}
                    disabled={loading}
                  />
                  {fieldErrors.author_name && (
                    <p className="text-red-400 text-xs mt-1">{fieldErrors.author_name}</p>
                  )}
                </div>
              </div>

              {/* Author Profile */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Author Profile URL
                  <span className="text-gray-500 text-xs font-normal ml-2">(Optional)</span>
                </label>
                <input
                  type="url"
                  name="author_profile_url"
                  value={formData.author_profile_url}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/author-profile"
                  className="w-full bg-[#060c20] border border-gray-600 rounded-lg px-4 py-3 text-white 
                  focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                  disabled={loading}
                />
              </div>

              {/* Short Description */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Short Description *
                </label>
                <textarea
                  name="short_description"
                  value={formData.short_description}
                  onChange={handleChange}
                  required
                  rows={3}
                  placeholder="Brief excerpt for blog preview card"
                  className={`w-full bg-[#060c20] border rounded-lg px-4 py-3 text-white 
                  focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 resize-none ${getFieldErrorClass('short_description')}`}
                  disabled={loading}
                />
                {fieldErrors.short_description && (
                  <p className="text-red-400 text-xs mt-1">{fieldErrors.short_description}</p>
                )}
              </div>

              {/* Category and Publish Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Category/Tags *
                  </label>
                  <select
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    required
                    className={`w-full bg-[#060c20] border rounded-lg px-4 py-3 text-white 
                    focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 ${getFieldErrorClass('tags')}`}
                    disabled={loading}
                  >
                    <option value="">Select Category</option>
                    <option value="WEB">WEB</option>
                    <option value="AI/ML">AI/ML</option>
                    <option value="AWS">AWS</option>
                    <option value="AI">AI</option>
                    <option value="Cloud Computing">Cloud Computing</option>
                    <option value="Data Science">Data Science</option>
                    <option value="tech">tech</option>
                    <option value="Other">Other</option>
                  </select>
                  {fieldErrors.tags && (
                    <p className="text-red-400 text-xs mt-1">{fieldErrors.tags}</p>
                  )}
                  
                  {/* Custom Category Input */}
                  {showCustomCategory && (
                    <div className="mt-3 animate-fadeIn">
                      <input
                        type="text"
                        name="customCategory"
                        value={formData.customCategory}
                        onChange={handleChange}
                        required
                        placeholder="Enter your custom category"
                        className={`w-full bg-[#060c20] border rounded-lg px-4 py-3 text-white 
                        focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 ${getFieldErrorClass('customCategory')}`}
                        disabled={loading}
                      />
                      {fieldErrors.customCategory && (
                        <p className="text-red-400 text-xs mt-1">{fieldErrors.customCategory}</p>
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Publish Date *
                  </label>
                  <input
                    type="date"
                    name="publish_date"
                    value={formData.publish_date}
                    onChange={handleChange}
                    required
                    className={`w-full bg-[#060c20] border rounded-lg px-4 py-3 text-white 
                    focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 ${getFieldErrorClass('publish_date')}`}
                    disabled={loading}
                  />
                  {fieldErrors.publish_date && (
                    <p className="text-red-400 text-xs mt-1">{fieldErrors.publish_date}</p>
                  )}
                </div>
              </div>

              {/* Blog URL */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Blog URL *
                </label>
                <input
                  type="url"
                  name="share_url"
                  value={formData.share_url}
                  onChange={handleChange}
                  required
                  placeholder="https://medium.com/your-blog-post"
                  className={`w-full bg-[#060c20] border rounded-lg px-4 py-3 text-white 
                  focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 ${getFieldErrorClass('share_url')}`}
                  disabled={loading}
                />
                {fieldErrors.share_url && (
                  <p className="text-red-400 text-xs mt-1">{fieldErrors.share_url}</p>
                )}
              </div>

              {/* Thumbnail Image */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Thumbnail Image *
                </label>
                <div className={`bg-[#060c20] border rounded-lg p-4 transition-all duration-200 hover:border-blue-500 ${fieldErrors.thumbnail_image ? 'border-red-500' : 'border-gray-600'}`}>
                  <input
                    type="file"
                    name="thumbnail_image"
                    onChange={handleFileChange}
                    accept="image/*"
                    required
                    className="w-full text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 
                    file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 
                    file:transition file:duration-200"
                    disabled={loading}
                  />
                  <p className="text-sm text-gray-400 mt-2">
                    Upload a cover image for your blog (recommended: 1200×630 pixels)
                  </p>
                  
                  {fieldErrors.thumbnail_image && (
                    <p className="text-red-400 text-xs mt-1">{fieldErrors.thumbnail_image}</p>
                  )}
                  
                  {/* Image Preview */}
                  {imagePreview && (
                    <div className="mt-3">
                      <p className="text-sm text-green-400 mb-2">Image Preview:</p>
                      <img 
                        src={imagePreview} 
                        alt="Thumbnail preview" 
                        className="w-32 h-32 object-cover rounded-lg border border-gray-600"
                      />
                    </div>
                  )}
                  
                  {thumbnailImage && !imagePreview && (
                    <p className="text-sm text-green-400 mt-1">
                      ✓ {thumbnailImage.name} selected
                    </p>
                  )}
                </div>
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
                      Adding Blog...
                    </span>
                  ) : (
                    'Add Blog'
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

export default AddBlogForm;