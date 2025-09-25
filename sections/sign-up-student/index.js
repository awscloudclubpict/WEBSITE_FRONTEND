import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

export default function SignUpStudent() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    profession: "student",
    fullname: "",
    email: "",
    password: "",
    confirm_password: "",
    mobile_number: "",
    college_name: "",
    year_of_study: "",
    branch: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Handle profession dropdown change for navigation
    if (name === "profession") {
      if (value === "professional") {
        router.push("/sign-up-working-professional");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password match
    if (formData.password !== formData.confirm_password) {
      alert("Passwords do not match!");
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare data for API call - using your backend structure
      const apiData = {
        fullname: formData.fullname,
        email: formData.email,
        password: formData.password,
        mobile_number: formData.mobile_number,
        college_name: formData.college_name,
        branch: formData.branch,
        year_of_study: formData.year_of_study,
        profession: "student",
      };

      console.log("Submitting Student Sign Up:", apiData);

      // Call your backend API for student signup
      const response = await fetch(
        "https://website-backend-lkns.onrender.com/auth/signup/student",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(apiData),
        }
      );

      const result = await response.json();

      if (response.ok) {
        alert("✅ Student account created successfully!");
        console.log("Signup success:", result);

        // Redirect to main home page after successful signup
        router.push("/home");
      } else {
        // Handle API errors
        const errorMessage = result.message || result.error || "Signup failed";
        alert(`❌ Error: ${errorMessage}`);
        console.error("Signup error:", result);
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("❌ Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLoginRedirect = () => {
    router.push("/login");
  };

  return (
    <>
      <Head>
        <title>Sign Up - Student | AWS Cloud Club PICT</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="signup-page">
        {/* Logo Container */}
        <div className="logo-container">
          <img src="/aws-logo.png" alt="AWS Logo" />
          <span>PICT</span>
        </div>

        {/* Main Sign-up Container */}
        <div className="main-container">
          <div className="header">
            <h1 className="header-text">Sign Up</h1>
            <p className="subtitle">Join a community of cloud enthusiasts</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="profession">I am a:</label>
              <select
                id="profession"
                name="profession"
                className="dark-input"
                value={formData.profession}
                onChange={handleInputChange}
              >
                <option value="professional">Working Professional</option>
                <option value="student">Student</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="fullname">Full Name</label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                placeholder="Enter Your Full Name Here"
                className="dark-input"
                value={formData.fullname}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter Your Email Address Here"
                className="dark-input"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter Your Password Here"
                className="dark-input"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirm_password">Confirm Password</label>
              <input
                type="password"
                id="confirm_password"
                name="confirm_password"
                placeholder="Confirm Password Here"
                className="dark-input"
                value={formData.confirm_password}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="mobile_number">Mobile Number</label>
              <input
                type="tel"
                id="mobile_number"
                name="mobile_number"
                placeholder="Enter Your Mobile Number Here"
                className="dark-input"
                value={formData.mobile_number}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="college_name">College/Institute Name</label>
              <input
                type="text"
                id="college_name"
                name="college_name"
                placeholder="Enter Your College/Institute Name Here"
                className="dark-input"
                value={formData.college_name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="branch">Branch/Department</label>
              <input
                type="text"
                id="branch"
                name="branch"
                placeholder="e.g., Computer Science, Information Technology"
                className="dark-input"
                value={formData.branch}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="year_of_study">Year of Study</label>
              <select
                id="year_of_study"
                name="year_of_study"
                className="dark-input"
                value={formData.year_of_study}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Year</option>
                <option value="1st">1st Year</option>
                <option value="2nd">2nd Year</option>
                <option value="3rd">3rd Year</option>
                <option value="4th">4th Year</option>
              </select>
            </div>

            <button
              type="submit"
              className="sign-up-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          <div className="login-link">
            <p>
              Already have an account?{" "}
              <a href="#" onClick={handleLoginRedirect}>
                Log In
              </a>
            </p>
          </div>
        </div>

        {/* Illustration Container */}
        <div className="illustration-container">
          <img src="/hero-illustration.png" alt="Cloud illustration" />
        </div>

        <style jsx>{`
          .signup-page {
            font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
            background: linear-gradient(135deg, #1a1f36 0%, #0f1419 100%);
            color: #e0e6ed;
            margin: 0;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
            box-sizing: border-box;
          }

          .logo-container {
            position: absolute;
            top: 30px;
            left: 40px;
            display: flex;
            align-items: center;
            gap: 12px;
            z-index: 10;
          }

          .logo-container img {
            height: 48px;
            width: auto;
          }

          .logo-container span {
            font-size: 20px;
            font-weight: 700;
            color: #ffffff;
            letter-spacing: 0.5px;
          }

          .main-container {
            background: rgba(30, 41, 59, 0.95);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(148, 163, 184, 0.1);
            padding: 40px;
            border-radius: 16px;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.4),
              0 10px 10px -5px rgba(0, 0, 0, 0.2);
            max-width: 420px;
            width: 100%;
            position: relative;
            z-index: 1;
          }

          .illustration-container {
            position: absolute;
            bottom: 0;
            right: 40px;
            max-width: 35%;
            height: auto;
            z-index: 0;
            opacity: 0.6;
          }

          .illustration-container img {
            max-width: 100%;
            height: auto;
            display: block;
          }

          .header {
            text-align: center;
            margin-bottom: 32px;
          }

          .header-text {
            font-size: 32px;
            font-weight: 700;
            color: #ffffff;
            margin: 0 0 8px 0;
            letter-spacing: -0.5px;
          }

          .subtitle {
            color: #3b82f6;
            font-size: 16px;
            font-weight: 500;
            margin: 0;
            opacity: 0.9;
          }

          .form-group {
            margin-bottom: 20px;
          }

          label {
            display: block;
            margin-bottom: 6px;
            font-weight: 500;
            color: #e2e8f0;
            font-size: 14px;
          }

          .dark-input {
            width: 100%;
            padding: 12px 16px;
            background-color: rgba(51, 65, 85, 0.6);
            border: 1px solid rgba(148, 163, 184, 0.2);
            border-radius: 8px;
            color: #f8fafc;
            box-sizing: border-box;
            font-size: 15px;
            transition: all 0.2s ease;
          }

          .dark-input::placeholder {
            color: #94a3b8;
          }

          .dark-input:focus {
            outline: none;
            border-color: #3b82f6;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
            background-color: rgba(51, 65, 85, 0.8);
          }

          .sign-up-button {
            width: 100%;
            padding: 14px 24px;
            background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
            color: #ffffff;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-top: 8px;
          }

          .sign-up-button:hover:not(:disabled) {
            background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
          }

          .sign-up-button:disabled {
            background: rgba(100, 116, 139, 0.5);
            cursor: not-allowed;
            opacity: 0.6;
            transform: none;
            box-shadow: none;
          }

          .login-link {
            text-align: center;
            margin-top: 24px;
            padding-top: 20px;
            border-top: 1px solid rgba(148, 163, 184, 0.1);
          }

          .login-link p {
            margin: 0;
            font-size: 14px;
            color: #94a3b8;
          }

          .login-link a {
            color: #3b82f6;
            text-decoration: none;
            font-weight: 600;
            cursor: pointer;
            transition: color 0.2s ease;
          }

          .login-link a:hover {
            color: #2563eb;
          }

          @media (max-width: 768px) {
            .signup-page {
              padding: 16px;
            }

            .logo-container,
            .illustration-container {
              display: none;
            }

            .main-container {
              padding: 32px 24px;
              margin: 0;
            }

            .header-text {
              font-size: 28px;
            }
          }

          @media (max-width: 480px) {
            .main-container {
              padding: 24px 20px;
            }
          }
        `}</style>
      </div>
    </>
  );
}
