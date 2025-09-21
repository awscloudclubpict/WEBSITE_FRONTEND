import { useState } from 'react';

export default function SignUpStudent() {
  const [formData, setFormData] = useState({
    userType: 'Student',
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobileNumber: '',
    collegeName: '',
    branch: '',
    yearOfStudy: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen" style={{background: 'var(--background)'}}>
      {/* Header */}
      <header className="px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 border border-white rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">aws</span>
            </div>
            <span className="text-white text-sm font-medium">PICT</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
            {/* Left Side - Form */}
            <div className="w-full max-w-md mx-auto lg:mx-0">
              {/* Title */}
              <div className="text-center lg:text-left mb-8">
                <h1 className="text-4xl font-bold text-white mb-2">Sign Up</h1>
                <p className="text-[#3498DB] text-lg">Join a community of cloud enthusiasts</p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* I am a dropdown */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    I am a:
                  </label>
                  <div className="relative">
                    <select
                      name="userType"
                      value={formData.userType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#2C3E50] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#3498DB] appearance-none"
                    >
                      <option value="Student">Student</option>
                      <option value="Professional">Professional</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Full Name */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter Your Full Name Here"
                    className="w-full px-4 py-3 bg-[#2C3E50] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#3498DB]"
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter Your Email Address Here"
                    className="w-full px-4 py-3 bg-[#2C3E50] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#3498DB]"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter Your Password Here"
                      className="w-full px-4 py-3 bg-[#2C3E50] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#3498DB] pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                    >
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {showPassword ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        )}
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm Password Here"
                      className="w-full px-4 py-3 bg-[#2C3E50] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#3498DB] pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                    >
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {showConfirmPassword ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        )}
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                    placeholder="Enter Your Mobile Number Here"
                    className="w-full px-4 py-3 bg-[#2C3E50] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#3498DB]"
                  />
                </div>

                {/* College/Institute Name */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    College/Institute Name
                  </label>
                  <input
                    type="text"
                    name="collegeName"
                    value={formData.collegeName}
                    onChange={handleInputChange}
                    placeholder="Enter Your College/Institute Name Here"
                    className="w-full px-4 py-3 bg-[#2C3E50] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#3498DB]"
                  />
                </div>

                {/* Branch/Department */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Branch/Department
                  </label>
                  <input
                    type="text"
                    name="branch"
                    value={formData.branch}
                    onChange={handleInputChange}
                    placeholder="Enter Your Branch Name Here"
                    className="w-full px-4 py-3 bg-[#2C3E50] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#3498DB]"
                  />
                </div>

                {/* Year of Study */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Year of Study
                  </label>
                  <div className="relative">
                    <select
                      name="yearOfStudy"
                      value={formData.yearOfStudy}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#2C3E50] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#3498DB] appearance-none"
                    >
                      <option value="">1st/2nd/3rd/4th as drop down</option>
                      <option value="1st">1st Year</option>
                      <option value="2nd">2nd Year</option>
                      <option value="3rd">3rd Year</option>
                      <option value="4th">4th Year</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Sign Up Button */}
                <button
                  type="submit"
                  className="w-full bg-[#3498DB] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#2980B9] transition-colors"
                >
                  Sign Up
                </button>

                {/* Login Link */}
                <div className="text-center">
                  <span className="text-white">Already have an account? </span>
                  <a href="#" className="text-[#3498DB] underline hover:text-[#2980B9] transition-colors">
                    Log In
                  </a>
                </div>
              </form>
            </div>

            {/* Right Side - Illustration */}
            <div className="hidden lg:flex justify-center items-center">
              <div className="relative w-full max-w-md h-[500px]">
                {/* Cloud Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#2C3E50] to-[#34495E] rounded-3xl overflow-hidden">
                  {/* Large Cloud Shape */}
                  <div className="absolute top-8 left-8 w-80 h-60 bg-gradient-to-br from-[#1A252F] to-[#2C3E50] rounded-full opacity-80"></div>
                  
                  {/* Person Figure */}
                  <div className="absolute bottom-0 right-8">
                    {/* Head */}
                    <div className="w-16 h-16 bg-[#D4A574] rounded-full relative mb-2">
                      {/* Hair */}
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-20 h-12 bg-[#2C1810] rounded-full"></div>
                      {/* Face */}
                      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-white rounded-full"></div>
                    </div>
                    
                    {/* Body */}
                    <div className="w-20 h-32 bg-[#3498DB] rounded-t-2xl relative">
                      {/* Shirt Pattern */}
                      <div className="absolute top-3 left-3 w-2 h-2 bg-white rounded-full"></div>
                      <div className="absolute top-3 right-3 w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    
                    {/* Arms */}
                    <div className="absolute -left-4 top-8 w-6 h-20 bg-[#D4A574] rounded-full transform rotate-12"></div>
                    <div className="absolute -right-4 top-8 w-6 h-20 bg-[#D4A574] rounded-full transform -rotate-12"></div>
                  </div>

                  {/* Floating Elements */}
                  <div className="absolute top-20 right-16 w-8 h-8 bg-white rounded-lg opacity-60"></div>
                  <div className="absolute top-32 right-24 w-6 h-6 bg-[#3498DB] rounded-full opacity-60"></div>
                  <div className="absolute top-40 right-12 w-4 h-4 bg-white rounded-full opacity-60"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
