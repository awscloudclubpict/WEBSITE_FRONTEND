import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../utils/useAuth";
import {
  fadeInUp,
  buttonHover,
  useClickAnimation,
} from "../../utils/animations";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const [clickAnimation, triggerClick] = useClickAnimation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    triggerClick();

    try {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        alert("Login successful!");
        // Redirect or update UI as needed
      } else {
        alert(result.error);
      }
    } catch (error) {
      alert("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <motion.section
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-white py-12 px-4"
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
    >
      <div className="max-w-md w-full">
        <motion.div
          className="bg-white rounded-2xl shadow-2xl p-8"
          variants={fadeInUp}
          transition={{ delay: 0.1 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-600">Sign in to your AWSCC account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                placeholder="••••••••"
              />
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-4 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              variants={buttonHover}
              whileHover="hover"
              whileTap="tap"
              animate={clickAnimation}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing In...
                </div>
              ) : (
                "Sign In"
              )}
            </motion.button>
          </form>

          <div className="text-center mt-6">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <a
                href="#"
                className="text-orange-500 hover:text-orange-600 font-medium"
              >
                Sign up here
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
