import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  staggerContainer,
  cardHover,
  buttonHover,
  useInView,
  useClickAnimation,
} from "../../utils/animations";

// Helper function for error handling
const handleApiError = (error, defaultMessage = "Something went wrong") => {
  console.error("API Error:", error);
  return error.message || defaultMessage;
};

const TEAM_CATEGORIES = [
  "Core",
  "Tech Team",
  "Web Dev",
  "Event Management",
  "Design",
  "Social Media",
  "Documentation",
  "Tech+Blog",
];

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGV4YW1wbGUuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzU4NTQ0ODI2LCJleHAiOjE3NTg1NDg0MjZ9.c96CXnIYibN3pq7hAU1uF-25nK_aXA5mQWezs_I4alU";

export default function Members() {
  const [activeCategory, setActiveCategory] = useState("Web Dev");
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [newMember, setNewMember] = useState({
    name: "",
    role: "",
    team: "Web Dev",
    githubLink: "",
    linkedinLink: "",
    profileImage: "",
    // file: null, // For future file upload
  });

  // Animation refs
  const [headerRef, headerInView] = useInView({ threshold: 0.3 });
  const [contentRef, contentInView] = useInView({ threshold: 0.2 });
  const [updateMember, setUpdateMember] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Click animation hooks
  const addMemberAnimation = useClickAnimation(() => {
    setShowAddModal(true);
  }, 800);
  // const [uploading, setUploading] = useState(false); // For future file upload

  useEffect(() => {
    setIsAdmin(true); // Demo: always admin
  }, []);

  // Fetch members by category using API utility
  const fetchMembers = async (category) => {
    try {
      setLoading(true);

      // Map category names to API department names
      const departmentMap = {
        Core: "core",
        "Tech Team": "tech-team",
        "Web Dev": "web-dev",
        "Event Management": "event-management",
        Design: "design",
        "Social Media": "social-media",
        Documentation: "documentation",
        "Tech+Blog": "tech-blog",
      };

      let url = "https://website-backend-lkns.onrender.com/team-members/";
      if (category !== "All" && departmentMap[category]) {
        url = `https://website-backend-lkns.onrender.com/team-members/${departmentMap[category]}`;
      }

      console.log("🔗 Attempting to fetch from external API:", url);

      // Simplified fetch with minimal headers to avoid CORS issues
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const memberData = await response.json();
      console.log("✅ Successfully fetched members:", memberData);

      setMembers(
        memberData.teamMembers || memberData.team_members || memberData || []
      );
    } catch (err) {
      console.error("❌ Error fetching members:", err);

      // Just log the error, no annoying alerts
      console.log("🎭 Showing demo data due to:", err.message);

      // Set demo data on error
      const demoMembers = [
        {
          _id: "demo1",
          name: `${category} Team Lead (Demo)`,
          role: "Team Lead",
          team: category,
          profileImage: "/default-avatar.jpg",
          githubLink: "https://github.com/demo1",
          linkedinLink: "https://linkedin.com/in/demo1",
        },
        {
          _id: "demo2",
          name: `${category} Developer (Demo)`,
          role: "Senior Developer",
          team: category,
          profileImage: "/default-avatar.jpg",
          githubLink: "https://github.com/demo2",
          linkedinLink: "https://linkedin.com/in/demo2",
        },
        {
          _id: "demo3",
          name: `${category} Intern (Demo)`,
          role: "Junior Developer",
          team: category,
          profileImage: "/default-avatar.jpg",
          githubLink: "https://github.com/demo3",
          linkedinLink: "https://linkedin.com/in/demo3",
        },
      ];
      setMembers(demoMembers);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers(activeCategory);
  }, [activeCategory]);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMember({ ...newMember, [name]: value });
  };

  // Add new member (only using image URL)
  const handleAddMember = async (e) => {
    e.preventDefault();
    try {
      const memberData = {
        name: newMember.name,
        role: newMember.role,
        team: newMember.team,
        githubLink: newMember.githubLink,
        linkedinLink: newMember.linkedinLink,
        profileImage: newMember.profileImage,
      };

      // DEMO: Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setShowAddModal(false);
      setNewMember({
        name: "",
        role: "",
        team: activeCategory,
        githubLink: "",
        linkedinLink: "",
        profileImage: "",
      });
      alert("✅ DEMO: Member would be added successfully!");

      // Refresh to show it's working
      await fetchMembers(activeCategory);
    } catch (err) {
      alert("❌ Demo error simulation");
    }
  };

  // Prepare update modal
  const openUpdateModal = (member) => {
    setUpdateMember({
      ...member,
      // file: null, // For future file upload
      previewImage: member.profileImage,
    });
    setShowUpdateModal(true);
  };

  // Handle update input
  const handleUpdateInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateMember({ ...updateMember, [name]: value });
  };

  // Update member (DEMO - Static Response)
  const handleUpdateMember = async (e) => {
    e.preventDefault();
    try {
      // DEMO: Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setShowUpdateModal(false);
      setUpdateMember(null);
      alert("✅ DEMO: Member would be updated successfully!");

      // Refresh to show it's working
      await fetchMembers(activeCategory);
    } catch (err) {
      alert("❌ Demo error simulation");
    }
  };

  // Delete member (DEMO - Static Response)
  const handleDeleteMember = async (id) => {
    if (
      !confirm(
        "🎭 DEMO: Are you sure you want to 'delete' this member? (This is just a demo)"
      )
    )
      return;
    try {
      // DEMO: Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 800));

      alert("✅ DEMO: Member would be deleted successfully!");

      // Refresh to show it's working
      await fetchMembers(activeCategory);
    } catch (err) {
      alert("❌ Demo error simulation");
    }
  };

  return (
    <motion.section
      className="members-section"
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
    >
      <motion.div
        className="members-container"
        ref={contentRef}
        initial="hidden"
        animate={contentInView ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        <motion.h2
          className="members-title"
          ref={headerRef}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          variants={fadeInUp}
        >
          Meet the Team
        </motion.h2>
        <motion.p className="members-subtitle" variants={fadeInUp}>
          Passionate. Skilled. United.
        </motion.p>
        <motion.div className="members-categories" variants={staggerContainer}>
          {TEAM_CATEGORIES.map((cat, index) => (
            <motion.button
              key={cat}
              className={`members-category-btn ${
                activeCategory === cat ? "active" : ""
              }`}
              onClick={() => setActiveCategory(cat)}
              variants={buttonHover}
              whileHover="hover"
              whileTap="tap"
              custom={index}
            >
              {cat}
            </motion.button>
          ))}
          {isAdmin && (
            <motion.button
              className={`members-category-btn add-btn ${addMemberAnimation.className}`}
              onClick={addMemberAnimation.handleClick}
              variants={buttonHover}
              whileHover={!addMemberAnimation.isLoading ? "hover" : {}}
              whileTap={!addMemberAnimation.isLoading ? "tap" : {}}
              disabled={addMemberAnimation.isLoading}
            >
              {addMemberAnimation.isLoading ? "Opening..." : "+ Add Member"}
            </motion.button>
          )}
        </motion.div>
        <motion.div
          className="members-list"
          variants={staggerContainer}
          initial="hidden"
          animate={contentInView ? "visible" : "hidden"}
        >
          {loading ? (
            <div className="members-empty">Loading...</div>
          ) : members.length === 0 ? (
            <div className="members-empty">No members found.</div>
          ) : (
            members.map((member, index) => (
              <motion.div
                key={member._id}
                className="member-card"
                variants={cardHover}
                whileHover="hover"
                whileTap="tap"
                initial="hidden"
                animate="visible"
                custom={index}
              >
                <div className="member-image-wrapper">
                  {member.profileImage ? (
                    <img
                      src={member.profileImage}
                      alt={member.name}
                      width={160}
                      height={160}
                      className="member-image"
                    />
                  ) : (
                    <Image
                      src="/default-avatar.jpg"
                      alt={member.name}
                      width={160}
                      height={160}
                      className="member-image"
                    />
                  )}
                </div>
                <div className="member-info">
                  <div className="member-name">{member.name}</div>
                  <div className="member-role">{member.role}</div>
                </div>
                <div className="member-socials">
                  {member.githubLink && (
                    <a
                      href={member.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image
                        src="/github-icon.svg"
                        alt="GitHub"
                        width={36}
                        height={36}
                      />
                    </a>
                  )}
                  {member.linkedinLink && (
                    <a
                      href={member.linkedinLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image
                        src="/linkedin-icon.svg"
                        alt="LinkedIn"
                        width={36}
                        height={36}
                      />
                    </a>
                  )}
                </div>
                {isAdmin && (
                  <div className="member-actions">
                    <button onClick={() => openUpdateModal(member)}>
                      Update
                    </button>
                    <button onClick={() => handleDeleteMember(member._id)}>
                      Delete
                    </button>
                  </div>
                )}
              </motion.div>
            ))
          )}
        </motion.div>
      </motion.div>
      {/* Add Member Modal */}
      {showAddModal && (
        <div className="members-modal-overlay">
          <div className="members-modal">
            <div className="members-modal-header">
              <h3>Add New Team Member</h3>
              <button
                className="members-modal-close"
                onClick={() => setShowAddModal(false)}
              >
                &times;
              </button>
            </div>
            <form
              className="members-modal-form members-modal-form-grid"
              onSubmit={handleAddMember}
            >
              <div className="form-row">
                <div className="form-group">
                  <label>Name</label>
                  <input
                    name="name"
                    value={newMember.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Role</label>
                  <input
                    name="role"
                    value={newMember.role}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Team</label>
                  <select
                    name="team"
                    value={newMember.team}
                    onChange={handleInputChange}
                    required
                  >
                    {TEAM_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Profile Image URL</label>
                  <input
                    name="profileImage"
                    value={newMember.profileImage}
                    onChange={handleInputChange}
                    placeholder="Paste image URL here"
                  />
                  {/* 
                  // For future file upload:
                  <input type="file" accept="image/*" onChange={handleFileChange} />
                  {newMember.profileImage && (
                    <img src={newMember.profileImage} alt="preview" className="file-preview" />
                  )}
                  */}
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>GitHub</label>
                  <input
                    name="githubLink"
                    value={newMember.githubLink}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>LinkedIn</label>
                  <input
                    name="linkedinLink"
                    value={newMember.linkedinLink}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="form-actions">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  Add Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Update Member Modal */}
      {showUpdateModal && updateMember && (
        <div className="members-modal-overlay">
          <div className="members-modal">
            <div className="members-modal-header">
              <h3>Update Team Member</h3>
              <button
                className="members-modal-close"
                onClick={() => setShowUpdateModal(false)}
              >
                &times;
              </button>
            </div>
            <form
              className="members-modal-form members-modal-form-grid"
              onSubmit={handleUpdateMember}
            >
              <div className="form-row">
                <div className="form-group">
                  <label>Name</label>
                  <input
                    name="name"
                    value={updateMember.name}
                    onChange={handleUpdateInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Role</label>
                  <input
                    name="role"
                    value={updateMember.role}
                    onChange={handleUpdateInputChange}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Team</label>
                  <select
                    name="team"
                    value={updateMember.team}
                    onChange={handleUpdateInputChange}
                    required
                  >
                    {TEAM_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Profile Image URL</label>
                  <input
                    name="previewImage"
                    value={updateMember.previewImage}
                    onChange={handleUpdateInputChange}
                    placeholder="Paste image URL here"
                  />
                  {/* 
                  // For future file upload:
                  <input type="file" accept="image/*" onChange={handleUpdateFileChange} />
                  {updateMember.previewImage && (
                    <img src={updateMember.previewImage} alt="preview" className="file-preview" />
                  )}
                  */}
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>GitHub</label>
                  <input
                    name="githubLink"
                    value={updateMember.githubLink}
                    onChange={handleUpdateInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>LinkedIn</label>
                  <input
                    name="linkedinLink"
                    value={updateMember.linkedinLink}
                    onChange={handleUpdateInputChange}
                  />
                </div>
              </div>
              <div className="form-actions">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setShowUpdateModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  Update Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </motion.section>
  );
}
