// export class BlogLoader {
//   static BASE_URL = "http://localhost:3001"; // your backend URL

//   static async loadAllBlogs() {
//     try {
//       const response = await fetch(`${this.BASE_URL}/blogs`);
//       if (!response.ok) throw new Error("Failed to fetch blogs");
//       const blogs = await response.json();
//       return { data: blogs, error: null };
//     } catch (error) {
//       return { data: [], error: error.message };
//     }
//   }

//   static async loadBlogsByTag(tag) {
//     try {
//       const response = await fetch(`${this.BASE_URL}/blogs/tag/${tag}`);
//       if (!response.ok) throw new Error("Failed to fetch blogs by tag");
//       const blogs = await response.json();
//       return { data: blogs, error: null };
//     } catch (error) {
//       return { data: [], error: error.message };
//     }
//   }

//   static async loadBlogById(id) {
//     try {
//       const response = await fetch(`${this.BASE_URL}/blogs/${id}`);
//       if (!response.ok) throw new Error("Failed to fetch blog");
//       const blog = await response.json();
//       return { data: blog, error: null };
//     } catch (error) {
//       return { data: null, error: error.message };
//     }
//   }

//   static async loadAllTags() {
//     try {
//       const response = await fetch(`${this.BASE_URL}/blogs`);
//       if (!response.ok) throw new Error("Failed to fetch tags");
//       const blogs = await response.json();
//       const tags = Array.from(new Set(blogs.flatMap(blog => blog.tags || [])));
//       return { data: tags, error: null };
//     } catch (error) {
//       return { data: [], error: error.message };
//     }
//   }
// }
// api/loader.js - Dummy API implementation
export class BlogLoader {
  
  // Static dummy data
  static dummyBlogs = [
    {
      blog_id: 1,
      title: "Getting Started with Web Development",
      author_name: "John Doe",
      short_description: "Learn the fundamentals of modern web development with HTML, CSS, and JavaScript.",
      thumbnail_image_url: "/images/img_image_4.png",
      share_url: "https://example.com/blog/1",
      tags: ["WEB", "Development"]
    },
    {
      blog_id: 2,
      title: "Introduction to Machine Learning",
      author_name: "Jane Smith",
      short_description: "Discover the basics of machine learning algorithms and their applications.",
      thumbnail_image_url: "/images/img_image_6.png",
      share_url: "https://example.com/blog/2",
      tags: ["AI/ML", "AI", "Technology"]
    },
    {
      blog_id: 3,
      title: "AWS Cloud Services Overview",
      author_name: "Mike Johnson",
      short_description: "A comprehensive guide to Amazon Web Services and cloud computing.",
      thumbnail_image_url: "/images/img_image.png",
      share_url: "https://example.com/blog/3",
      tags: ["AWS", "Cloud", "WEB"]
    },
    {
      blog_id: 4,
      title: "Artificial Intelligence in Everyday Life",
      author_name: "Sarah Wilson",
      short_description: "How AI is transforming our daily lives and industries.",
      thumbnail_image_url: "/images/img_image.png",
      share_url: "https://example.com/blog/4",
      tags: ["AI", "AI/ML", "Technology","WEB"]
    },
    {
      blog_id: 5,
      title: "React.js Best Practices",
      author_name: "David Brown",
      short_description: "Essential tips and best practices for React.js development.",
      thumbnail_image_url: "/images/img_image_4.png",
      share_url: "https://example.com/blog/5",
      tags: ["WEB", "Development", "React"]
    }
  ];

  static async loadAllBlogs() {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Return dummy data instead of actual API call
      return { 
        data: this.dummyBlogs, 
        error: null 
      };
    } catch (error) {
      return { 
        data: [], 
        error: "Failed to load blogs" 
      };
    }
  }

  static async loadBlogsByTag(tag) {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Filter dummy data by tag
      const filteredBlogs = this.dummyBlogs.filter(blog => 
        blog.tags?.map(t => t.toUpperCase()).includes(tag.toUpperCase())
      );
      
      return { 
        data: filteredBlogs, 
        error: null 
      };
    } catch (error) {
      return { 
        data: [], 
        error: "Failed to fetch blogs by tag" 
      };
    }
  }

  static async loadBlogById(id) {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Find blog by ID in dummy data
      const blog = this.dummyBlogs.find(b => b.blog_id === parseInt(id));
      
      return { 
        data: blog || null, 
        error: blog ? null : "Blog not found" 
      };
    } catch (error) {
      return { 
        data: null, 
        error: "Failed to fetch blog" 
      };
    }
  }

  static async loadAllTags() {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // Extract unique tags from dummy data
      const allTags = Array.from(new Set(this.dummyBlogs.flatMap(blog => blog.tags || [])));
      
      return { 
        data: allTags, 
        error: null 
      };
    } catch (error) {
      return { 
        data: [], 
        error: "Failed to fetch tags" 
      };
    }
  }

  // Additional dummy method for adding a blog
  static async addBlog(blogData) {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // Create new blog with dummy ID
      const newBlog = {
        ...blogData,
        blog_id: Math.max(...this.dummyBlogs.map(b => b.blog_id)) + 1,
        thumbnail_image_url: blogData.thumbnail_image_url || "/images/blog-placeholder-new.jpg"
      };
      
      // Add to dummy data (in real scenario, this would be persisted)
      this.dummyBlogs.push(newBlog);
      
      return { 
        data: newBlog, 
        error: null 
      };
    } catch (error) {
      return { 
        data: null, 
        error: "Failed to add blog" 
      };
    }
  }
}

export default BlogLoader;