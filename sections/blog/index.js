"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BlogLoader } from "./api/loader";
import BlogCard from "./components/BlogCards";
import Button from "./components/Button";
import WriteBlogForm from "./components/WriteBlogForm";
import AddBlogForm from "./components/AddBlogForm";
import {
  useInView,
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  staggerContainer,
  scaleIn,
  hoverLift,
  cardHover,
  buttonHover,
} from "../../utils/animations";

const Blogs = () => {
  const [selectedBlogFilter, setSelectedBlogFilter] = useState("WEB");
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showWriteForm, setShowWriteForm] = useState(false);
  const [showAddBlogForm, setShowAddBlogForm] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(true);

  // Animation refs
  const [headerRef, headerInView] = useInView({ threshold: 0.3 });
  const [filtersRef, filtersInView] = useInView({ threshold: 0.3 });
  const [contentRef, contentInView] = useInView({ threshold: 0.2 });

  const blogFilters = ["WEB", "AI/ML", "AWS", "AI"];

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    if (blogs && blogs.length > 0) {
      const filtered = blogs
        .filter((blog) =>
          blog.tags
            ?.map((tag) => tag.toUpperCase())
            .includes(selectedBlogFilter.toUpperCase())
        )
        .slice(0, 4);

      setFilteredBlogs(filtered);
    } else {
      setFilteredBlogs([]);
    }
  }, [selectedBlogFilter, blogs]);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      setShowSkeleton(true);
      setError(null);

      const [blogsResult] = await Promise.all([
        BlogLoader.loadAllBlogs(),
        new Promise((resolve) => setTimeout(resolve, 800)),
      ]);

      if (blogsResult.error) {
        setBlogs([]);
      }
      setBlogs(blogsResult.data);
    } catch (err) {
      setError(err.message);
      console.error("Error loading data:", err);
    } finally {
      setLoading(false);
      setTimeout(() => setShowSkeleton(false), 200);
    }
  };

  const handleReadBlog = (blog) => {
    if (blog.share_url) {
      window.open(blog.share_url, "_blank", "noopener,noreferrer");
    }
  };

  const handleSeeAllBlogs = () => {
    window.open(
      "https://www.linkedin.com/newsletters/aws-cloud-club-pict-7218283276505870336",
      "_blank",
      "noopener,noreferrer"
    );
  };

  const handleAddBlogSubmit = (blogData) => {
    console.log("New blog data:", blogData);
    setShowAddBlogForm(false);
  };

  // Skeleton Loading Components
  const SkeletonCard = () => (
    <div className="bg-[#060c20] rounded-2xl sm:rounded-3xl overflow-hidden flex flex-col h-full animate-pulse">
      <div className="w-full h-48 sm:h-56 md:h-64 lg:h-72 bg-[#0a0f1f] flex items-center justify-center p-4">
        <div className="w-full h-full bg-[#071128] rounded-lg"></div>
      </div>
      <div className="p-4 sm:p-6 flex flex-col flex-1">
        <div className="h-6 bg-[#071128] rounded mb-3"></div>
        <div className="h-4 bg-[#071128] rounded mb-2 w-3/4"></div>
        <div className="h-4 bg-[#071128] rounded mb-2"></div>
        <div className="h-4 bg-[#071128] rounded mb-3 sm:mb-4 w-5/6"></div>
        <div className="h-5 bg-[#071128] rounded w-1/3"></div>
      </div>
    </div>
  );

  const SkeletonSingleBlog = () => (
    <div className="bg-[#060c20] rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 animate-pulse">
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 md:gap-8 items-stretch">
        <div className="w-full lg:w-2/5">
          <div className="w-full h-48 sm:h-56 md:h-64 lg:h-72 bg-[#0a0f1f] rounded-xl sm:rounded-2xl flex items-center justify-center">
            <div className="w-full h-full bg-[#071128] rounded-xl sm:rounded-2xl"></div>
          </div>
        </div>
        <div className="flex-1 text-left flex flex-col justify-center">
          <div className="h-7 bg-[#071128] rounded mb-2 sm:mb-4 w-4/5"></div>
          <div className="h-5 bg-[#071128] rounded mb-2 sm:mb-4 w-2/3"></div>
          <div className="h-4 bg-[#071128] rounded mb-2"></div>
          <div className="h-4 bg-[#071128] rounded mb-2 w-5/6"></div>
          <div className="h-4 bg-[#071128] rounded mb-4 sm:mb-6 w-3/4"></div>
          <div className="h-5 bg-[#071128] rounded w-1/4"></div>
        </div>
      </div>
    </div>
  );

  if (error) {
    return (
      <section
        id="blogs"
        className="py-8 md:py-12 lg:py-16 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-red-400 text-lg">Error: {error}</p>
          <button
            onClick={loadInitialData}
            className="text-[#327dd6] mt-4 hover:underline text-lg"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <motion.section
      id="blogs"
      className="py-8 md:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          ref={headerRef}
          variants={staggerContainer}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          className="flex flex-col lg:flex-row items-start justify-between mb-8 lg:mb-12"
        >
          <motion.div
            variants={fadeInLeft}
            className="w-full lg:w-1/2 mb-6 lg:mb-0 lg:pr-8"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gradient-blue-purple mb-4"
            >
              Student Blogs
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-global-4 text-lg sm:text-xl md:text-2xl lg:text-3xl mb-4 lg:mb-6"
            >
              Real Voices. Real Stories.
              <br />
              By our community.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <motion.div whileHover={buttonHover} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="accent"
                  size="md"
                  onClick={() => setShowAddBlogForm(true)}
                  className="text-sm sm:text-base"
                >
                  + Add Blog
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
          <motion.div
            variants={fadeInRight}
            className="w-full lg:w-1/2 flex justify-center lg:justify-end"
          >
            <motion.img
              src="/images/img_image_5.png"
              alt="Student Blogs Illustration"
              className="w-48 sm:w-56 md:w-64 lg:w-72 xl:w-80"
              style={{ maxWidth: "100%", height: "auto" }}
              whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </motion.div>

        {/* Blog Filters */}
        <motion.div
          ref={filtersRef}
          variants={staggerContainer}
          initial="hidden"
          animate={filtersInView ? "visible" : "hidden"}
          className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8 lg:mb-12"
        >
          {blogFilters.map((filter, index) => (
            <motion.button
              key={filter}
              variants={scaleIn}
              onClick={() => setSelectedBlogFilter(filter)}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full border-2 transition-all duration-300 text-sm sm:text-base font-semibold min-w-[80px] sm:min-w-[100px] text-center ${
                selectedBlogFilter === filter
                  ? "border-[#327dd6] text-[#327dd6] bg-transparent"
                  : "border-[#ffffff4c] text-global-4 bg-transparent hover:border-[#327dd6] hover:text-[#327dd6]"
              }`}
              whileHover={{
                scale: 1.05,
                boxShadow:
                  selectedBlogFilter === filter
                    ? "0 0 20px rgba(50, 125, 214, 0.5)"
                    : "0 0 15px rgba(255, 255, 255, 0.1)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              {filter}
            </motion.button>
          ))}
        </motion.div>

        {/* Blog Content */}
        <motion.div ref={contentRef} className="space-y-6 sm:space-y-8">
          <AnimatePresence mode="wait">
            {showSkeleton ? (
              <motion.div
                key="skeleton"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <SkeletonSingleBlog />
                <div className="bg-[#0711287c] rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                  </div>
                </div>
              </motion.div>
            ) : filteredBlogs.length > 0 ? (
              <motion.div
                key="content"
                variants={staggerContainer}
                initial="hidden"
                animate={contentInView ? "visible" : "hidden"}
              >
                {filteredBlogs.length === 1 && (
                  <motion.div
                    variants={fadeInUp}
                    className="bg-[#060c20] rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8"
                    whileHover={cardHover}
                  >
                    <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 md:gap-8 items-stretch">
                      <motion.div
                        className="w-full lg:w-2/5"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="blog-card-image-container">
                          <img
                            src={filteredBlogs[0].thumbnail_image_url}
                            alt={filteredBlogs[0].title}
                            className="single-blog-image w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover rounded-xl sm:rounded-2xl"
                          />
                        </div>
                      </motion.div>
                      <motion.div
                        className="flex-1 text-left flex flex-col justify-center"
                        variants={staggerContainer}
                      >
                        <motion.h3
                          variants={fadeInUp}
                          className="text-lg sm:text-xl md:text-2xl font-bold text-global-4 mb-2 sm:mb-4"
                        >
                          {filteredBlogs[0].title}
                        </motion.h3>
                        <motion.p
                          variants={fadeInUp}
                          className="text-global-4 text-base sm:text-lg mb-2 sm:mb-4"
                        >
                          by{" "}
                          <span className="text-[#327dd6] font-bold">
                            {filteredBlogs[0].author_name}
                          </span>
                        </motion.p>
                        <motion.p
                          variants={fadeInUp}
                          className="text-global-4 text-sm sm:text-base md:text-lg mb-4 sm:mb-6 leading-relaxed"
                        >
                          {filteredBlogs[0].short_description}
                        </motion.p>
                        <motion.button
                          variants={fadeInUp}
                          onClick={() => handleReadBlog(filteredBlogs[0])}
                          className="text-[#f4b631] text-base sm:text-lg font-bold hover:underline inline-block text-left"
                          whileHover={{ x: 5, color: "#f4b631" }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Read Blog →
                        </motion.button>
                      </motion.div>
                    </div>
                  </motion.div>
                )}

                {filteredBlogs.length === 2 && (
                  <motion.div
                    variants={fadeInUp}
                    className="bg-[#0711287c] rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8"
                  >
                    <motion.div
                      variants={staggerContainer}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8"
                    >
                      {filteredBlogs.map((blog, index) => (
                        <motion.div
                          key={blog.blog_id}
                          variants={scaleIn}
                          whileHover={cardHover}
                        >
                          <BlogCard blog={blog} onReadBlog={handleReadBlog} />
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
                )}

                {filteredBlogs.length === 3 && (
                  <motion.div
                    variants={fadeInUp}
                    className="bg-[#0711287c] rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8"
                  >
                    <motion.div
                      variants={staggerContainer}
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
                    >
                      {filteredBlogs.map((blog, index) => (
                        <motion.div
                          key={blog.blog_id}
                          variants={scaleIn}
                          whileHover={cardHover}
                        >
                          <BlogCard blog={blog} onReadBlog={handleReadBlog} />
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
                )}

                {filteredBlogs.length === 4 && (
                  <motion.div variants={staggerContainer}>
                    <motion.div
                      variants={fadeInUp}
                      className="bg-[#0711287c] rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 mb-6"
                    >
                      <motion.div
                        variants={staggerContainer}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
                      >
                        {filteredBlogs.slice(0, 3).map((blog, index) => (
                          <motion.div
                            key={blog.blog_id}
                            variants={scaleIn}
                            whileHover={cardHover}
                          >
                            <BlogCard blog={blog} onReadBlog={handleReadBlog} />
                          </motion.div>
                        ))}
                      </motion.div>
                    </motion.div>
                    <motion.div
                      variants={fadeInUp}
                      className="bg-[#060c20] rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8"
                      whileHover={cardHover}
                    >
                      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 items-center">
                        <motion.div
                          className="w-full lg:w-2/5"
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className="fourth-blog-image-container">
                            <img
                              src={filteredBlogs[3].thumbnail_image_url}
                              alt={filteredBlogs[3].title}
                              className="fourth-blog-image w-full h-48 sm:h-56 md:h-64 object-cover rounded-xl sm:rounded-2xl"
                            />
                          </div>
                        </motion.div>
                        <motion.div
                          className="flex-1 text-left"
                          variants={staggerContainer}
                        >
                          <motion.h3
                            variants={fadeInUp}
                            className="text-lg sm:text-xl md:text-2xl font-bold text-global-4 mb-2 sm:mb-3 line-clamp-2"
                          >
                            {filteredBlogs[3].title}
                          </motion.h3>
                          <motion.p
                            variants={fadeInUp}
                            className="text-global-4 text-base sm:text-lg mb-2 sm:mb-3"
                          >
                            by{" "}
                            <span className="text-[#327dd6] font-bold">
                              {filteredBlogs[3].author_name}
                            </span>
                          </motion.p>
                          <motion.p
                            variants={fadeInUp}
                            className="text-global-4 text-sm sm:text-base md:text-lg mb-3 sm:mb-4 line-clamp-2"
                          >
                            {filteredBlogs[3].short_description}
                          </motion.p>
                          <motion.button
                            variants={fadeInUp}
                            onClick={() => handleReadBlog(filteredBlogs[3])}
                            className="text-[#f4b631] text-base sm:text-lg font-bold hover:underline inline-block"
                            whileHover={{ x: 5, color: "#f4b631" }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Read Blog →
                          </motion.button>
                        </motion.div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-8 sm:py-12"
              >
                {blogs.length === 0 ? (
                  <p className="text-global-4 text-lg sm:text-xl">
                    No blogs have been added yet.
                  </p>
                ) : (
                  <p className="text-global-4 text-lg sm:text-xl">
                    No blogs found for "{selectedBlogFilter}".
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* See All Blogs */}
        {!showSkeleton && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-center md:text-right mt-6 sm:mt-8"
          >
            <motion.button
              onClick={handleSeeAllBlogs}
              className="text-[#f4b631] text-lg sm:text-xl font-bold hover:underline"
              whileHover={{ x: 5, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              See All Blogs →
            </motion.button>
          </motion.div>
        )}

        {/* CTA */}
        {!showSkeleton && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-col lg:flex-row items-center justify-between mt-8 sm:mt-12 gap-4 sm:gap-6"
          >
            <motion.h3
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-global-4 text-center lg:text-left"
              whileHover={{ scale: 1.02 }}
            >
              Have a story to tell? Be our next blog writer!
            </motion.h3>
            <div className="flex justify-center lg:justify-end w-full lg:w-auto">
              <motion.div whileHover={buttonHover} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="accent"
                  size="md"
                  onClick={() => setShowWriteForm(true)}
                  className="text-sm sm:text-base"
                >
                  Write A Blog
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}

        <AnimatePresence>
          {showWriteForm && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <WriteBlogForm onClose={() => setShowWriteForm(false)} />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showAddBlogForm && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <AddBlogForm
                onClose={() => setShowAddBlogForm(false)}
                onSubmit={handleAddBlogSubmit}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
};

export default Blogs;
