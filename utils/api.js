// API utility functions with proper error handling and authentication
const BASE_URL = "https://website-backend-lkns.onrender.com";

// Generic API call function with error handling and retry logic
const apiCall = async (endpoint, options = {}, retries = 2) => {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const config = {
        credentials: "include", // Always include cookies for JWT token
        mode: "cors", // Explicitly set CORS mode
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      };

      console.log(
        `Making API call (attempt ${attempt + 1}/${
          retries + 1
        }) to: ${BASE_URL}${endpoint}`
      );

      // Add timeout for Render.com cold starts
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      config.signal = controller.signal;

      const response = await fetch(`${BASE_URL}${endpoint}`, config);

      clearTimeout(timeoutId);

      console.log(`API Response status: ${response.status} for ${endpoint}`);

      if (!response.ok) {
        let errorData = {};
        try {
          const text = await response.text();
          errorData = text ? JSON.parse(text) : {};
        } catch (parseError) {
          console.error("Failed to parse error response:", parseError);
        }
        throw new Error(
          errorData.message || `HTTP ${response.status}: ${response.statusText}`
        );
      }

      // Check if response has content
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        console.log(`API Success for ${endpoint}:`, data);
        return data;
      }
      return response;
    } catch (error) {
      console.error(
        `API call failed (attempt ${attempt + 1}) for ${endpoint}:`,
        error
      );

      // If this is the last attempt, throw the error
      if (attempt === retries) {
        // Check if it's a network error
        if (
          error.name === "TypeError" &&
          error.message.includes("Failed to fetch")
        ) {
          throw new Error(
            "Network error: Unable to connect to server. The server might be starting up (Render.com cold start). Please wait a moment and try again."
          );
        }

        if (error.name === "AbortError") {
          throw new Error(
            "Request timeout: Server is taking too long to respond. It might be starting up. Please try again in a few moments."
          );
        }

        throw error;
      }

      // Wait before retrying (exponential backoff)
      await new Promise((resolve) =>
        setTimeout(resolve, Math.pow(2, attempt) * 1000)
      );
    }
  }
};

// Authentication API calls
export const authAPI = {
  login: async (email, password) => {
    return apiCall("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },

  registerStudent: async (studentData) => {
    return apiCall("/auth/register/student", {
      method: "POST",
      body: JSON.stringify(studentData),
    });
  },

  registerProfessional: async (professionalData) => {
    return apiCall("/auth/register/professional", {
      method: "POST",
      body: JSON.stringify(professionalData),
    });
  },

  logout: async () => {
    return apiCall("/auth/logout", { method: "POST" });
  },

  getProfile: async () => {
    return apiCall("/profile");
  },
};

// Team Members API calls
export const teamAPI = {
  // Public routes (no auth required)
  getAll: async () => {
    return apiCall("/team-members/", {
      headers: {}, // Remove auth headers for public routes
    });
  },

  getByDepartment: async (department) => {
    return apiCall(`/team-members/${department}`, {
      headers: {}, // Remove auth headers for public routes
    });
  },

  // Admin routes (auth required)
  create: async (memberData) => {
    return apiCall("/team-members/", {
      method: "POST",
      body: JSON.stringify(memberData),
    });
  },

  update: async (id, memberData) => {
    return apiCall(`/team-members/${id}`, {
      method: "PUT",
      body: JSON.stringify(memberData),
    });
  },

  delete: async (id) => {
    return apiCall(`/team-members/${id}`, {
      method: "DELETE",
    });
  },

  // Create with image upload
  createWithImage: async (formData) => {
    return apiCall("/team-members/create-with-image", {
      method: "POST",
      headers: {}, // Let browser set content-type for FormData
      body: formData,
    });
  },
};

// Events API calls
export const eventsAPI = {
  getAll: async () => {
    return apiCall("/events/");
  },

  getByCategory: async (category) => {
    return apiCall(`/events/category/${category.toLowerCase()}`);
  },

  create: async (eventData) => {
    return apiCall("/events/create", {
      method: "POST",
      body: JSON.stringify(eventData),
    });
  },

  createWithImage: async (formData) => {
    return apiCall("/events/create-with-image", {
      method: "POST",
      headers: {}, // Let browser set content-type for FormData
      body: formData,
    });
  },

  update: async (eventId, eventData) => {
    return apiCall(`/events/${eventId}`, {
      method: "PUT",
      body: JSON.stringify(eventData),
    });
  },

  updateWithImage: async (eventId, formData) => {
    return apiCall(`/events/${eventId}/with-image`, {
      method: "PUT",
      headers: {}, // Let browser set content-type for FormData
      body: formData,
    });
  },

  delete: async (eventId) => {
    return apiCall(`/events/${eventId}`, {
      method: "DELETE",
    });
  },

  debugToken: async () => {
    return apiCall("/events/debug-token");
  },
};

// Blog API calls (based on existing usage)
export const blogAPI = {
  addBlog: async (formData) => {
    return apiCall("/addBlog", {
      method: "POST",
      headers: {}, // Let browser set content-type for FormData
      body: formData,
    });
  },

  sendEmail: async (emailData) => {
    return apiCall("/sendEmail", {
      method: "POST",
      body: JSON.stringify(emailData),
    });
  },
};

// Test connectivity
export const testAPI = {
  checkStatus: async () => {
    return apiCall("/", {
      headers: {}, // No auth needed for status check
    });
  },

  testEndpoint: async () => {
    return apiCall("/test", {
      headers: {}, // No auth needed for test endpoint
    });
  },
};

// Utility functions for error handling
export const handleApiError = (error, defaultMessage = "An error occurred") => {
  console.error("API Error:", error);

  if (
    error.message.includes("Network error") ||
    error.message.includes("cold start")
  ) {
    return "⏳ Server is starting up. Please wait a moment and try again.";
  } else if (error.message.includes("Request timeout")) {
    return "⏱️ Server is taking longer than usual. Please try again in a few moments.";
  } else if (error.message.includes("401")) {
    return "🔒 Unauthorized. Please log in again.";
  } else if (error.message.includes("403")) {
    return "⛔ Access forbidden. You do not have permission.";
  } else if (error.message.includes("409")) {
    return "⚠️ Data conflict. This item may already exist.";
  } else if (error.message.includes("500")) {
    return "🔧 Server error. Please try again later.";
  } else if (
    error.message.includes("NetworkError") ||
    error.message.includes("Failed to fetch")
  ) {
    return "🌐 Network error. Please check your internet connection.";
  }

  return error.message || defaultMessage;
};

// Check if user is authenticated
export const checkAuth = async () => {
  try {
    const profile = await authAPI.getProfile();
    return { isAuthenticated: true, user: profile };
  } catch (error) {
    return { isAuthenticated: false, user: null };
  }
};

export default {
  authAPI,
  teamAPI,
  eventsAPI,
  blogAPI,
  testAPI,
  handleApiError,
  checkAuth,
};
