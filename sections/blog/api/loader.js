// api/loader.js
export class BlogLoader {
  static BASE_URL = "https://webiste-aws.onrender.com/blogs";

  static async loadAllBlogs() {
    try {
      console.log("🔄 Fetching blogs from:", `${this.BASE_URL}/`);
      
      const response = await fetch(`${this.BASE_URL}/`);
      
      console.log("📡 Response status:", response.status);
      console.log("📡 Response ok:", response.ok);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const blogs = await response.json();
      console.log("✅ Blogs loaded successfully:", blogs);
      
      return { data: blogs, error: null };
    } catch (error) {
      console.error("❌ Error loading blogs:", error);
      return { data: [], error: error.message };
    }
  }

  static async loadBlogById(id) {
    try {
      const response = await fetch(`${this.BASE_URL}/${id}`);
      if (!response.ok) throw new Error("Failed to fetch blog");
      const blog = await response.json();
      return { data: blog, error: null };
    } catch (error) {
      return { data: null, error: error.message };
    }
  }

 static async addBlog(formData) {
  try {
    const endpoint = `${this.BASE_URL}/create`;
    
    const response = await fetch(endpoint, {
      method: "POST",
      body: formData, 
    });

    const result = await response.json();

    if (!response.ok) {
      // Return detailed error information
      if (result.error && result.details) {
        throw new Error(`Validation failed. details: ${JSON.stringify(result.details)}`);
      }
      throw new Error(result.error || "Failed to add blog");
    }

    return { data: result, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
}

  static async loadAllTags() {
    try {
      const { data: blogs, error } = await this.loadAllBlogs();
      if (error) throw new Error(error);

      const tags = Array.from(new Set(blogs.flatMap(blog => {
        if (!blog.tags) return [];
        return typeof blog.tags === 'string' 
          ? blog.tags.split(',').map(tag => tag.trim())
          : blog.tags;
      })));
      
      return { data: tags, error: null };
    } catch (error) {
      return { data: [], error: error.message };
    }
  }
}

export default BlogLoader;