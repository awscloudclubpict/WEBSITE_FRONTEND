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

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGV4YW1wbGUuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzU4NTM3NzQ1LCJleHAiOjE3NTg1NDEzNDV9.trT1pCVTMrPqx16X7keEGn-M2DdnbxrAp9-n5uB9yG0";

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
  const [updateMember, setUpdateMember] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [uploading, setUploading] = useState(false); // For future file upload

  useEffect(() => {
    setIsAdmin(true); // Demo: always admin
  }, []);

  // Fetch members by category (uses both generic and specific endpoints)
  const fetchMembers = async (category) => {
    try {
      setLoading(true);
      let url = "http://localhost:3001/team-members";
      switch (category) {
        case "Core":
          url = "http://localhost:3001/team-members/core";
          break;
        case "Tech Team":
          url = "http://localhost:3001/team-members/tech-team";
          break;
        case "Web Dev":
          url = "http://localhost:3001/team-members/web-dev";
          break;
        case "Event Management":
          url = "http://localhost:3001/team-members/event-management";
          break;
        case "Design":
          url = "http://localhost:3001/team-members/design";
          break;
        case "Social Media":
          url = "http://localhost:3001/team-members/social-media";
          break;
        case "Documentation":
          url = "http://localhost:3001/team-members/documentation";
          break;
        case "Tech+Blog":
          url = "http://localhost:3001/team-members/tech-blog";
          break;
        default:
          url = "http://localhost:3001/team-members";
      }
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setMembers(data.teamMembers || []);
    } catch (err) {
      setMembers([]);
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
      const payload = {
        name: newMember.name,
        role: newMember.role,
        team: newMember.team,
        githubLink: newMember.githubLink,
        linkedinLink: newMember.linkedinLink,
        profileImage: newMember.profileImage,
      };
      const res = await fetch("http://localhost:3001/team-members", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to add member");
      await fetchMembers(activeCategory);
      setShowAddModal(false);
      setNewMember({
        name: "",
        role: "",
        team: activeCategory,
        githubLink: "",
        linkedinLink: "",
        profileImage: "",
      });
      alert("Member added successfully");
    } catch (err) {
      alert("Failed to add member: " + err.message);
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

  // Update member (only using image URL)
  const handleUpdateMember = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: updateMember.name,
        role: updateMember.role,
        team: updateMember.team,
        githubLink: updateMember.githubLink,
        linkedinLink: updateMember.linkedinLink,
        profileImage: updateMember.previewImage,
      };
      const res = await fetch(`http://localhost:3001/team-members/${updateMember._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to update member");
      await fetchMembers(activeCategory);
      setShowUpdateModal(false);
      setUpdateMember(null);
      alert("Member updated successfully");
    } catch (err) {
      alert("Failed to update member: " + err.message);
    }
  };

  // Delete member
  const handleDeleteMember = async (id) => {
    if (!confirm("Are you sure?")) return;
    try {
      const res = await fetch(`http://localhost:3001/team-members/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete member");
      await fetchMembers(activeCategory);
    } catch (err) {
      alert("Error deleting member");
    }
  };

  return (
    <section className="members-section">
      <div className="members-container">
        <h2 className="members-title">Meet the Team</h2>
        <p className="members-subtitle">Passionate. Skilled. United.</p>
        <div className="members-categories">
          {TEAM_CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`members-category-btn ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
          {isAdmin && (
            <button
              className="members-category-btn add-btn"
              onClick={() => setShowAddModal(true)}
            >
              + Add Member
            </button>
          )}
        </div>
        <div className="members-list">
          {loading ? (
            <div className="members-empty">Loading...</div>
          ) : members.length === 0 ? (
            <div className="members-empty">No members found.</div>
          ) : (
            members.map((member) => (
              <div key={member._id} className="member-card">
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
                    <a href={member.githubLink} target="_blank" rel="noopener noreferrer">
                      <Image src="/github-icon.svg" alt="GitHub" width={36} height={36} />
                    </a>
                  )}
                  {member.linkedinLink && (
                    <a href={member.linkedinLink} target="_blank" rel="noopener noreferrer">
                      <Image src="/linkedin-icon.svg" alt="LinkedIn" width={36} height={36} />
                    </a>
                  )}
                </div>
                {isAdmin && (
                  <div className="member-actions">
                    <button onClick={() => openUpdateModal(member)}>Update</button>
                    <button onClick={() => handleDeleteMember(member._id)}>Delete</button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
      {/* Add Member Modal */}
      {showAddModal && (
        <div className="members-modal-overlay">
          <div className="members-modal">
            <div className="members-modal-header">
              <h3>Add New Team Member</h3>
              <button className="members-modal-close" onClick={() => setShowAddModal(false)}>
                &times;
              </button>
            </div>
            <form className="members-modal-form members-modal-form-grid" onSubmit={handleAddMember}>
              <div className="form-row">
                <div className="form-group">
                  <label>Name</label>
                  <input name="name" value={newMember.name} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <label>Role</label>
                  <input name="role" value={newMember.role} onChange={handleInputChange} required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Team</label>
                  <select name="team" value={newMember.team} onChange={handleInputChange} required>
                    {TEAM_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
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
                  <input name="githubLink" value={newMember.githubLink} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>LinkedIn</label>
                  <input name="linkedinLink" value={newMember.linkedinLink} onChange={handleInputChange} />
                </div>
              </div>
              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowAddModal(false)}>Cancel</button>
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
              <button className="members-modal-close" onClick={() => setShowUpdateModal(false)}>
                &times;
              </button>
            </div>
            <form className="members-modal-form members-modal-form-grid" onSubmit={handleUpdateMember}>
              <div className="form-row">
                <div className="form-group">
                  <label>Name</label>
                  <input name="name" value={updateMember.name} onChange={handleUpdateInputChange} required />
                </div>
                <div className="form-group">
                  <label>Role</label>
                  <input name="role" value={updateMember.role} onChange={handleUpdateInputChange} required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Team</label>
                  <select name="team" value={updateMember.team} onChange={handleUpdateInputChange} required>
                    {TEAM_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
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
                  <input name="githubLink" value={updateMember.githubLink} onChange={handleUpdateInputChange} />
                </div>
                <div className="form-group">
                  <label>LinkedIn</label>
                  <input name="linkedinLink" value={updateMember.linkedinLink} onChange={handleUpdateInputChange} />
                </div>
              </div>
              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowUpdateModal(false)}>Cancel</button>
                <button type="submit" className="btn-submit">
                  Update Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
