// import { useState } from 'react';
// import Image from 'next/image';

// export default function SignUpStudent() {
//   const [formData, setFormData] = useState({
//     userType: 'Student',
//     fullName: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     mobileNumber: '',
//     collegeName: '',
//     branch: '',
//     yearOfStudy: ''
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Form submitted:', formData);
//   };

//   return (
//     <div className="min-h-screen" style={{background: '#0F1419'}}>
//       {/* Header */}
//       <header className="px-6 py-4">
//         <div className="max-w-7xl mx-auto flex items-center justify-between">
//           {/* Logo */}
//           <div className="flex items-center space-x-2">
//             <div className="w-8 h-8 border border-white rounded-lg flex items-center justify-center">
//               <span className="text-white text-sm font-bold">aws</span>
//             </div>
//             <span className="text-white text-sm font-medium">PICT</span>
//           </div>
          
//           {/* Page Title */}
//           <div className="text-center">
//             <h2 className="text-white text-lg font-medium">Sign Up Page - student only</h2>
//           </div>
          
//           {/* Empty div for balance */}
//           <div className="w-24"></div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="flex min-h-screen items-center justify-center bg-[#0F1419] px-0">
//         <div className="flex flex-col lg:flex-row items-center justify-center gap-8 w-full max-w-5xl mx-auto">
//             <div className="w-full max-w-md bg-transparent py-12 px-8 rounded-xl shadow-none">
//                 {/* <div className="w-full max-w-lg mx-auto bg-transparent"> */}
//               {/* Title */}
//               <div className="text-center mb-8">
//                 <h1 className="text-4xl font-bold text-white mb-2">Sign Up</h1>
//                 <p className="text-[#3498DB] text-lg">Join a community of cloud enthusiasts</p>
//               </div>

//               {/* Form */}
//               <form onSubmit={handleSubmit} className="space-y-6">
//                 {/* I am a dropdown */}
//                 <div className="space-y-3">
//                   <label className="block text-white text-sm font-medium">
//                     I am a:
//                   </label>
//                   <div className="relative">
//                     <select
//                       name="userType"
//                       value={formData.userType}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-4 bg-[#2C3E50] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#3498DB] appearance-none text-base"
//                     >
//                       <option value="Student">Student</option>
//                       <option value="Professional">Professional</option>
//                     </select>
//                     <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
//                       <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                       </svg>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Full Name */}
//                 <div className="space-y-3">
//                   <label className="block text-white text-sm font-medium">
//                     Full Name
//                   </label>
//                   <input
//                     type="text"
//                     name="fullName"
//                     value={formData.fullName}
//                     onChange={handleInputChange}
//                     placeholder="Enter Your Full Name Here"
//                     className="w-full px-4 py-4 bg-[#2C3E50] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#3498DB] text-base"
//                   />
//                 </div>

//                 {/* Email Address */}
//                 <div className="space-y-3">
//                   <label className="block text-white text-sm font-medium">
//                     Email Address
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     placeholder="Enter Your Email Address Here"
//                     className="w-full px-4 py-4 bg-[#2C3E50] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#3498DB] text-base"
//                   />
//                 </div>

//                 {/* Password */}
//                 <div className="space-y-3">
//                   <label className="block text-white text-sm font-medium">
//                     Password
//                   </label>
//                   <div className="relative">
//                     <input
//                       type={showPassword ? "text" : "password"}
//                       name="password"
//                       value={formData.password}
//                       onChange={handleInputChange}
//                       placeholder="Enter Your Password Here"
//                       className="w-full px-4 py-4 bg-[#2C3E50] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#3498DB] pr-10 text-base"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowPassword(!showPassword)}
//                       className="absolute inset-y-0 right-0 flex items-center pr-3"
//                     >
//                       <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         {showPassword ? (
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
//                         ) : (
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                         )}
//                       </svg>
//                     </button>
//                   </div>
//                 </div>

//                 {/* Confirm Password */}
//                 <div className="space-y-3">
//                   <label className="block text-white text-sm font-medium">
//                     Confirm Password
//                   </label>
//                   <div className="relative">
//                     <input
//                       type={showConfirmPassword ? "text" : "password"}
//                       name="confirmPassword"
//                       value={formData.confirmPassword}
//                       onChange={handleInputChange}
//                       placeholder="Confirm Password Here"
//                       className="w-full px-4 py-4 bg-[#2C3E50] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#3498DB] pr-10 text-base"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                       className="absolute inset-y-0 right-0 flex items-center pr-3"
//                     >
//                       <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         {showConfirmPassword ? (
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
//                         ) : (
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                         )}
//                       </svg>
//                     </button>
//                   </div>
//                 </div>

