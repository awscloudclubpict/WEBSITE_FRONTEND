import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

// Inlining the CSS to resolve the path issue and make the component self-contained.
const SignUpStyles = () => (
  <style>{`
    .signup-container {
      background: transparent;
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
    .signup-button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
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
      cursor: pointer;
    }
    .signup-login-link:hover {
      text-decoration: underline;
    }
    .error-message {
      background-color: rgba(239, 68, 68, 0.1);
      border: 1px solid #ef4444;
      color: #ef4444;
      padding: 0.75rem;
      border-radius: 0.375rem;
      margin-bottom: 1rem;
      font-size: 0.875rem;
    }
    .success-message {
      background-color: rgba(34, 197, 94, 0.1);
      border: 1px solid #22c55e;
      color: #22c55e;
      padding: 0.75rem;
      border-radius: 0.375rem;
      margin-bottom: 1rem;
      font-size: 0.875rem;
    }
    .field-error {
      border-color: #ef4444 !important;
      box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2) !important;
    }
    .error-list {
      margin: 0;
      padding-left: 1rem;
    }
    .error-item {
      margin: 0.25rem 0;
    }
  `}</style>
);

// Component for the logo in the top-left corner
const Logo = () => (
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
  <img 
    src="/signup.png" 
    alt="Illustration of a person with a cloud"
    width="220"
    height="220"
    className="signup-illustration"
  />
);



