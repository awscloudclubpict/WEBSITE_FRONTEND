import Image from "next/image";
import { motion } from "framer-motion";
import {
  useInView,
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  staggerContainer,
  scaleIn,
  hoverLift,
  bounceIn,
  AnimatedNumber,
} from "../../utils/animations";

export default function About() {
  const [headerRef, headerInView] = useInView({ threshold: 0.3 });
  const [contentRef, contentInView] = useInView({ threshold: 0.2 });
  const [statsRef, statsInView] = useInView({ threshold: 0.3 });
  const [timelineRef, timelineInView] = useInView({ threshold: 0.3 });

  return (
    <section className="about-section">
      <div className="about-container">
        <motion.div
          ref={headerRef}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          variants={fadeInUp}
          className="about-header"
        >
          <motion.h1
            className="about-title"
            variants={staggerContainer}
            initial="hidden"
            animate={headerInView ? "visible" : "hidden"}
          >
            <motion.span variants={fadeInUp}>About </motion.span>
            <motion.span variants={scaleIn} className="about-gradient">
              AWS
            </motion.span>
            <br />
            <motion.span variants={bounceIn} className="about-gradient">
              Cloud
            </motion.span>
            <motion.span variants={fadeInUp}>Club</motion.span>
          </motion.h1>
        </motion.div>
        <motion.div
          ref={contentRef}
          variants={staggerContainer}
          initial="hidden"
          animate={contentInView ? "visible" : "hidden"}
          className="about-main"
        >
          <motion.div variants={fadeInLeft} className="about-left">
            <motion.h2 variants={fadeInUp} className="about-subtitle">
              Who Are We?
            </motion.h2>
            <motion.p variants={fadeInUp} className="about-desc">
              AWS Cloud Club PICT is a student-led community focused on helping
              cloud enthusiasts learn, grow, and connect. We empower beginners
              to explore AWS technologies and build practical solutions through
              collaborative learning.
            </motion.p>
            <motion.h2 variants={fadeInUp} className="about-subtitle">
              What do we Offer?
            </motion.h2>
            <motion.div
              ref={statsRef}
              variants={staggerContainer}
              initial="hidden"
              animate={statsInView ? "visible" : "hidden"}
              className="about-stats"
            >
              {[
                { icon: "/tick.png", number: "200+", label: "Club\nMembers" },
                {
                  icon: "/certified.png",
                  number: "20+",
                  label: "AWS\nCertified",
                },
                {
                  icon: "/calendar.png",
                  number: "15+",
                  label: "Events\nConducted",
                },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  className="stat-item"
                  whileHover={hoverLift}
                >
                  <div className="stat-content">
                    <motion.div
                      className="stat-icon"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <img
                        src={stat.icon}
                        alt="Stat Icon"
                        width={40}
                        height={40}
                      />
                    </motion.div>
                    <div className="stat-text">
                      <motion.div
                        className="stat-number"
                        initial={{ scale: 0 }}
                        animate={statsInView ? { scale: 1 } : { scale: 0 }}
                        transition={{
                          delay: index * 0.2,
                          duration: 0.5,
                          type: "spring",
                        }}
                      >
                        <AnimatedNumber
                          value={stat.number}
                          trigger={statsInView}
                          duration={2000 + index * 300}
                        />
                      </motion.div>
                      <div className="stat-label">
                        {stat.label.split("\n").map((line, i) => (
                          <div key={i}>{line}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            <motion.ul variants={staggerContainer} className="about-list">
              {[
                "Beginner-friendly learning environment",
                "Collaboration with like-minded students",
                "Idea brainstorming and mentorship",
                "Real-world project guidance",
              ].map((item, index) => (
                <motion.li
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ x: 10, color: "#327dd6" }}
                >
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
          <motion.div variants={fadeInRight} className="about-right">
            <motion.div
              className="about-image-wrapper"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={
                  contentInView
                    ? { scale: 1, opacity: 1 }
                    : { scale: 0.8, opacity: 0 }
                }
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <Image
                  src="/club-photo.jpg"
                  alt="AWS Cloud Club Group"
                  width={400}
                  height={200}
                  className="about-image"
                  style={{ width: "auto", height: "auto" }}
                />
              </motion.div>
              <motion.div
                className="about-avatar"
                initial={{ scale: 0, rotate: -180 }}
                animate={
                  contentInView
                    ? { scale: 1, rotate: 0 }
                    : { scale: 0, rotate: -180 }
                }
                transition={{ duration: 0.6, delay: 0.8, type: "spring" }}
                whileHover={{ scale: 1.1, rotate: 360 }}
              >
                <Image
                  src="/avatar.jpeg"
                  alt="Club Avatar"
                  width={60}
                  height={60}
                />
              </motion.div>
            </motion.div>
            <motion.div
              ref={timelineRef}
              variants={staggerContainer}
              initial="hidden"
              animate={timelineInView ? "visible" : "hidden"}
              className="about-timeline"
            >
              {[
                { year: "2023", desc: "Club Founded" },
                { year: "2024", desc: "First AWS Workshop" },
                { year: "2025", desc: "Recognized as AWS Student Club" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeInRight}
                  className="timeline-item"
                  whileHover={{ x: 10 }}
                >
                  <motion.div
                    className="timeline-dot"
                    initial={{ scale: 0, backgroundColor: "#327dd6" }}
                    animate={timelineInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ delay: index * 0.2, duration: 0.4 }}
                    whileHover={{ scale: 1.3, backgroundColor: "#67a5de" }}
                  ></motion.div>
                  <div className="timeline-content">
                    <motion.div
                      className="timeline-year"
                      initial={{ opacity: 0, y: 20 }}
                      animate={
                        timelineInView
                          ? { opacity: 1, y: 0 }
                          : { opacity: 0, y: 20 }
                      }
                      transition={{ delay: index * 0.2 + 0.2, duration: 0.4 }}
                    >
                      {item.year}
                    </motion.div>
                    <motion.div
                      className="timeline-desc"
                      initial={{ opacity: 0, y: 20 }}
                      animate={
                        timelineInView
                          ? { opacity: 1, y: 0 }
                          : { opacity: 0, y: 20 }
                      }
                      transition={{ delay: index * 0.2 + 0.4, duration: 0.4 }}
                    >
                      {item.desc}
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