//                 {/* Mobile Number */}
//                 <div className="space-y-3">
//                   <label className="block text-white text-sm font-medium">
//                     Mobile Number
//                   </label>
//                   <input
//                     type="tel"
//                     name="mobileNumber"
//                     value={formData.mobileNumber}
//                     onChange={handleInputChange}
//                     placeholder="Enter Your Mobile Number Here"
//                     className="w-full px-4 py-4 bg-[#2C3E50] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#3498DB] text-base"
//                   />
//                 </div>

//                 {/* College/Institute Name */}
//                 <div className="space-y-3">
//                   <label className="block text-white text-sm font-medium">
//                     College/Institute Name
//                   </label>
//                   <input
//                     type="text"
//                     name="collegeName"
//                     value={formData.collegeName}
//                     onChange={handleInputChange}
//                     placeholder="Enter Your College/Institute Name Here"
//                     className="w-full px-4 py-4 bg-[#2C3E50] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#3498DB] text-base"
//                   />
//                 </div>

//                 {/* Branch/Department */}
//                 <div className="space-y-3">
//                   <label className="block text-white text-sm font-medium">
//                     Branch/Department
//                   </label>
//                   <input
//                     type="text"
//                     name="branch"
//                     value={formData.branch}
//                     onChange={handleInputChange}
//                     placeholder="Enter Your Branch Name Here"
//                     className="w-full px-4 py-4 bg-[#2C3E50] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#3498DB] text-base"
//                   />
//                 </div>

//                 {/* Year of Study */}
//                 <div className="space-y-3">
//                   <label className="block text-white text-sm font-medium">
//                     Year of Study
//                   </label>
//                   <div className="relative">
//                     <select
//                       name="yearOfStudy"
//                       value={formData.yearOfStudy}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-4 bg-[#2C3E50] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#3498DB] appearance-none text-base"
//                     >
//                       <option value="">1st/2nd/3rd/4th as drop down</option>
//                       <option value="1st">1st Year</option>
//                       <option value="2nd">2nd Year</option>
//                       <option value="3rd">3rd Year</option>
//                       <option value="4th">4th Year</option>
//                     </select>
//                     <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
//                       <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                       </svg>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Sign Up Button */}
//                 <div className="pt-4">
//                   <button
//                     type="submit"
//                     className="w-full bg-[#3498DB] text-white py-4 px-6 rounded-lg font-medium hover:bg-[#2980B9] transition-colors text-base"
//                   >
//                     Sign Up
//                   </button>
//                 </div>

//                 {/* Login Link */}
//                 <div className="text-center pt-4">
//                   <span className="text-white">Already have an account? </span>
//                   <a href="#" className="text-[#3498DB] underline hover:text-[#2980B9] transition-colors">
//                     Log In
//                   </a>
//                 </div>
//               </form>
//             </div>

//             {/* Right Side - Image */}
//             <div className="hidden lg:flex justify-center items-center">
//               <div className="relative w-[350px] h-[350px]">
//                 <Image
//                   src="/signup.png"
//                   alt="Sign Up Illustration"
//                   fill
//                   className="object-contain"
//                   priority
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }
import React, { useState } from 'react';

// Inlining the CSS to resolve the path issue and make the component self-contained.
const SignUpStyles = () => (
  <style>{`
    .signup-container {
      background-color: #060717;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
      font-family: 'Inter', sans-serif;
      padding: 1.5rem;
      position: relative;
      overflow: hidden;
    }
    .signup-logo-container {
      position: absolute;
      top: 1.5rem;
      left: 2rem;
      z-index: 10;
    }
    .signup-illustration {
      position: absolute;
      bottom: 1rem;
      right: 1rem;
      opacity: 0.5;
      pointer-events: none;
      z-index: 0;
    }
    @media (min-width: 768px) {
      .signup-illustration {
        opacity: 1;
        bottom: 2rem;
        right: 4rem;
      }
    }
    .signup-form-wrapper {
      width: 100%;
      max-width: 28rem;
      position: relative;
      z-index: 5;
    }
    .signup-header {
      text-align: center;
      margin-bottom: 2rem;
    }
    .signup-title {
      font-size: 2.25rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }
    .signup-subtitle {
      color: #67a5de;
    }
    .signup-form {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    .signup-input-group {
      display: flex;
      flex-direction: column;
    }
    .signup-label {
      display: block;
      font-size: 0.875rem;
      font-weight: 500;
      margin-bottom: 0.3rem;
      color: #E5E7EB;
    }
    .signup-input,
    .signup-select {
      width: 100%;
      background-color: #071128;
      border: 1px solid #1f2937;
      border-radius: 0.375rem;
      padding: 0.75rem 1rem;
      color: #ffffff;
      outline: none;
      transition: border-color 0.2s, box-shadow 0.2s;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
    }
    .signup-input::placeholder {
      color: #6b7280;
    }
    .signup-input:focus,
    .signup-select:focus {
      border-color: #327dd6;
      box-shadow: 0 0 0 2px rgba(50, 125, 214, 0.5);
    }
    .custom-select-wrapper {
      position: relative;
    }
    .custom-select-wrapper::after {
      content: '▼';
      font-size: 0.8rem;
      color: #9ca3af;
      position: absolute;
      right: 1rem;
      top: 50%;
      transform: translateY(-50%);
      pointer-events: none;
    }
    .signup-button {
      width: 100%;
      background-color: #327dd6;
      color: white;
      font-weight: bold;
      padding: 0.8rem 1rem;
      border-radius: 0.375rem;
      transition: background-color 0.3s ease;
      border: none;
      cursor: pointer;
      margin-top: 1rem;
    }
    .signup-button:hover {
      background-color: #2563eb;
    }
    .signup-login-prompt {
      text-align: center;
      margin-top: 1.5rem;
      font-size: 0.875rem;
    }
    .signup-login-link {
      color: #67a5de;
      font-weight: 500;
      text-decoration: none;
    }
    .signup-login-link:hover {
      text-decoration: underline;
    }
  `}</style>
);

