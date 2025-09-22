export class BlogLoader {
  static BASE_URL = "http://localhost:3001"; // your backend URL

  static async loadAllBlogs() {
    try {
      const response = await fetch(`${this.BASE_URL}/blogs`);
      if (!response.ok) throw new Error(`Failed to fetch blogs: ${response.status}`);
      
      // Check if response is JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server returned non-JSON response");
      }
      
      const blogs = await response.json();
      return { data: blogs, error: null };
    } catch (error) {
      console.error("Error loading blogs:", error);
      return { data: [], error: error.message };
    }
  }

  static async loadBlogsByTag(tag) {
    try {
      const response = await fetch(`${this.BASE_URL}/blogs/tag/${tag}`);
      if (!response.ok) throw new Error(`Failed to fetch blogs by tag: ${response.status}`);
      
      // Check if response is JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server returned non-JSON response");
      }
      
      const blogs = await response.json();
      return { data: blogs, error: null };
    } catch (error) {
      console.error("Error loading blogs by tag:", error);
      return { data: [], error: error.message };
    }
  }

  static async loadBlogById(id) {
    try {
      const response = await fetch(`${this.BASE_URL}/blogs/${id}`);
      if (!response.ok) throw new Error(`Failed to fetch blog: ${response.status}`);
      
      // Check if response is JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server returned non-JSON response");
      }
      
      const blog = await response.json();
      return { data: blog, error: null };
    } catch (error) {
      console.error("Error loading blog by ID:", error);
      return { data: null, error: error.message };
    }
  }

  static async loadAllTags() {
    try {
      const response = await fetch(`${this.BASE_URL}/blogs`);
      if (!response.ok) throw new Error(`Failed to fetch tags: ${response.status}`);
      
      // Check if response is JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server returned non-JSON response");
      }
      
      const blogs = await response.json();
      const tags = Array.from(new Set(blogs.flatMap(blog => blog.tags || [])));
      return { data: tags, error: null };
    } catch (error) {
      console.error("Error loading tags:", error);
      return { data: [], error: error.message };
    }
  }
}