export default function SignUpStudent() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    role: 'Student',
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobileNumber: '',
    collegeName: '',
    branch: '',
    yearOfStudy: '1' // Changed to number string
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear errors when user starts typing
    if (error) setError('');
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const extractFieldErrors = (zodErrors) => {
    const errors = {};
    zodErrors.forEach(error => {
      const field = error.path[0];
      errors[field] = error.message;
    });
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setFieldErrors({});
    setIsLoading(true);

    // Client-side validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      setIsLoading(false);
      return;
    }

    // Validate mobile number format
    const mobileRegex = /^[0-9]{10}$/;
    const cleanMobile = formData.mobileNumber.replace(/\D/g, '');
    if (!mobileRegex.test(cleanMobile)) {
      setError("Please enter a valid 10-digit mobile number");
      setIsLoading(false);
      return;
    }

    try {
      // Prepare data according to backend schema
      const submitData = {
        fullName: formData.fullName.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        mobileNumber: cleanMobile,
        collegeName: formData.collegeName.trim(),
        branch: formData.branch.trim(),
        yearOfStudy: parseInt(formData.yearOfStudy) // Convert to number
      };

      console.log('Submitting data:', submitData);

      const response = await fetch("https://webiste-aws.onrender.com/auth/register/student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      const data = await response.json();

      console.log('Response status:', response.status);
      console.log('Response data:', data);

      if (response.ok) {
        setSuccess('Account created successfully! Redirecting to login...');
        console.log('Student registered successfully:', data.user);
        
        // Redirect to login after 2 seconds
        setTimeout(() => {
          router.push('/login');
        }, 2000);
        
      } else if (response.status === 400) {
        // Handle Zod validation errors
        if (data.error && Array.isArray(data.error)) {
          const fieldErrors = extractFieldErrors(data.error);
          setFieldErrors(fieldErrors);
          
          // Create detailed error message
          const errorMessages = data.error.map(err => 
            `${err.path.join('.')}: ${err.message}`
          ).join(', ');
          setError(`Validation errors: ${errorMessages}`);
        } else {
          setError(data.error || "Invalid input. Please check your information.");
        }
      } else if (response.status === 409) {
        setError("An account with this email already exists. Please use a different email or login.");
      } else if (response.status === 500) {
        setError("Server error. Please try again later.");
      } else {
        setError(data.error || data.message || "Registration failed. Please try again.");
      }

    } catch (err) {
      console.error('Registration error:', err);
      if (err.message.includes("Failed to fetch")) {
        setError("Cannot connect to server. Please check your internet connection and try again.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const goToLogin = () => {
    router.push('/login');
  };

  // Helper function to check if a field has error
  const getFieldClassName = (fieldName) => {
    return fieldErrors[fieldName] ? 'signup-input field-error' : 'signup-input';
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
            {/* Error Message */}
            {error && (
              <div className="error-message">
                <strong>Error:</strong> {error}
                {fieldErrors && Object.keys(fieldErrors).length > 0 && (
                  <ul className="error-list">
                    {Object.entries(fieldErrors).map(([field, errorMsg]) => (
                      <li key={field} className="error-item">
                        <strong>{field}:</strong> {errorMsg}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="success-message">
                {success}
              </div>
            )}

            {/* Form fields */}
            <div className="signup-input-group">
              <label htmlFor="role" className="signup-label">I am a:</label>
              <div className="custom-select-wrapper">
                <select 
                  id="role" 
                  name="role" 
                  value={formData.role} 
                  onChange={handleChange} 
                  className="signup-select"
                  disabled={isLoading}
                >
                  <option>Student</option>
                  <option>Working Professional</option>
                </select>
              </div>
            </div>

            <div className="signup-input-group">
              <label htmlFor="fullName" className="signup-label">Full Name *</label>
              <input 
                type="text" 
                id="fullName" 
                name="fullName" 
                value={formData.fullName} 
                onChange={handleChange} 
                placeholder="Enter Your Full Name Here" 
                className={getFieldClassName('fullName')}
                required 
                disabled={isLoading}
                minLength={3}
              />
              {fieldErrors.fullName && <small style={{color: '#ef4444', marginTop: '0.25rem'}}>{fieldErrors.fullName}</small>}
            </div>
            
            <div className="signup-input-group">
              <label htmlFor="email" className="signup-label">Email Address *</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                placeholder="Enter Your Email Address Here" 
                className={getFieldClassName('email')}
                required 
                disabled={isLoading}
              />
              {fieldErrors.email && <small style={{color: '#ef4444', marginTop: '0.25rem'}}>{fieldErrors.email}</small>}
            </div>

            <div className="signup-input-group">
              <label htmlFor="password" className="signup-label">Password *</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                placeholder="Enter Your Password Here (min. 6 characters)" 
                className={getFieldClassName('password')}
                required 
                minLength={6}
                disabled={isLoading}
              />
              {fieldErrors.password && <small style={{color: '#ef4444', marginTop: '0.25rem'}}>{fieldErrors.password}</small>}
            </div>

            <div className="signup-input-group">
              <label htmlFor="confirmPassword" className="signup-label">Confirm Password *</label>
              <input 
                type="password" 
                id="confirmPassword" 
                name="confirmPassword" 
                value={formData.confirmPassword} 
                onChange={handleChange} 
                placeholder="Confirm Password Here" 
                className={getFieldClassName('confirmPassword')}
                required 
                minLength={6}
                disabled={isLoading}
              />
              {fieldErrors.confirmPassword && <small style={{color: '#ef4444', marginTop: '0.25rem'}}>{fieldErrors.confirmPassword}</small>}
            </div>
            
            <div className="signup-input-group">
              <label htmlFor="mobileNumber" className="signup-label">Mobile Number *</label>
              <input 
                type="tel" 
                id="mobileNumber" 
                name="mobileNumber" 
                value={formData.mobileNumber} 
                onChange={handleChange} 
                placeholder="Enter 10-digit Mobile Number" 
                className={getFieldClassName('mobileNumber')}
                required 
                disabled={isLoading}
                pattern="[0-9]{10}"
                maxLength="10"
              />
              {fieldErrors.mobileNumber && <small style={{color: '#ef4444', marginTop: '0.25rem'}}>{fieldErrors.mobileNumber}</small>}
            </div>

            <div className="signup-input-group">
              <label htmlFor="collegeName" className="signup-label">College/Institute Name *</label>
              <input 
                type="text" 
                id="collegeName" 
                name="collegeName" 
                value={formData.collegeName} 
                onChange={handleChange} 
                placeholder="Enter Your College/Institute Name Here" 
                className={getFieldClassName('collegeName')}
                required 
                disabled={isLoading}
                minLength={2}
              />
              {fieldErrors.collegeName && <small style={{color: '#ef4444', marginTop: '0.25rem'}}>{fieldErrors.collegeName}</small>}
            </div>
            
            <div className="signup-input-group">
              <label htmlFor="branch" className="signup-label">Branch/Department *</label>
              <input 
                type="text" 
                id="branch" 
                name="branch" 
                value={formData.branch} 
                onChange={handleChange} 
                placeholder="Enter Your Branch Name Here" 
                className={getFieldClassName('branch')}
                required 
                disabled={isLoading}
                minLength={2}
              />
              {fieldErrors.branch && <small style={{color: '#ef4444', marginTop: '0.25rem'}}>{fieldErrors.branch}</small>}
            </div>
            
            <div className="signup-input-group">
              <label htmlFor="yearOfStudy" className="signup-label">Year of Study *</label>
              <div className="custom-select-wrapper">
                <select 
                  id="yearOfStudy" 
                  name="yearOfStudy" 
                  value={formData.yearOfStudy} 
                  onChange={handleChange} 
                  className="signup-select"
                  disabled={isLoading}
                >
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                </select>
              </div>
              {fieldErrors.yearOfStudy && <small style={{color: '#ef4444', marginTop: '0.25rem'}}>{fieldErrors.yearOfStudy}</small>}
            </div>

            <button 
              type="submit" 
              className="signup-button"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>
          
          <p className="signup-login-prompt">
            Already have an account?{' '}
            <span 
              className="signup-login-link" 
              onClick={goToLogin}
            >
              Log In
            </span>
          </p>
        </div>
      </div>
    </>
  );
}