// Component for the logo in the top-left corner
const Logo = () => (
    // Replace the src with the actual path to your logo, e.g., '/logo.png'
    <img 
        src="/aws-logo.png" 
        alt="AWS PICT Logo" 
        width="120" 
        height="60" 
        className="object-contain"
    />
);

// Component for the illustration in the bottom-right corner
const SideIllustration = () => (
    // Replace the src with the actual path to your illustration, e.g., '/side-illustration.png'
    <img 
        src="/signup.png" 
        alt="Illustration of a person with a cloud"
        width="220"
        height="220"
        className="signup-illustration"
    />
);

export default function SignUpStudent() {
  const [formData, setFormData] = useState({
    role: 'Student',
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobileNumber: '',
    collegeName: '',
    branch: '',
    yearOfStudy: '1st'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // Handle form submission logic here
    console.log('Form data submitted:', formData);
    alert('Sign up successful! (Check console for data)');
  };

  return (
    <>
      <SignUpStyles />
      <div className="signup-container">
        <div className="signup-logo-container">
           <Logo />
        </div>
        
        <SideIllustration />

        <div className="signup-form-wrapper">
          <div className="signup-header">
            <h1 className="signup-title">Sign Up</h1>
            <p className="signup-subtitle">Join a community of cloud enthusiasts</p>
          </div>

          <form onSubmit={handleSubmit} className="signup-form">
            {/* Form fields */}
            <div className="signup-input-group">
              <label htmlFor="role" className="signup-label">I am a:</label>
              <div className="custom-select-wrapper">
                <select id="role" name="role" value={formData.role} onChange={handleChange} className="signup-select">
                  <option>Student</option>
                  <option>Professor</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div className="signup-input-group">
              <label htmlFor="fullName" className="signup-label">Full Name</label>
              <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Enter Your Full Name Here" className="signup-input" required />
            </div>
            
            <div className="signup-input-group">
              <label htmlFor="email" className="signup-label">Email Address</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter Your Email Address Here" className="signup-input" required />
            </div>

            <div className="signup-input-group">
              <label htmlFor="password"className="signup-label">Password</label>
              <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter Your Password Here" className="signup-input" required />
            </div>

            <div className="signup-input-group">
              <label htmlFor="confirmPassword"className="signup-label">Confirm Password</label>
              <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password Here" className="signup-input" required />
            </div>
            
            <div className="signup-input-group">
              <label htmlFor="mobileNumber" className="signup-label">Mobile Number</label>
              <input type="tel" id="mobileNumber" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} placeholder="Enter Your Mobile Number Here" className="signup-input" required />
            </div>

            <div className="signup-input-group">
              <label htmlFor="collegeName" className="signup-label">College/Institute Name</label>
              <input type="text" id="collegeName" name="collegeName" value={formData.collegeName} onChange={handleChange} placeholder="Enter Your College/Institute Name Here" className="signup-input" required />
            </div>
            
            <div className="signup-input-group">
              <label htmlFor="branch" className="signup-label">Branch/Department</label>
              <input type="text" id="branch" name="branch" value={formData.branch} onChange={handleChange} placeholder="Enter Your Branch Name Here" className="signup-input" required />
            </div>
            
            <div className="signup-input-group">
              <label htmlFor="yearOfStudy" className="signup-label">Year of Study</label>
               <div className="custom-select-wrapper">
                <select id="yearOfStudy" name="yearOfStudy" value={formData.yearOfStudy} onChange={handleChange} className="signup-select">
                  <option>1st</option>
                  <option>2nd</option>
                  <option>3rd</option>
                  <option>4th</option>
                </select>
              </div>
            </div>

            <button type="submit" className="signup-button">
              Sign Up
            </button>
          </form>
          
          <p className="signup-login-prompt">
            Already have an account ? <a href="#" className="signup-login-link">Log In</a>
          </p>
        </div>
      </div>
    </>
  );
}

