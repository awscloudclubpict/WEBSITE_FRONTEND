"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation"; 

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [show, setShow] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Basic client-side validation
    if (!email || !password) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("https://webiste-aws.onrender.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password,
        }),
      });

      const data = await response.json();

      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(data.user)); // store user details only

        // If remember me is checked
        if (rememberMe) {
          localStorage.setItem("rememberMe", "true");
        }

        // Redirect to home OR dashboard
        router.push("/"); 

      } else if (response.status === 400) {
        if (data.error && Array.isArray(data.error)) {
          const errorMessages = data.error.map(err => err.message).join(", ");
          setError(errorMessages);
        } else {
          setError("Invalid input. Please check your credentials.");
        }
      } else if (response.status === 401) {
        setError(data.error || "Invalid email or password");
      } else {
        setError(data.error || data.message || "Login failed. Please try again.");
      }

    } catch (err) {
      if (err.message.includes("Failed to fetch")) {
        setError("Cannot connect to server. Please check your connection.");
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-transparent relative overflow-hidden" suppressHydrationWarning>
      {/*logo*/}
      <div className="absolute left-4 sm:left-6 lg:left-10 top-4 z-50">
        <Image
          src="/Sample.png"
          alt="Sample illustration"
          width={300}
          height={300}
          className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 object-contain"
          priority
        />
      </div>

      <div className="relative min-h-screen grid place-items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 w-full max-w-md sm:max-w-lg lg:max-w-2xl xl:max-w-3xl">
          {/* Main Content */}
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">
              Log In
            </h1>
            <p className="text-[#327ED7] text-lg sm:text-xl lg:text-2xl">
              Join a community of cloud enthusiasts
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6" suppressHydrationWarning>
            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg text-sm sm:text-base">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-white text-lg sm:text-xl lg:text-2xl font-bold mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your Email Address Here"
                className="w-full px-3 py-3 sm:px-4 sm:py-4 bg-[#0A0C27] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm sm:text-base"
                required
                disabled={isLoading}
                suppressHydrationWarning
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-white text-lg sm:text-xl lg:text-2xl font-bold mb-1">
                Password
              </label>
              <div className="relative w-full">
                <input
                  id="password"
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Your Password Here"
                  className="w-full px-3 py-3 sm:px-4 sm:py-4 bg-[#0A0C27] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm sm:text-base"
                  required
                  minLength={6}
                  disabled={isLoading}
                  suppressHydrationWarning
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  aria-label={show ? "Hide password" : "Show password"}
                  disabled={isLoading}
                  suppressHydrationWarning
                >
                  {show ? (
                    <EyeIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                  ) : (
                    <EyeSlashIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                type="button"
                className="text-blue-400 hover:text-blue-300 text-base sm:text-lg font-medium disabled:opacity-50"
                disabled={isLoading}
                suppressHydrationWarning
              >
                Forgot Password?
              </button>
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 bg-gray-800 border-gray-900 rounded focus:ring-blue-500 focus:ring-2"
                disabled={isLoading}
              />
              <label htmlFor="remember-me" className="ml-3 text-white text-base sm:text-lg font-extralight">
                Remember Me
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-[#327ED7] hover:bg-blue-700 text-white text-lg sm:text-xl font-semibold py-3 sm:py-4 px-4 rounded-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
              suppressHydrationWarning
            >
              {isLoading ? "Logging In..." : "Log In"}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="text-center mt-6 sm:mt-8">
            <span className="text-white text-lg sm:text-xl lg:text-2xl">
              Don't have an account?{" "}
            </span>
            <button 
              className="text-blue-400 hover:text-blue-300 text-lg sm:text-xl lg:text-2xl font-medium"
              disabled={isLoading}
              onClick={() => router.push("/signup-student")}
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* Second Image */}
        <div className="pointer-events-none absolute top-1/2 -translate-y-1/2 left-1/2 translate-x-8 sm:translate-x-16 lg:translate-x-32 xl:translate-x-48 hidden lg:block w-48 xl:w-64 2xl:w-80">
          <Image
            src="/Sample.png"
            alt="Sample illustration"
            width={300}
            height={300}
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}