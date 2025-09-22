'use client';
import React from 'react';

const BlogCard = ({ blog, onReadBlog }) => {
  return (
    <div className="bg-[#060c20] rounded-2xl sm:rounded-3xl overflow-hidden flex flex-col h-full transition-transform duration-300 hover:scale-105">
      <div className="w-full h-48 sm:h-56 md:h-64 lg:h-72 bg-[#0a0f1f] flex items-center justify-center p-4">
        <img
          src={blog.thumbnail_image_url}
          alt={blog.title}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="p-4 sm:p-6 flex flex-col flex-1">
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3">{blog.title}</h3>
        <p className="text-white text-base sm:text-lg mb-2">
          by <span className="text-[#327dd6] font-bold">{blog.author_name}</span>
        </p>
        <p className="text-white text-sm sm:text-base md:text-lg flex-1 mb-3 sm:mb-4 leading-relaxed">
          {blog.short_description}
        </p>
        <button
          onClick={() => onReadBlog(blog)}
          className="text-[#f4b631] text-base sm:text-lg font-bold hover:underline text-left"
        >
          Read Blog →
        </button>
      </div>
    </div>
  );
};

export default BlogCard;