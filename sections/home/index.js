import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useInView,
  useClickAnimation,
  fadeInLeft,
  fadeInRight,
  fadeInUp,
  staggerContainer,
  scaleIn,
  buttonHover,
  hoverLift,
  AnimatedNumber,
} from "../../utils/animations";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [navRef, navInView] = useInView({ threshold: 0.1 });
  const [heroRef, heroInView] = useInView({ threshold: 0.2 });
  const [statsRef, statsInView] = useInView({ threshold: 0.3 });

  // Click animation hooks for different actions
  const joinUsAnimation = useClickAnimation(
    () => {
      window.open("https://www.meetup.com/aws-cloud-club-at-pict/", "_blank");
    },
    1200,
    "redirect"
  );

  const getStartedAnimation = useClickAnimation(() => {
    const element = document.getElementById("about");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, 1000);

  // Function to handle smooth scrolling to sections
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#060717] text-white font-inter overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 right-20 w-64 h-64 bg-blue-500 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl"
        />
      </div>

      {/* Navbar */}
      <motion.nav
        ref={navRef}
        initial="hidden"
        animate={navInView ? "visible" : "hidden"}
        variants={fadeInUp}
        className="flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 pt-4 sm:pt-6 md:pt-8 relative z-10"
      >
        {/* Logo Section */}
        <motion.div variants={scaleIn} className="flex flex-col items-center">
          <motion.img
            src="/images/img_th_removebg_preview.png"
            alt="AWS Cloud Club"
            className="h-12 sm:h-13 md:h-15 cursor-pointer"
            onClick={() => scrollToSection("home")}
            whileHover={hoverLift}
            whileTap={{ scale: 0.95 }}
          />
          <motion.span
            variants={fadeInUp}
            className="font-semibold text-xs sm:text-sm md:text-base text-[#67a5de] mt-1"
          >
            PICT
          </motion.span>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="hidden md:flex gap-4 lg:gap-6 text-sm md:text-base font-medium"
        >
          {[
            { name: "Home", id: "home" },
            { name: "About", id: "about" },
            { name: "Events", id: "events" },
            { name: "Blogs", id: "blogs" },
            { name: "Members", id: "members" },
            { name: "Contact Us", id: "contact" },
          ].map((item, index) => (
            <motion.li
              key={item.id}
              variants={fadeInUp}
              className="hover:text-[#327dd6] transition-colors cursor-pointer"
              onClick={() => scrollToSection(item.id)}
              whileHover={{ scale: 1.1, color: "#327dd6" }}
              whileTap={{ scale: 0.95 }}
            >
              {item.name}
            </motion.li>
          ))}
        </motion.ul>

        <motion.div
          variants={fadeInRight}
          className="flex items-center gap-3 sm:gap-4"
        >
          {/* Join Us Button (Desktop) */}
          <motion.button
            className={`hidden md:block btn-primary-animated text-white px-4 py-2 rounded-lg font-semibold transition-colors text-sm md:text-base whitespace-nowrap ${joinUsAnimation.className}`}
            onClick={joinUsAnimation.handleClick}
            whileHover={!joinUsAnimation.isLoading ? buttonHover : {}}
            whileTap={!joinUsAnimation.isLoading ? { scale: 0.95 } : {}}
            disabled={joinUsAnimation.isLoading}
          >
            {joinUsAnimation.isLoading ? "Redirecting..." : "Join Us"}
          </motion.button>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 text-[#67a5de]"
            onClick={() => setMenuOpen(!menuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={menuOpen ? { rotate: 180 } : { rotate: 0 }}
              transition={{ duration: 0.3 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </motion.svg>
          </motion.button>
        </motion.div>
      </motion.nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="md:hidden bg-[#0f172a] rounded-lg mx-4 mt-2 p-4 relative z-20 backdrop-blur-md border border-gray-700"
          >
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-col space-y-3"
            >
              {[
                { name: "Home", id: "home" },
                { name: "About", id: "about" },
                { name: "Events", id: "events" },
                { name: "Blogs", id: "blogs" },
                { name: "Members", id: "members" },
                { name: "Contact Us", id: "contact" },
              ].map((item, index) => (
                <motion.button
                  key={item.id}
                  variants={fadeInUp}
                  onClick={() => scrollToSection(item.id)}
                  className="text-white py-2 px-4 hover:bg-[#1e293b] rounded transition-colors text-sm text-left"
                  whileHover={{ x: 10, backgroundColor: "#1e293b" }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.name}
                </motion.button>
              ))}
              <motion.button
                variants={fadeInUp}
                className={`btn-primary-animated text-white py-2 px-4 rounded font-semibold transition-colors mt-2 text-sm whitespace-nowrap ${joinUsAnimation.className}`}
                onClick={joinUsAnimation.handleClick}
                whileHover={!joinUsAnimation.isLoading ? buttonHover : {}}
                whileTap={!joinUsAnimation.isLoading ? { scale: 0.95 } : {}}
                disabled={joinUsAnimation.isLoading}
              >
                {joinUsAnimation.isLoading ? "Redirecting..." : "Join Us"}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content - Home Section */}
      <motion.main
        ref={heroRef}
        id="home"
        className="flex flex-col md:flex-row items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-16 relative z-10"
      >
        {/* Left Section */}
        <motion.section
          initial="hidden"
          animate={heroInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="max-w-md lg:max-w-lg text-center md:text-left"
        >
          <motion.h1
            variants={fadeInLeft}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#327dd6] mb-3 sm:mb-4 leading-tight"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              Welcome to
            </motion.span>
            <br />
            <motion.span
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              AWS Cloud Club
            </motion.span>
          </motion.h1>

          <motion.h2
            variants={fadeInLeft}
            className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4 text-white"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              Empowering Innovators.
            </motion.span>
            <br />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
            >
              Enabling Cloud.
            </motion.span>
          </motion.h2>

          <motion.p
            variants={fadeInLeft}
            className="text-sm sm:text-base mb-4 sm:mb-6 text-gray-300"
          >
            Join a community of cloud enthusiasts, builders, and learners.
          </motion.p>

          <motion.div
            variants={fadeInLeft}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8 justify-center md:justify-start"
          >
            <motion.button
              className={`btn-primary-animated text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg font-semibold transition-colors text-sm sm:text-base whitespace-nowrap ${getStartedAnimation.className}`}
              onClick={getStartedAnimation.handleClick}
              whileHover={!getStartedAnimation.isLoading ? buttonHover : {}}
              whileTap={!getStartedAnimation.isLoading ? { scale: 0.95 } : {}}
              disabled={getStartedAnimation.isLoading}
            >
              {getStartedAnimation.isLoading ? "Loading..." : "Get Started"}
            </motion.button>
            <motion.button
              className={`btn-secondary-animated text-[#060717] px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg font-semibold transition-colors text-sm sm:text-base whitespace-nowrap ${joinUsAnimation.className}`}
              onClick={joinUsAnimation.handleClick}
              whileHover={
                !joinUsAnimation.isLoading
                  ? {
                      scale: 1.05,
                      boxShadow: "0 10px 30px rgba(255, 255, 255, 0.2)",
                    }
                  : {}
              }
              whileTap={!joinUsAnimation.isLoading ? { scale: 0.95 } : {}}
              disabled={joinUsAnimation.isLoading}
            >
              {joinUsAnimation.isLoading ? "Redirecting..." : "Join Us"}
            </motion.button>
          </motion.div>

          <motion.ul
            ref={statsRef}
            variants={staggerContainer}
            initial="hidden"
            animate={statsInView ? "visible" : "hidden"}
            className="space-y-2 sm:space-y-3 mt-4 text-xs sm:text-sm md:text-base"
          >
            {[
              { text: "Workshop Hosted", number: "10+" },
              { text: "Active Members", number: "2000+" },
              { text: "Certified AWS Student Ambassadors", number: "" },
            ].map((stat, index) => (
              <motion.li
                key={index}
                variants={fadeInLeft}
                className="flex items-center justify-center md:justify-start text-gray-300"
                whileHover={{ x: 10, color: "#327dd6" }}
              >
                <motion.span
                  className="text-[#327dd6] mr-2"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 2 + index * 0.1, duration: 0.5 }}
                >
                  ✔
                </motion.span>
                {stat.number ? (
                  <>
                    <AnimatedNumber
                      value={stat.number}
                      trigger={statsInView}
                      duration={2000 + index * 500}
                    />
                    {" " + stat.text}
                  </>
                ) : (
                  stat.text
                )}
              </motion.li>
            ))}
          </motion.ul>
        </motion.section>

        {/* Right Section */}
        <motion.section
          initial="hidden"
          animate={heroInView ? "visible" : "hidden"}
          variants={fadeInRight}
          className="mt-8 md:mt-0 flex justify-center md:justify-end w-full md:w-auto"
        >
          <motion.img
            src="/images/img_uploading_pana_1.png"
            alt="Cloud Club Illustration"
            className="w-56 sm:w-64 md:w-72 lg:w-80 max-w-full"
            whileHover={{
              scale: 1.05,
              rotate: [0, -2, 2, 0],
              transition: { duration: 0.5 },
            }}
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.section>
      </motion.main>
    </div>
  );
}
