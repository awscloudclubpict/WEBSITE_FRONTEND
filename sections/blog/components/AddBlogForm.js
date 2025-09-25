import React, { useState, useRef } from "react";
import Image from "next/image";
import { blogAPI, handleApiError } from "../../../utils/api";

const AddBlogForm = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    author_name: "",
    author_profile_url: "",
    short_description: "",
    tags: "",
    publish_date: "",
    share_url: "",
  });
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setThumbnailImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("author_name", formData.author_name);
      formDataToSend.append("author_profile_url", formData.author_profile_url);
      formDataToSend.append("short_description", formData.short_description);
      formDataToSend.append(
        "tags",
        JSON.stringify(formData.tags ? [formData.tags] : [])
      );
      formDataToSend.append("publish_date", formData.publish_date);
      formDataToSend.append("share_url", formData.share_url);

      if (thumbnailImage) {
        formDataToSend.append("thumbnail_image", thumbnailImage);
      }

      const result = await blogAPI.addBlog(formDataToSend);

      console.log("Blog added:", result.blog);
      onSubmit(result.blog);
      alert("Blog added successfully!");
    } catch (error) {
      const errorMessage = handleApiError(error, "Failed to add blog");
      console.error("Error submitting blog:", errorMessage);
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#071128] rounded-2xl shadow-2xl border border-gray-700 p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-global-4">Add New Blog</h3>
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
              <label className="block text-global-4 mb-2">Blog Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full bg-[#060c20] border border-gray-500 rounded-lg px-4 py-3 text-white 
                focus:outline-none focus:border-[#327dd6] hover:border-[#327dd6] transition"
                placeholder="Enter blog title"
              />
            </div>

            <div>
              <label className="block text-global-4 mb-2">Author Name *</label>
              <input
                type="text"
                name="author_name"
                value={formData.author_name}
                onChange={handleChange}
                required
                className="w-full bg-[#060c20] border border-gray-500 rounded-lg px-4 py-3 text-white 
                focus:outline-none focus:border-[#327dd6] hover:border-[#327dd6] transition"
                placeholder="Author's full name"
              />
            </div>
          </div>

          <div>
            <label className="block text-global-4 mb-2">
              Author Profile URL{" "}
            </label>
            <input
              type="url"
              name="author_profile_url"
              value={formData.author_profile_url}
              onChange={handleChange}
              className="w-full bg-[#060c20] border border-gray-500 rounded-lg px-4 py-3 text-white 
              focus:outline-none focus:border-[#327dd6] hover:border-[#327dd6] transition"
              placeholder="https://linkedin.com/in/author-profile"
            />
          </div>

          <div>
            <label className="block text-global-4 mb-2">
              Short Description *
            </label>
            <textarea
              name="short_description"
              value={formData.short_description}
              onChange={handleChange}
              required
              rows={3}
              placeholder="Brief excerpt for blog preview card"
              className="w-full bg-[#060c20] border border-gray-500 rounded-lg px-4 py-3 text-white 
              focus:outline-none focus:border-[#327dd6] hover:border-[#327dd6] transition resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-global-4 mb-2">
                Category/Tags *
              </label>
              <select
                name="tags"
                value={formData.tags}
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
                <option value="Cloud Computing">Cloud Computing</option>
                <option value="Data Science">Data Science</option>
              </select>
            </div>

            <div>
              <label className="block text-global-4 mb-2">Publish Date *</label>
              <input
                type="date"
                name="publish_date"
                value={formData.publish_date}
                onChange={handleChange}
                required
                className="w-full bg-[#060c20] border border-gray-500 rounded-lg px-4 py-3 text-white 
                focus:outline-none focus:border-[#327dd6] hover:border-[#327dd6] transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-global-4 mb-2">Blog URL *</label>
            <input
              type="url"
              name="share_url"
              value={formData.share_url}
              onChange={handleChange}
              required
              className="w-full bg-[#060c20] border border-gray-500 rounded-lg px-4 py-3 text-white 
              focus:outline-none focus:border-[#327dd6] hover:border-[#327dd6] transition"
              placeholder="https://medium.com/your-blog-post"
            />
          </div>

          <div>
            <label className="block text-global-4 mb-2">
              Thumbnail Image *
            </label>
            <div className="bg-[#060c20] border border-gray-500 rounded-lg p-4">
              <input
                type="file"
                name="thumbnail_image"
                onChange={handleFileChange}
                accept="image/*"
                required
                className="w-full text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 
                file:text-sm file:font-semibold file:bg-[#327dd6] file:text-white hover:file:bg-blue-600 
                file:transition file:duration-200"
              />
              <p className="text-sm text-gray-400 mt-2">
                Upload a cover image for your blog (recommended: 1200×630
                pixels)
              </p>
            </div>
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
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Adding Blog...
                </span>
              ) : (
                "Add Blog"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlogForm;
