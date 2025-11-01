import Image from "next/image";

export default function About() {
  return (
    <section className="about-section">
      <div className="about-container">
        <div className="about-header">
          <h1 className="about-title">
            About <span className="about-gradient">AWS</span>
            <br />
            <span className="about-gradient">Cloud </span>Club
          </h1>
        </div>
        <div className="about-main">
          <div className="about-left">
            <h2 className="about-subtitle">Who Are We?</h2>
            <p className="about-desc">
              AWS Cloud Club PICT is a student-led community focused on helping cloud enthusiasts learn, grow, and connect.
              We empower beginners to explore AWS technologies and build practical solutions through collaborative learning.
            </p>
            <h2 className="about-subtitle">What do we Offer?</h2>
            <div className="about-stats">
              <div className="stat-item">
                <div className="stat-content">
                  <div className="stat-icon">
                    <img src="/tick.png" alt="Members Icon" width={40} height={40} />
                  </div>
                  <div className="stat-text">
                    <div className="stat-number">3000+</div>
                    <div className="stat-label">Club <br></br>Members</div>
                  </div>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-content">
                  <div className="stat-icon">
                    <img src="/certified.png" alt="Members Icon" width={40} height={40} />
                    </div>
                  <div className="stat-text">
                    <div className="stat-number">20+</div>
                    <div className="stat-label">AWS <br></br>Certified</div>
                  </div>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-content">
                  <div className="stat-icon">
                    <img src="/calendar.png" alt="Members Icon" width={40} height={40} />
                  </div>
                  <div className="stat-text">
                    <div className="stat-number">15+</div>
                    <div className="stat-label">Events<br></br> Conducted</div>
                  </div>
                </div>
              </div>
            </div>
            <ul className="about-list">
              <li>Beginner-friendly learning environment</li>
              <li>Collaboration with like-minded students</li>
              <li>Idea brainstorming and mentorship</li>
              <li>Real-world project guidance</li>
            </ul>
          </div>
          <div className="about-right">
            <div className="about-image-wrapper">
              <Image
                src="/club-photo.jpg"
                alt="AWS Cloud Club Group"
                width={400}
                height={200}
                className="about-image"
              />
              <div className="about-avatar">
                <Image
                  src="/avatar.jpeg"
                  alt="Club Avatar"
                  width={60}
                  height={60}
                />
              </div>
            </div>
            <div className="about-timeline">
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <div className="timeline-year">2023</div>
                  <div className="timeline-desc">Club Founded</div>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <div className="timeline-year">2024</div>
                  <div className="timeline-desc">First AWS Workshop</div>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <div className="timeline-year">2025</div>
                  <div className="timeline-desc">Recognized as AWS Student Club</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}