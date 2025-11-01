'use client';
import React, { useState, useEffect } from 'react';
import { BlogLoader } from './api/loader';
import BlogCard from './components/BlogCards';
import Button from './components/Button';
import WriteBlogForm from './components/WriteBlogForm';
import AddBlogForm from './components/AddBlogForm';

const Blogs = () => {
  const [selectedBlogFilter, setSelectedBlogFilter] = useState('WEB'); // Changed default to 'WEB'
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showWriteForm, setShowWriteForm] = useState(false);
  const [showAddBlogForm, setShowAddBlogForm] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(true);

  const blogFilters = ['WEB', 'AI/ML', 'AWS', 'AI'];
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    loadInitialData();
    
    // Initialize reveal animations after component mounts
    import('../../utils/revealAnimation').then(({ revealAnimationManager }) => {
      revealAnimationManager.autoInit();
    });
  }, []);

  useEffect(() => {
    if (blogs && blogs.length > 0) {
      const filtered = blogs
        .filter(blog => {
          const blogTags = typeof blog.tags === 'string' 
            ? blog.tags.toUpperCase()
            : (blog.tags || '').toUpperCase();
          return blogTags.includes(selectedBlogFilter.toUpperCase());
        })
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
        await new Promise(resolve => setTimeout(resolve, 3000)); // 1 second delay
      const blogsResult = await BlogLoader.loadAllBlogs();
      
      if (blogsResult.error) {
        setBlogs([]);
        setError(blogsResult.error);
      } else {
        setBlogs(blogsResult.data || []);
      }
    } catch (err) {
      setError(err.message);
      setBlogs([]);
    } finally {
      setLoading(false);
      setShowSkeleton(false);
    }
  };

  const handleReadBlog = (blog) => {
    if (blog.share_url) {
      window.open(blog.share_url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleAuthorClick = (e, authorUrl) => {
    e.stopPropagation();
    if (authorUrl) {
      window.open(authorUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleSeeAllBlogs = () => {
    window.open('https://www.linkedin.com/newsletters/aws-cloud-club-pict-7218283276505870336', '_blank', 'noopener,noreferrer');
  };

  const handleAddBlogSubmit = async (blogData) => {
    try {
      // Refresh the blogs data to get the latest from server
      await loadInitialData();
      setShowAddBlogForm(false);
      
      // Optional: Show success message
      console.log('Blog added successfully and data refreshed');
    } catch (error) {
      console.error('Error refreshing blogs after adding new one:', error);
    }
  };

  // Skeleton Loading Components
  const SkeletonCard = () => (
    <div className="bg-[#060c20] rounded-2xl sm:rounded-3xl overflow-hidden flex flex-col h-full animate-pulse min-w-[280px] sm:min-w-0">
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

  // Horizontal scroll container for mobile
  const HorizontalScrollContainer = ({ children, className = "" }) => (
    <div className={`relative ${className}`}>
      <div className="flex overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide horizontal-scroll-container">
        <div className="flex gap-4 sm:gap-6 md:gap-8 min-w-max">
          {children}
        </div>
      </div>
    </div>
  );

  // Mobile card component for horizontal scrolling
  const MobileBlogCard = ({ blog }) => (
    <div className="w-[280px] flex-shrink-0">
      <BlogCard blog={blog} onReadBlog={handleReadBlog} />
    </div>
  );

  // Author name component with click functionality
  const AuthorName = ({ authorName, authorUrl }) => {
    if (authorUrl) {
      return (
        <span 
          onClick={(e) => handleAuthorClick(e, authorUrl)}
          className="text-[#327dd6] font-bold cursor-pointer hover:underline hover:text-[#4a90e2] transition-colors duration-200"
        >
          {authorName}
        </span>
      );
    }
    return (
      <span className="text-[#327dd6] font-bold">
        {authorName}
      </span>
    );
  };

  if (error) {
    return (
      <section id="blogs" className="py-8 md:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-red-400 text-lg">Error: {error}</p>
          <button onClick={loadInitialData} className="text-[#327dd6] mt-4 hover:underline text-lg">
            Try Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="blogs" className="py-8 md:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start justify-between mb-8 lg:mb-12" data-reveal data-reveal-animation="fadeInUp">
          <div className="w-full lg:w-1/2 mb-6 lg:mb-0 lg:pr-8" data-reveal data-reveal-animation="fadeInLeft">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gradient-blue-purple mb-4" data-reveal data-reveal-animation="fadeInUp" data-reveal-delay="200">
              Student Blogs
            </h2>
            <p className="text-global-4 text-lg sm:text-xl md:text-2xl lg:text-3xl mb-4 lg:mb-6" data-reveal data-reveal-animation="fadeInUp" data-reveal-delay="300">
              Real Voices. Real Stories.<br />By our community.
            </p>
            {user?.role === 'admin' && (
              <Button 
                variant="accent" 
                size="md" 
                onClick={() => setShowAddBlogForm(true)}
                className="text-sm sm:text-base"
                data-reveal 
                data-reveal-animation="fadeInUp" 
                data-reveal-delay="400"
              >
                + Add Blog
              </Button>
            )}
          </div>
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end" data-reveal data-reveal-animation="fadeInRight">
            <img
              src="/images/img_image_5.png"
              alt="Student Blogs Illustration"
              className="w-48 sm:w-56 md:w-64 lg:w-72 xl:w-80"
              style={{ maxWidth: '100%', height: 'auto' }}
              data-reveal 
              data-reveal-animation="scaleIn" 
              data-reveal-delay="500"
            />
          </div>
        </div>

        {/* Blog Filters */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8 lg:mb-12" data-reveal data-reveal-animation="fadeInUp" data-reveal-stagger data-reveal-stagger-delay="100">
          {blogFilters.map((filter, index) => (
            <button
              key={filter}
              onClick={() => setSelectedBlogFilter(filter)}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full border-2 transition-all duration-300 text-sm sm:text-base font-semibold min-w-[80px] sm:min-w-[100px] text-center ${
                selectedBlogFilter === filter
                  ? 'border-[#327dd6] text-[#327dd6] bg-transparent'
                  : 'border-[#ffffff4c] text-global-4 bg-transparent hover:border-[#327dd6] hover:text-[#327dd6]'
              }`}
              data-reveal-stagger-item
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Blog Content */}
        <div className="space-y-6 sm:space-y-8">
          {showSkeleton ? (
            <>
              <SkeletonSingleBlog />
              <div className="bg-[#0711287c] rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8">
                {/* Mobile horizontal scroll for skeleton */}
                <div className="block sm:hidden">
                  <HorizontalScrollContainer>
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                  </HorizontalScrollContainer>
                </div>
                {/* Desktop grid for skeleton */}
                <div className="hidden sm:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                </div>
              </div>
            </>
          ) : filteredBlogs.length > 0 ? (
            <>
              {/* Mobile view - All blogs in horizontal scroll */}
              <div className="block sm:hidden">
                {filteredBlogs.length === 1 ? (
                  <div className="bg-[#060c20] rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8">
                    <div className="flex flex-col gap-4 items-stretch">
                      <div className="w-full">
                        <div className="blog-card-image-container">
                          <img
                            src={filteredBlogs[0].thumbnail_image_url}
                            alt={filteredBlogs[0].title}
                            className="single-blog-image w-full h-48 sm:h-56 object-cover rounded-xl"
                          />
                        </div>
                      </div>
                      <div className="text-left">
                        <h3 className="text-lg font-bold text-global-4 mb-2">
                          {filteredBlogs[0].title}
                        </h3>
                        <p className="text-global-4 text-base mb-2">
                          by <AuthorName authorName={filteredBlogs[0].author_name} authorUrl={filteredBlogs[0].author_profile_url} />
                        </p>
                        <p className="text-global-4 text-sm mb-4 leading-relaxed">
                          {filteredBlogs[0].short_description}
                        </p>
                        <button
                          onClick={() => handleReadBlog(filteredBlogs[0])}
                          className="text-[#f4b631] text-base font-bold hover:underline"
                        >
                          Read Blog →
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#0711287c] rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8">
                    <HorizontalScrollContainer>
                      {filteredBlogs.map((blog) => (
                        <MobileBlogCard key={blog.blog_id} blog={blog} />
                      ))}
                    </HorizontalScrollContainer>
                  </div>
                )}
              </div>

              {/* Desktop view - Original layout */}
              <div className="hidden sm:block">
                {filteredBlogs.length === 1 && (
                  <div className="bg-[#060c20] rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8">
                    <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 md:gap-8 items-stretch">
                      <div className="w-full lg:w-2/5">
                        <div className="blog-card-image-container">
                          <img
                            src={filteredBlogs[0].thumbnail_image_url}
                            alt={filteredBlogs[0].title}
                            className="single-blog-image w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover rounded-xl sm:rounded-2xl"
                          />
                        </div>
                      </div>
                      <div className="flex-1 text-left flex flex-col justify-center">
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-global-4 mb-2 sm:mb-4">
                          {filteredBlogs[0].title}
                        </h3>
                        <p className="text-global-4 text-base sm:text-lg mb-2 sm:mb-4">
                          by <AuthorName authorName={filteredBlogs[0].author_name} authorUrl={filteredBlogs[0].author_profile_url} />
                        </p>
                        <p className="text-global-4 text-sm sm:text-base md:text-lg mb-4 sm:mb-6 leading-relaxed">
                          {filteredBlogs[0].short_description}
                        </p>
                        <button
                          onClick={() => handleReadBlog(filteredBlogs[0])}
                          className="text-[#f4b631] text-base sm:text-lg font-bold hover:underline inline-block text-left"
                        >
                          Read Blog →
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {filteredBlogs.length === 2 && (
                  <div className="bg-[#0711287c] rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                      {filteredBlogs.map((blog) => (
                        <BlogCard key={blog.blog_id} blog={blog} onReadBlog={handleReadBlog} />
                      ))}
                    </div>
                  </div>
                )}

                {filteredBlogs.length === 3 && (
                  <div className="bg-[#0711287c] rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                      {filteredBlogs.map((blog) => (
                        <BlogCard key={blog.blog_id} blog={blog} onReadBlog={handleReadBlog} />
                      ))}
                    </div>
                  </div>
                )}

                {filteredBlogs.length === 4 && (
                  <>
                    {/* First three blogs in grid */}
                    <div className="bg-[#0711287c] rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                        {filteredBlogs.slice(0, 3).map((blog) => (
                          <BlogCard key={blog.blog_id} blog={blog} onReadBlog={handleReadBlog} />
                        ))}
                      </div>
                    </div>
                    
                    {/* Fourth blog as featured with proper spacing */}
                    <div className="bg-[#060c20] rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 mt-6 sm:mt-8">
                      <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-10 items-center">
                        <div className="w-full lg:w-2/5">
                          <div className="fourth-blog-image-container">
                            <img
                              src={filteredBlogs[3].thumbnail_image_url}
                              alt={filteredBlogs[3].title}
                              className="fourth-blog-image w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover rounded-xl sm:rounded-2xl"
                            />
                          </div>
                        </div>
                        <div className="flex-1 text-left lg:pl-4">
                          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-global-4 mb-3 sm:mb-4">
                            {filteredBlogs[3].title}
                          </h3>
                          <p className="text-global-4 text-lg sm:text-xl mb-3 sm:mb-4">
                            by <AuthorName authorName={filteredBlogs[3].author_name} authorUrl={filteredBlogs[3].author_profile_url} />
                          </p>
                          <p className="text-global-4 text-base sm:text-lg md:text-xl mb-4 sm:mb-6 leading-relaxed">
                            {filteredBlogs[3].short_description}
                          </p>
                          <button
                            onClick={() => handleReadBlog(filteredBlogs[3])}
                            className="text-[#f4b631] text-lg sm:text-xl font-bold hover:underline inline-block"
                          >
                            Read Blog →
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </>
          ) : (
            <div className="text-center py-8 sm:py-12">
              {blogs.length === 0
                ? <p className="text-global-4 text-lg sm:text-xl">No blogs have been added yet.</p>
                : <p className="text-global-4 text-lg sm:text-xl">No blogs found for "{selectedBlogFilter}".</p>
              }
            </div>
          )}
        </div>

        {/* See All Blogs */}
        {!showSkeleton && (
          <div className="text-center md:text-right mt-6 sm:mt-8">
            <button onClick={handleSeeAllBlogs} className="text-[#f4b631] text-lg sm:text-xl font-bold hover:underline">
              See All Blogs →
            </button>
          </div>
        )}

        {/* CTA */}
        {!showSkeleton && (
          <div className="flex flex-col lg:flex-row items-center justify-between mt-8 sm:mt-12 gap-4 sm:gap-6">
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-global-4 text-center lg:text-left">
              Have a story to tell? Be our next blog writer!
            </h3>
            <div className="flex justify-center lg:justify-end w-full lg:w-auto">
              <Button variant="accent" size="md" onClick={() => setShowWriteForm(true)} className="text-sm sm:text-base">
                Write A Blog
              </Button>
            </div>
          </div>
        )}

        {showWriteForm && (
          <WriteBlogForm onClose={() => setShowWriteForm(false)} />
        )}
        
        {showAddBlogForm && (
          <AddBlogForm 
            onClose={() => setShowAddBlogForm(false)} 
            onSubmit={handleAddBlogSubmit}
          />
        )}
      </div>
    </section>
  );
};

export default Blogs;