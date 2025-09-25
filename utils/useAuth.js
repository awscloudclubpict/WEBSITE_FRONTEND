import { useState, useEffect, createContext, useContext } from "react";
import { authAPI, handleApiError } from "./api";

// Create Auth Context
const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      setIsLoading(true);
      const profile = await authAPI.getProfile();
      setUser(profile);
      setIsAuthenticated(true);
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await authAPI.login(email, password);
      setUser(response);
      setIsAuthenticated(true);
      return { success: true, data: response };
    } catch (error) {
      const message = handleApiError(error, "Login failed");
      return { success: false, error: message };
    }
  };

  const registerStudent = async (studentData) => {
    try {
      const response = await authAPI.registerStudent(studentData);
      setUser(response);
      setIsAuthenticated(true);
      return { success: true, data: response };
    } catch (error) {
      const message = handleApiError(error, "Registration failed");
      return { success: false, error: message };
    }
  };

  const registerProfessional = async (professionalData) => {
    try {
      const response = await authAPI.registerProfessional(professionalData);
      setUser(response);
      setIsAuthenticated(true);
      return { success: true, data: response };
    } catch (error) {
      const message = handleApiError(error, "Registration failed");
      return { success: false, error: message };
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
      setUser(null);
      setIsAuthenticated(false);
      return { success: true };
    } catch (error) {
      // Even if logout fails on server, clear local state
      setUser(null);
      setIsAuthenticated(false);
      return { success: true };
    }
  };

  const value = {
    user,
    isLoading,
    isAuthenticated,
    login,
    registerStudent,
    registerProfessional,
    logout,
    checkAuthStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// HOC to protect routes that require authentication
export const withAuth = (WrappedComponent) => {
  return function AuthenticatedComponent(props) {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
        </div>
      );
    }

    if (!isAuthenticated) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Authentication Required
            </h2>
            <p className="text-gray-600">Please log in to access this page.</p>
          </div>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };
};

export default useAuth;
