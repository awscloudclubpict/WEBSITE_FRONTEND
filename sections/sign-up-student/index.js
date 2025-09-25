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
                  <option>Working Professional</option>
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

