import { useState, useEffect } from "react";
import Image from "next/image";

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

// Skeleton Loading Component
function MembersSkeleton({ count = 6 }) {
  return (
    <div className="members-scroll-container">
      <div className="members-list">
        {Array.from({ length: count }).map((_, idx) => (
          <div key={idx} className="member-card skeleton-card">
            <div className="member-image-wrapper skeleton-image"></div>
            <div className="member-info">
              <div className="member-name skeleton-text skeleton-title"></div>
              <div className="member-role skeleton-text skeleton-desc"></div>
              <div className="member-team skeleton-text skeleton-venue"></div>
            </div>
            <div className="member-socials">
              <div className="skeleton-social"></div>
              <div className="skeleton-social"></div>
            </div>
            <div className="member-actions">
              <div className="skeleton-btn"></div>
              <div className="skeleton-btn"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

export default function Members() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [newMember, setNewMember] = useState({
    name: "",
    role: "",
    team: "Web Dev",
    githubLink: "",
    linkedinLink: "",
    profileImage: null,
  });
  const [updateMember, setUpdateMember] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState("");

  const isMobile = useIsMobile();
  const API_BASE_URL = "https://webiste-aws.onrender.com";

  // Check admin status
  const checkAdminStatus = () => {
    try {
      const userData = localStorage.getItem("user");
      if (userData) {
        const user = JSON.parse(userData);
        setUser(user);
        setIsAdmin(user.role === "admin");
      } else {
        setIsAdmin(false);
        setUser(null);
      }
    } catch (error) {
      console.error("Error checking admin status:", error);
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    checkAdminStatus();
    fetchMembers();
    
    // Initialize reveal animations after component mounts
    import('../../utils/revealAnimation').then(({ revealAnimationManager }) => {
      revealAnimationManager.autoInit();
    });
  }, []);

  // Fetch members from backend
  const fetchMembers = async (category = "All") => {
    setLoading(true);
    try {
      let url = `${API_BASE_URL}/team-members/`;
      if (category !== "All") {
        // Map category to backend endpoint
        const categoryMap = {
          "Core": "core",
          "Tech Team": "tech-team",
          "Web Dev": "web-dev",
          "Event Management": "event-management",
          "Design": "design",
          "Social Media": "social-media",
          "Documentation": "documentation",
          "Tech+Blog": "tech-blog"
        };
        
        if (categoryMap[category]) {
          url = `${API_BASE_URL}/team-members/${categoryMap[category]}`;
        } else {
          // Use query parameter for other categories
          url = `${API_BASE_URL}/team-members/?team=${encodeURIComponent(category)}`;
        }
      }

      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        setMembers(data.teamMembers || []);
      } else {
        console.error("Failed to fetch members:", data.error);
        setMembers([]);
        setError("Failed to load team members");
      }
    } catch (error) {
      console.error("Error fetching members:", error);
      setMembers([]);
      setError("Error loading team members");
    } finally {
      setLoading(false);
    }
  };

  // Load members when category changes
  useEffect(() => {
    fetchMembers(activeCategory);
  }, [activeCategory]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMember({ ...newMember, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Please select an image file");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size should be less than 5MB");
        return;
      }

      setError("");
      setNewMember({ ...newMember, profileImage: file });

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Please select an image file");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size should be less than 5MB");
        return;
      }

      setError("");
      const reader = new FileReader();
      reader.onloadend = () => {
        setUpdateMember({
          ...updateMember,
          profileImage: file,
          previewImage: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Add new member
  const handleAddMember = async (e) => {
    e.preventDefault();
    setError("");
    setActionLoading(true);

    try {
      const userData = localStorage.getItem("user");
      if (!userData) {
        setError("Please login as admin to add members");
        return;
      }

      const user = JSON.parse(userData);
      if (user.role !== "admin") {
        setError("Only admin users can add members");
        return;
      }

      let response;
      
      if (newMember.profileImage) {
        // Use form data for image upload
        const formData = new FormData();
        formData.append("name", newMember.name);
        formData.append("role", newMember.role);
        formData.append("team", newMember.team);
        formData.append("githubLink", newMember.githubLink);
        formData.append("linkedinLink", newMember.linkedinLink);
        formData.append("profile_image", newMember.profileImage);

        response = await fetch(`${API_BASE_URL}/team-members/create-with-image`, {
          method: "POST",
          body: formData,
        });
      } else {
        // Use JSON for text-only
        response = await fetch(`${API_BASE_URL}/team-members/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newMember),
        });
      }

      const data = await response.json();

      if (response.ok) {
        setShowAddModal(false);
        setNewMember({
          name: "",
          role: "",
          team: "Web Dev",
          githubLink: "",
          linkedinLink: "",
          profileImage: null,
        });
        setImagePreview(null);
        fetchMembers(activeCategory);
        alert("✅ Member added successfully!");
      } else {
        setError(data.error || "Failed to add member");
      }
    } catch (err) {
      console.error("Add member error:", err);
      setError("Error adding member. Please try again.");
    } finally {
      setActionLoading(false);
    }
  };

  const openUpdateModal = (member) => {
    setUpdateMember({
      ...member,
      profileImage: null,
      previewImage: member.profileImage,
    });
    setShowUpdateModal(true);
  };

  const handleUpdateInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateMember({ ...updateMember, [name]: value });
  };

  // Update member
  const handleUpdateMember = async (e) => {
    e.preventDefault();
    setError("");
    setActionLoading(true);

    try {
      const userData = localStorage.getItem("user");
      if (!userData) {
        setError("Please login as admin to update members");
        return;
      }

      const user = JSON.parse(userData);
      if (user.role !== "admin") {
        setError("Only admin users can update members");
        return;
      }

      const response = await fetch(
        `${API_BASE_URL}/team-members/${updateMember._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: updateMember.name,
            role: updateMember.role,
            team: updateMember.team,
            githubLink: updateMember.githubLink,
            linkedinLink: updateMember.linkedinLink,
            profileImage: updateMember.previewImage || updateMember.profileImage,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setShowUpdateModal(false);
        setUpdateMember(null);
        fetchMembers(activeCategory);
        alert("✅ Member updated successfully!");
      } else {
        setError(data.error || "Failed to update member");
      }
    } catch (err) {
      console.error("Update member error:", err);
      setError("Error updating member. Please try again.");
    } finally {
      setActionLoading(false);
    }
  };

  // Delete member
  const handleDeleteMember = async (id) => {
    if (!confirm("Are you sure you want to delete this member?")) return;
    
    setActionLoading(true);

    try {
      const userData = localStorage.getItem("user");
      if (!userData) {
        alert("Please login as admin to delete members");
        return;
      }

      const user = JSON.parse(userData);
      if (user.role !== "admin") {
        alert("Only admin users can delete members");
        return;
      }

      const response = await fetch(`${API_BASE_URL}/team-members/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.ok) {
        fetchMembers(activeCategory);
        alert("✅ Member deleted successfully!");
      } else {
        alert(`❌ Failed to delete member: ${data.error}`);
      }
    } catch (err) {
      console.error("Delete member error:", err);
      alert("❌ Error deleting member. Please try again.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    setImagePreview(null);
    setError("");
    setNewMember({
      name: "",
      role: "",
      team: "Web Dev",
      githubLink: "",
      linkedinLink: "",
      profileImage: null,
    });
  };

  const CategorySelector = () =>
    isMobile ? (
      <div className="members-category-selector">
        <select
          className="members-category-dropdown"
          value={activeCategory}
          onChange={(e) => setActiveCategory(e.target.value)}
        >
          <option value="All">All Teams</option>
          {TEAM_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        {isAdmin && (
          <button
            className="members-add-btn-mobile"
            onClick={() => setShowAddModal(true)}
            disabled={actionLoading}
          >
            {actionLoading ? "..." : "+"}
          </button>
        )}
      </div>
    ) : (
      <div className="members-categories">
        <button
          className={`members-category-btn ${
            activeCategory === "All" ? "active" : ""
          }`}
          onClick={() => setActiveCategory("All")}
        >
          All Teams
        </button>
        {TEAM_CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`members-category-btn ${
              activeCategory === cat ? "active" : ""
            }`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
        {isAdmin && (
          <button
            className="members-category-btn add-btn"
            onClick={() => setShowAddModal(true)}
            disabled={actionLoading}
          >
            {actionLoading ? "Loading..." : "+ Add Member"}
          </button>
        )}
      </div>
    );

  return (
    <section className="members-section" id="members">
      <div className="members-container">
        <h2 className="members-title" data-reveal data-reveal-animation="fadeInUp">
          Meet the Team
        </h2>
        <p className="members-subtitle" data-reveal data-reveal-animation="fadeInUp" data-reveal-delay="200">
          Passionate. Skilled. United.
        </p>

        {error && <div className="error-banner">{error}</div>}

        <div data-reveal data-reveal-animation="fadeInUp" data-reveal-delay="300">
          <CategorySelector />
        </div>

        <div className="members-list-container" data-reveal data-reveal-animation="fadeInUp" data-reveal-delay="400">
          {loading ? (
            <MembersSkeleton count={isMobile ? 4 : 6} />
          ) : members.length === 0 ? (
            <div className="members-empty" data-reveal data-reveal-animation="fadeInUp">
              No members found for {activeCategory === "All" ? "any team" : `${activeCategory} team`}.
            </div>
          ) : (
            <div className="members-scroll-container">
              <div className="members-list" data-reveal data-reveal-animation="fadeInUp" data-reveal-stagger data-reveal-stagger-delay="150">
                {members.map((member, index) => (
                  <div key={member._id} className="member-card" data-reveal-stagger-item>
                    <div className="member-image-wrapper">
                      <Image
                        src={member.profileImage || "/default-avatar.jpg"}
                        alt={member.name}
                        width={160}
                        height={160}
                        className="member-image"
                        unoptimized={true}
                      />
                    </div>
                    <div className="member-info">
                      <div className="member-name">{member.name}</div>
                      <div className="member-role">{member.role}</div>
                      <div className="member-team">{member.team}</div>
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
                            unoptimized={true}
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
                            unoptimized={true}
                          />
                        </a>
                      )}
                    </div>
                    {isAdmin && (
                      <div className="member-actions">
                        <button 
                          onClick={() => openUpdateModal(member)}
                          disabled={actionLoading}
                        >
                          Update
                        </button>
                        <button 
                          onClick={() => handleDeleteMember(member._id)}
                          disabled={actionLoading}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Member Modal */}
      {showAddModal && (
        <div className="members-modal-overlay">
          <div className="members-modal">
            <div className="members-modal-header">
              <h3>Add New Team Member</h3>
              <button
                className="members-modal-close"
                onClick={handleCloseAddModal}
                disabled={actionLoading}
              >
                &times;
              </button>
            </div>
            <form
              className="members-modal-form members-modal-form-grid"
              onSubmit={handleAddMember}
            >
              {error && <div className="error-message">{error}</div>}
              <div className="form-row">
                <div className="form-group">
                  <label>Name *</label>
                  <input
                    name="name"
                    value={newMember.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter full name"
                    disabled={actionLoading}
                  />
                </div>
                <div className="form-group">
                  <label>Role *</label>
                  <input
                    name="role"
                    value={newMember.role}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter role/position"
                    disabled={actionLoading}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Team *</label>
                  <select
                    name="team"
                    value={newMember.team}
                    onChange={handleInputChange}
                    required
                    disabled={actionLoading}
                  >
                    {TEAM_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Profile Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="file-input"
                    disabled={actionLoading}
                  />
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="file-preview"
                    />
                  )}
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>GitHub URL</label>
                  <input
                    name="githubLink"
                    value={newMember.githubLink}
                    onChange={handleInputChange}
                    placeholder="https://github.com/username"
                    disabled={actionLoading}
                  />
                </div>
                <div className="form-group">
                  <label>LinkedIn URL</label>
                  <input
                    name="linkedinLink"
                    value={newMember.linkedinLink}
                    onChange={handleInputChange}
                    placeholder="https://linkedin.com/in/username"
                    disabled={actionLoading}
                  />
                </div>
              </div>
              <div className="form-actions">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={handleCloseAddModal}
                  disabled={actionLoading}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn-submit"
                  disabled={actionLoading}
                >
                  {actionLoading ? "Adding..." : "Add Member"}
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
                disabled={actionLoading}
              >
                &times;
              </button>
            </div>
            <form
              className="members-modal-form members-modal-form-grid"
              onSubmit={handleUpdateMember}
            >
              {error && <div className="error-message">{error}</div>}
              <div className="form-row">
                <div className="form-group">
                  <label>Name *</label>
                  <input
                    name="name"
                    value={updateMember.name}
                    onChange={handleUpdateInputChange}
                    required
                    disabled={actionLoading}
                  />
                </div>
                <div className="form-group">
                  <label>Role *</label>
                  <input
                    name="role"
                    value={updateMember.role}
                    onChange={handleUpdateInputChange}
                    required
                    disabled={actionLoading}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Team *</label>
                  <select
                    name="team"
                    value={updateMember.team}
                    onChange={handleUpdateInputChange}
                    required
                    disabled={actionLoading}
                  >
                    {TEAM_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Profile Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleUpdateFileChange}
                    className="file-input"
                    disabled={actionLoading}
                  />
                  {updateMember.previewImage && (
                    <img
                      src={updateMember.previewImage}
                      alt="Preview"
                      className="file-preview"
                    />
                  )}
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>GitHub URL</label>
                  <input
                    name="githubLink"
                    value={updateMember.githubLink}
                    onChange={handleUpdateInputChange}
                    disabled={actionLoading}
                  />
                </div>
                <div className="form-group">
                  <label>LinkedIn URL</label>
                  <input
                    name="linkedinLink"
                    value={updateMember.linkedinLink}
                    onChange={handleUpdateInputChange}
                    disabled={actionLoading}
                  />
                </div>
              </div>
              <div className="form-actions">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setShowUpdateModal(false)}
                  disabled={actionLoading}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn-submit"
                  disabled={actionLoading}
                >
                  {actionLoading ? "Updating..." : "Update Member"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}