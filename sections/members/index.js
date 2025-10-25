// import { useState, useEffect } from "react";
// import Image from "next/image";

// const TEAM_CATEGORIES = [
//   "Core",
//   "Tech Team",
//   "Web Dev",
//   "Event Management",
//   "Design",
//   "Social Media",
//   "Documentation",
//   "Tech+Blog",
// ];

// const token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGV4YW1wbGUuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzYxNDA3NTM1LCJleHAiOjE3NjE0MTExMzV9.q881jh6XpYQESjyS-j7bhOSAHhTL9NVOs4gVP-v7_FY";

// // Base URL for API - adjust according to your backend
// const API_BASE_URL = "http://localhost:3001";

// function useIsMobile() {
//   const [isMobile, setIsMobile] = useState(false);
//   useEffect(() => {
//     const check = () => setIsMobile(window.innerWidth < 700);
//     check();
//     window.addEventListener("resize", check);
//     return () => window.removeEventListener("resize", check);
//   }, []);
//   return isMobile;
// }

// export default function Members() {
//   const [activeCategory, setActiveCategory] = useState("Web Dev");
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showUpdateModal, setShowUpdateModal] = useState(false);
//   const [newMember, setNewMember] = useState({
//     name: "",
//     role: "",
//     team: "Web Dev",
//     githubLink: "",
//     linkedinLink: "",
//     profileImage: null,
//   });
//   const [updateMember, setUpdateMember] = useState(null);
//   const [members, setMembers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [carouselIndex, setCarouselIndex] = useState(0);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [error, setError] = useState("");

//   const isMobile = useIsMobile();

//   useEffect(() => {
//     setIsAdmin(true);
//   }, []);

//   // Enhanced fetch function with better error handling
//   const fetchMembers = async (category) => {
//     try {
//       setLoading(true);
//       setError("");

//       // Use a single endpoint with query parameter
//       const url = `${API_BASE_URL}/team-members?team=${encodeURIComponent(
//         category
//       )}`;

//       console.log("Fetching from:", url); // Debug log

//       const res = await fetch(url, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       console.log("Response status:", res.status); // Debug log

//       if (!res.ok) {
//         throw new Error(`HTTP error! status: ${res.status}`);
//       }

//       const data = await res.json();
//       console.log("Fetched data:", data); // Debug log

//       setMembers(data.teamMembers || data || []);
//       setCarouselIndex(0);
//     } catch (err) {
//       console.error("Fetch error:", err);
//       setError(`Failed to load members: ${err.message}`);
//       setMembers([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchMembers(activeCategory);
//   }, [activeCategory]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewMember({ ...newMember, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       // Validate file type and size
//       if (!file.type.startsWith("image/")) {
//         setError("Please select an image file");
//         return;
//       }
//       if (file.size > 5 * 1024 * 1024) {
//         // 5MB limit
//         setError("Image size should be less than 5MB");
//         return;
//       }

//       setError("");
//       setNewMember({ ...newMember, profileImage: file });

//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleUpdateFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (!file.type.startsWith("image/")) {
//         setError("Please select an image file");
//         return;
//       }
//       if (file.size > 5 * 1024 * 1024) {
//         setError("Image size should be less than 5MB");
//         return;
//       }

//       setError("");
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setUpdateMember({
//           ...updateMember,
//           profileImage: file,
//           previewImage: reader.result,
//         });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // Enhanced add member function
//   const handleAddMember = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const formData = new FormData();
//       formData.append("name", newMember.name);
//       formData.append("role", newMember.role);
//       formData.append("team", newMember.team);
//       formData.append("githubLink", newMember.githubLink);
//       formData.append("linkedinLink", newMember.linkedinLink);

//       if (newMember.profileImage) {
//         // 👇 Must match multer's field name
//         formData.append("profile_image", newMember.profileImage);
//       }

//       const res = await fetch(
//         `${API_BASE_URL}/team-members/create-with-image`,
//         {
//           // 👈 correct endpoint
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             // ❌ Don't set Content-Type, browser does it for FormData
//           },
//           body: formData,
//         }
//       );

//       if (!res.ok) {
//         const errText = await res.text();
//         throw new Error(`Failed to add member: ${res.status} ${errText}`);
//       }

//       await fetchMembers(activeCategory);
//       setShowAddModal(false);
//       setNewMember({
//         name: "",
//         role: "",
//         team: activeCategory,
//         githubLink: "",
//         linkedinLink: "",
//         profileImage: null,
//       });
//       setImagePreview(null);
//       alert("Member added successfully");
//     } catch (err) {
//       console.error("Add member error:", err);
//       setError(err.message);
//       alert("Failed to add member: " + err.message);
//     }
//   };

//   const openUpdateModal = (member) => {
//     setUpdateMember({
//       ...member,
//       profileImage: null,
//       previewImage: member.profileImage,
//     });
//     setShowUpdateModal(true);
//   };

//   const handleUpdateInputChange = (e) => {
//     const { name, value } = e.target;
//     setUpdateMember({ ...updateMember, [name]: value });
//   };

//   const handleUpdateMember = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const formData = new FormData();
//       formData.append("name", updateMember.name);
//       formData.append("role", updateMember.role);
//       formData.append("team", updateMember.team);
//       formData.append("githubLink", updateMember.githubLink);
//       formData.append("linkedinLink", updateMember.linkedinLink);

//       if (updateMember.profileImage instanceof File) {
//         formData.append("profileImage", updateMember.profileImage);
//       }

//       const res = await fetch(
//         `${API_BASE_URL}/team-members/${updateMember._id}`,
//         {
//           method: "PUT",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           body: formData,
//         }
//       );

//       const responseText = await res.text();
//       console.log("Update response:", responseText);

//       if (!res.ok) {
//         throw new Error(
//           `Failed to update member: ${res.status} ${responseText}`
//         );
//       }

//       await fetchMembers(activeCategory);
//       setShowUpdateModal(false);
//       setUpdateMember(null);
//       alert("Member updated successfully");
//     } catch (err) {
//       console.error("Update member error:", err);
//       setError(err.message);
//       alert("Failed to update member: " + err.message);
//     }
//   };

//   const handleDeleteMember = async (id) => {
//     if (!confirm("Are you sure?")) return;
//     try {
//       const res = await fetch(`${API_BASE_URL}/team-members/${id}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (!res.ok) throw new Error("Failed to delete member");
//       await fetchMembers(activeCategory);
//     } catch (err) {
//       alert("Error deleting member: " + err.message);
//     }
//   };

//   const handleCloseAddModal = () => {
//     setShowAddModal(false);
//     setImagePreview(null);
//     setError("");
//     setNewMember({
//       name: "",
//       role: "",
//       team: activeCategory,
//       githubLink: "",
//       linkedinLink: "",
//       profileImage: null,
//     });
//   };

//   // Carousel logic and other functions remain the same...
//   const handlePrev = () => {
//     setCarouselIndex((prev) => Math.max(prev - 1, 0));
//   };

//   const handleNext = () => {
//     setCarouselIndex((prev) => Math.min(prev + 1, members.length - 1));
//   };

//   const CategorySelector = () =>
//     isMobile ? (
//       <select
//         className="members-category-dropdown"
//         value={activeCategory}
//         onChange={(e) => setActiveCategory(e.target.value)}
//       >
//         {TEAM_CATEGORIES.map((cat) => (
//           <option key={cat} value={cat}>
//             {cat}
//           </option>
//         ))}
//       </select>
//     ) : (
//       <div className="members-categories">
//         {TEAM_CATEGORIES.map((cat) => (
//           <button
//             key={cat}
//             className={`members-category-btn ${
//               activeCategory === cat ? "active" : ""
//             }`}
//             onClick={() => setActiveCategory(cat)}
//           >
//             {cat}
//           </button>
//         ))}
//         {isAdmin && (
//           <button
//             className="members-category-btn add-btn"
//             onClick={() => setShowAddModal(true)}
//           >
//             + Add Member
//           </button>
//         )}
//       </div>
//     );

//   const AddMemberMobileForm = () => (
//     <form
//       className="members-modal-form members-modal-form-grid mobile-add-form"
//       onSubmit={handleAddMember}
//     >
//       {error && <div className="error-message">{error}</div>}
//       <div className="form-row">
//         <div className="form-group">
//           <label>Name</label>
//           <input
//             name="name"
//             value={newMember.name}
//             onChange={handleInputChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Role</label>
//           <input
//             name="role"
//             value={newMember.role}
//             onChange={handleInputChange}
//             required
//           />
//         </div>
//       </div>
//       <div className="form-row">
//         <div className="form-group">
//           <label>Team</label>
//           <select
//             name="team"
//             value={newMember.team}
//             onChange={handleInputChange}
//             required
//           >
//             {TEAM_CATEGORIES.map((cat) => (
//               <option key={cat} value={cat}>
//                 {cat}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="form-group">
//           <label>Profile Image</label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleFileChange}
//             className="file-input"
//           />
//           {imagePreview && (
//             <img src={imagePreview} alt="Preview" className="file-preview" />
//           )}
//         </div>
//       </div>
//       <div className="form-row">
//         <div className="form-group">
//           <label>GitHub</label>
//           <input
//             name="githubLink"
//             value={newMember.githubLink}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div className="form-group">
//           <label>LinkedIn</label>
//           <input
//             name="linkedinLink"
//             value={newMember.linkedinLink}
//             onChange={handleInputChange}
//           />
//         </div>
//       </div>
//       <div className="form-actions">
//         <button type="submit" className="btn-submit">
//           Add Member
//         </button>
//       </div>
//     </form>
//   );

//   return (
//     <section className="members-section">
//       <div className="members-container">
//         <h2 className="members-title">Meet the Team</h2>
//         <p className="members-subtitle">Passionate. Skilled. United.</p>

//         {error && <div className="error-banner">{error}</div>}

//         <CategorySelector />

//         {isMobile && isAdmin && (
//           <div className="mobile-add-member-box">
//             <h3 className="mobile-add-title">Add New Team Member</h3>
//             <AddMemberMobileForm />
//           </div>
//         )}

//         <div className={isMobile ? "members-list-mobile" : "members-list"}>
//           {loading ? (
//             <div className="members-empty">Loading...</div>
//           ) : members.length === 0 ? (
//             <div className="members-empty">
//               {error
//                 ? "Error loading members"
//                 : "No members found for this team."}
//             </div>
//           ) : isMobile ? (
//             <div className="mobile-carousel-wrapper">
//               <button
//                 className="carousel-arrow"
//                 onClick={handlePrev}
//                 disabled={carouselIndex === 0}
//               >
//                 &#8592;
//               </button>
//               <div className="member-card mobile-card">
//                 <div className="member-image-wrapper">
//                   {members[carouselIndex].profileImage ? (
//                     <img
//                       src={members[carouselIndex].profileImage}
//                       alt={members[carouselIndex].name}
//                       width={160}
//                       height={160}
//                       className="member-image"
//                     />
//                   ) : (
//                     <Image
//                       src="/default-avatar.jpg"
//                       alt={members[carouselIndex].name}
//                       width={160}
//                       height={160}
//                       className="member-image"
//                       unoptimized={true}
//                     />
//                   )}
//                 </div>
//                 <div className="member-info">
//                   <div className="member-name">
//                     {members[carouselIndex].name}
//                   </div>
//                   <div className="member-role">
//                     {members[carouselIndex].role}
//                   </div>
//                 </div>
//                 <div className="member-socials">
//                   {members[carouselIndex].githubLink && (
//                     <a
//                       href={members[carouselIndex].githubLink}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       <Image
//                         src="/github-icon.svg"
//                         alt="GitHub"
//                         width={36}
//                         height={36}
//                       />
//                     </a>
//                   )}
//                   {members[carouselIndex].linkedinLink && (
//                     <a
//                       href={members[carouselIndex].linkedinLink}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       <Image
//                         src="/linkedin-icon.svg"
//                         alt="LinkedIn"
//                         width={36}
//                         height={36}
//                         unoptimized={true}
//                       />
//                     </a>
//                   )}
//                 </div>
//                 {isAdmin && (
//                   <div className="member-actions">
//                     <button
//                       onClick={() => openUpdateModal(members[carouselIndex])}
//                     >
//                       Update
//                     </button>
//                     <button
//                       onClick={() =>
//                         handleDeleteMember(members[carouselIndex]._id)
//                       }
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 )}
//               </div>
//               <button
//                 className="carousel-arrow"
//                 onClick={handleNext}
//                 disabled={carouselIndex === members.length - 1}
//               >
//                 &#8594;
//               </button>
//             </div>
//           ) : (
//             members.map((member) => (
//               <div key={member._id} className="member-card">
//                 <div className="member-image-wrapper">
//                   {member.profileImage ? (
//                     <img
//                       src={member.profileImage}
//                       alt={member.name}
//                       width={160}
//                       height={160}
//                       className="member-image"
//                     />
//                   ) : (
//                     <Image
//                       src="/default-avatar.jpg"
//                       alt={member.name}
//                       width={160}
//                       height={160}
//                       className="member-image"
//                       unoptimized={true}
//                     />
//                   )}
//                 </div>
//                 <div className="member-info">
//                   <div className="member-name">{member.name}</div>
//                   <div className="member-role">{member.role}</div>
//                 </div>
//                 <div className="member-socials">
//                   {member.githubLink && (
//                     <a
//                       href={member.githubLink}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       <Image
//                         src="/github-icon.svg"
//                         alt="GitHub"
//                         width={36}
//                         height={36}
//                         unoptimized={true}
//                       />
//                     </a>
//                   )}
//                   {member.linkedinLink && (
//                     <a
//                       href={member.linkedinLink}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       <Image
//                         src="/linkedin-icon.svg"
//                         alt="LinkedIn"
//                         width={36}
//                         height={36}
//                         unoptimized={true}
//                       />
//                     </a>
//                   )}
//                 </div>
//                 {isAdmin && (
//                   <div className="member-actions">
//                     <button onClick={() => openUpdateModal(member)}>
//                       Update
//                     </button>
//                     <button onClick={() => handleDeleteMember(member._id)}>
//                       Delete
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ))
//           )}
//         </div>
//       </div>

//       {/* Add Member Modal */}
//       {!isMobile && showAddModal && (
//         <div className="members-modal-overlay">
//           <div className="members-modal">
//             <div className="members-modal-header">
//               <h3>Add New Team Member</h3>
//               <button
//                 className="members-modal-close"
//                 onClick={handleCloseAddModal}
//               >
//                 &times;
//               </button>
//             </div>
//             <form
//               className="members-modal-form members-modal-form-grid"
//               onSubmit={handleAddMember}
//             >
//               {error && <div className="error-message">{error}</div>}
//               <div className="form-row">
//                 <div className="form-group">
//                   <label>Name</label>
//                   <input
//                     name="name"
//                     value={newMember.name}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>Role</label>
//                   <input
//                     name="role"
//                     value={newMember.role}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </div>
//               </div>
//               <div className="form-row">
//                 <div className="form-group">
//                   <label>Team</label>
//                   <select
//                     name="team"
//                     value={newMember.team}
//                     onChange={handleInputChange}
//                     required
//                   >
//                     {TEAM_CATEGORIES.map((cat) => (
//                       <option key={cat} value={cat}>
//                         {cat}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="form-group">
//                   <label>Profile Image</label>
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleFileChange}
//                     className="file-input"
//                   />
//                   {imagePreview && (
//                     <img
//                       src={imagePreview}
//                       alt="Preview"
//                       className="file-preview"
//                     />
//                   )}
//                 </div>
//               </div>
//               <div className="form-row">
//                 <div className="form-group">
//                   <label>GitHub</label>
//                   <input
//                     name="githubLink"
//                     value={newMember.githubLink}
//                     onChange={handleInputChange}
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>LinkedIn</label>
//                   <input
//                     name="linkedinLink"
//                     value={newMember.linkedinLink}
//                     onChange={handleInputChange}
//                   />
//                 </div>
//               </div>
//               <div className="form-actions">
//                 <button
//                   type="button"
//                   className="btn-cancel"
//                   onClick={handleCloseAddModal}
//                 >
//                   Cancel
//                 </button>
//                 <button type="submit" className="btn-submit">
//                   Add Member
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Update Member Modal */}
//       {isMobile && isAdmin && updateMember && (
//         <div className="mobile-add-member-box">
//           <h3 className="mobile-add-title">Update Team Member</h3>
//           <form
//             className="members-modal-form members-modal-form-grid mobile-add-form"
//             onSubmit={handleUpdateMember}
//           >
//             {error && <div className="error-message">{error}</div>}
//             {/* Name & Role */}
//             <div className="form-row">
//               <div className="form-group">
//                 <label>Name</label>
//                 <input
//                   name="name"
//                   value={updateMember.name}
//                   onChange={handleUpdateInputChange}
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Role</label>
//                 <input
//                   name="role"
//                   value={updateMember.role}
//                   onChange={handleUpdateInputChange}
//                   required
//                 />
//               </div>
//             </div>

//             {/* Team & Profile Image */}
//             <div className="form-row">
//               <div className="form-group">
//                 <label>Team</label>
//                 <select
//                   name="team"
//                   value={updateMember.team}
//                   onChange={handleUpdateInputChange}
//                   required
//                 >
//                   {TEAM_CATEGORIES.map((cat) => (
//                     <option key={cat} value={cat}>
//                       {cat}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label>Profile Image</label>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleUpdateFileChange}
//                   className="file-input"
//                 />
//                 {updateMember.previewImage && (
//                   <img
//                     src={updateMember.previewImage}
//                     alt="Preview"
//                     className="file-preview"
//                   />
//                 )}
//               </div>
//             </div>

//             {/* GitHub & LinkedIn */}
//             <div className="form-row">
//               <div className="form-group">
//                 <label>GitHub</label>
//                 <input
//                   name="githubLink"
//                   value={updateMember.githubLink}
//                   onChange={handleUpdateInputChange}
//                 />
//               </div>
//               <div className="form-group">
//                 <label>LinkedIn</label>
//                 <input
//                   name="linkedinLink"
//                   value={updateMember.linkedinLink}
//                   onChange={handleUpdateInputChange}
//                 />
//               </div>
//             </div>

//             <div className="form-actions">
//               <button
//                 type="button"
//                 className="btn-cancel"
//                 onClick={() => setUpdateMember(null)}
//               >
//                 Cancel
//               </button>
//               <button type="submit" className="btn-submit">
//                 Update Member
//               </button>
//             </div>
//           </form>
//         </div>
//       )}
//     </section>
//   );
// }


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

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 700);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

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
    profileImage: null,
  });
  const [updateMember, setUpdateMember] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState("");

  const isMobile = useIsMobile();

  // Dummy team members data
  const dummyMembers = {
    "Core": [
      {
        _id: "core-1",
        name: "Mayuresh Muluk",
        role: "President",
        team: "Core",
        githubLink: "https://github.com/rahulsharma",
        linkedinLink: "https://linkedin.com/in/rahulsharma",
        profileImage: "/avatar_boy.jpg"
      },
      {
        _id: "core-2",
        name: "Pranav Metil",
        role: "Vice President",
        team: "Core",
        githubLink: "https://github.com/priyapatel",
        linkedinLink: "https://linkedin.com/in/priyapatel",
        profileImage: "/avatar_boy.jpg"
      },
      {
        _id: "core-3",
        name: "Sonali Kambale",
        role: "Secretary",
        team: "Core",
        githubLink: "https://github.com/amitkumar",
        linkedinLink: "https://linkedin.com/in/amitkumar",
        profileImage: "/default-avatar.jpg"
      }
    ],
    "Web Dev": [
      {
        _id: "web-1",
        name: "Akshay Jha",
        role: "Team Lead",
        team: "Web Dev",
        githubLink: "https://github.com/snehajoshi",
        linkedinLink: "https://linkedin.com/in/snehajoshi",
        profileImage: "/avatar_boy.jpg"
      },
      {
        _id: "web-2",
        name: "Dipali Deore",
        role: "Full Stack Developer",
        team: "Web Dev",
        githubLink: "https://github.com/arunmishra",
        linkedinLink: "https://linkedin.com/in/arunmishra",
        profileImage: "/default-avatar.jpg"
      },
      {
        _id: "web-3",
        name: "Jagruti Kaulkar",
        role: "UI/UX Developer",
        team: "Web Dev",
        githubLink: "https://github.com/poojareddy",
        linkedinLink: "https://linkedin.com/in/poojareddy",
        profileImage: "/default-avatar.jpg"
      }
    ]
  };

  useEffect(() => {
    setIsAdmin(true); // demo admin
  }, []);

  // Load members based on active category
  useEffect(() => {
    setLoading(true);
    
    // Simulate API call delay
    const timer = setTimeout(() => {
      const categoryMembers = dummyMembers[activeCategory] || [];
      setMembers(categoryMembers);
      setCarouselIndex(0);
      setLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
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

  // Add new member to dummy data
  const handleAddMember = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const newMemberObj = {
        _id: `${newMember.team.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
        name: newMember.name,
        role: newMember.role,
        team: newMember.team,
        githubLink: newMember.githubLink,
        linkedinLink: newMember.linkedinLink,
        profileImage: imagePreview || "/default-avatar.jpg"
      };

      // Add to dummy data
      if (!dummyMembers[newMember.team]) {
        dummyMembers[newMember.team] = [];
      }
      dummyMembers[newMember.team].push(newMemberObj);

      // Update current display if category matches
      if (activeCategory === newMember.team) {
        setMembers(prev => [...prev, newMemberObj]);
      }

      setShowAddModal(false);
      setNewMember({
        name: "",
        role: "",
        team: activeCategory,
        githubLink: "",
        linkedinLink: "",
        profileImage: null,
      });
      setImagePreview(null);
      alert("Member added successfully!");
    } catch (err) {
      console.error("Add member error:", err);
      setError(err.message);
      alert("Failed to add member: " + err.message);
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

  // Update member in dummy data
  const handleUpdateMember = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Find and update member in dummy data
      const teamMembers = dummyMembers[updateMember.team];
      const memberIndex = teamMembers.findIndex(m => m._id === updateMember._id);
      
      if (memberIndex !== -1) {
        teamMembers[memberIndex] = {
          ...teamMembers[memberIndex],
          name: updateMember.name,
          role: updateMember.role,
          team: updateMember.team,
          githubLink: updateMember.githubLink,
          linkedinLink: updateMember.linkedinLink,
          profileImage: updateMember.previewImage || teamMembers[memberIndex].profileImage
        };

        // Update current display
        if (activeCategory === updateMember.team) {
          setMembers([...teamMembers]);
        }
      }

      setShowUpdateModal(false);
      setUpdateMember(null);
      alert("Member updated successfully!");
    } catch (err) {
      console.error("Update member error:", err);
      setError(err.message);
      alert("Failed to update member: " + err.message);
    }
  };

  // Delete member from dummy data
  const handleDeleteMember = async (id) => {
    if (!confirm("Are you sure you want to delete this member?")) return;
    
    try {
      // Find member to get their team
      let memberTeam = "";
      for (const team in dummyMembers) {
        const member = dummyMembers[team].find(m => m._id === id);
        if (member) {
          memberTeam = team;
          break;
        }
      }

      if (memberTeam) {
        // Remove from dummy data
        dummyMembers[memberTeam] = dummyMembers[memberTeam].filter(m => m._id !== id);
        
        // Update current display if category matches
        if (activeCategory === memberTeam) {
          setMembers(prev => prev.filter(m => m._id !== id));
        }
      }
    } catch (err) {
      alert("Error deleting member: " + err.message);
    }
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    setImagePreview(null);
    setError("");
    setNewMember({
      name: "",
      role: "",
      team: activeCategory,
      githubLink: "",
      linkedinLink: "",
      profileImage: null,
    });
  };

  // Carousel navigation
  const handlePrev = () => {
    setCarouselIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCarouselIndex((prev) => Math.min(prev + 1, members.length - 1));
  };

  const CategorySelector = () =>
    isMobile ? (
      <select
        className="members-category-dropdown"
        value={activeCategory}
        onChange={(e) => setActiveCategory(e.target.value)}
      >
        {TEAM_CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    ) : (
      <div className="members-categories">
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
          >
            + Add Member
          </button>
        )}
      </div>
    );

  const AddMemberMobileForm = () => (
    <form
      className="members-modal-form members-modal-form-grid mobile-add-form"
      onSubmit={handleAddMember}
    >
      {error && <div className="error-message">{error}</div>}
      <div className="form-row">
        <div className="form-group">
          <label>Name</label>
          <input
            name="name"
            value={newMember.name}
            onChange={handleInputChange}
            required
            placeholder="Enter full name"
          />
        </div>
        <div className="form-group">
          <label>Role</label>
          <input
            name="role"
            value={newMember.role}
            onChange={handleInputChange}
            required
            placeholder="Enter role/position"
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
          <label>Profile Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="file-input"
          />
          {imagePreview && (
            <img src={imagePreview} alt="Preview" className="file-preview" />
          )}
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>GitHub</label>
          <input
            name="githubLink"
            value={newMember.githubLink}
            onChange={handleInputChange}
            placeholder="https://github.com/username"
          />
        </div>
        <div className="form-group">
          <label>LinkedIn</label>
          <input
            name="linkedinLink"
            value={newMember.linkedinLink}
            onChange={handleInputChange}
            placeholder="https://linkedin.com/in/username"
          />
        </div>
      </div>
      <div className="form-actions">
        <button type="submit" className="btn-submit">
          Add Member
        </button>
      </div>
    </form>
  );

  return (
    <section className="members-section">
      <div className="members-container">
        <h2 className="members-title">Meet the Team</h2>
        <p className="members-subtitle">Passionate. Skilled. United.</p>

        {error && <div className="error-banner">{error}</div>}

        <CategorySelector />

        {isMobile && isAdmin && (
          <div className="mobile-add-member-box">
            <h3 className="mobile-add-title">Add New Team Member</h3>
            <AddMemberMobileForm />
          </div>
        )}

        <div className={isMobile ? "members-list-mobile" : "members-list"}>
          {loading ? (
            <div className="members-empty">Loading team members...</div>
          ) : members.length === 0 ? (
            <div className="members-empty">
              No members found for {activeCategory} team.
            </div>
          ) : isMobile ? (
            <div className="mobile-carousel-wrapper">
              <button
                className="carousel-arrow"
                onClick={handlePrev}
                disabled={carouselIndex === 0}
              >
                &#8592;
              </button>
              <div className="member-card mobile-card">
                <div className="member-image-wrapper">
                  <Image
                    src={members[carouselIndex].profileImage}
                    alt={members[carouselIndex].name}
                    width={160}
                    height={160}
                    className="member-image"
                    unoptimized={true}
                  />
                </div>
                <div className="member-info">
                  <div className="member-name">
                    {members[carouselIndex].name}
                  </div>
                  <div className="member-role">
                    {members[carouselIndex].role}
                  </div>
                  <div className="member-team">
                    {members[carouselIndex].team}
                  </div>
                </div>
                <div className="member-socials">
                  {members[carouselIndex].githubLink && (
                    <a
                      href={members[carouselIndex].githubLink}
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
                  {members[carouselIndex].linkedinLink && (
                    <a
                      href={members[carouselIndex].linkedinLink}
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
                      onClick={() => openUpdateModal(members[carouselIndex])}
                    >
                      Update
                    </button>
                    <button
                      onClick={() =>
                        handleDeleteMember(members[carouselIndex]._id)
                      }
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
              <button
                className="carousel-arrow"
                onClick={handleNext}
                disabled={carouselIndex === members.length - 1}
              >
                &#8594;
              </button>
            </div>
          ) : (
            members.map((member) => (
              <div key={member._id} className="member-card">
                <div className="member-image-wrapper">
                  <Image
                    src={member.profileImage}
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
                    <button onClick={() => openUpdateModal(member)}>
                      Update
                    </button>
                    <button onClick={() => handleDeleteMember(member._id)}>
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Add Member Modal (Desktop) */}
      {!isMobile && showAddModal && (
        <div className="members-modal-overlay">
          <div className="members-modal">
            <div className="members-modal-header">
              <h3>Add New Team Member</h3>
              <button
                className="members-modal-close"
                onClick={handleCloseAddModal}
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
                  <label>Name</label>
                  <input
                    name="name"
                    value={newMember.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter full name"
                  />
                </div>
                <div className="form-group">
                  <label>Role</label>
                  <input
                    name="role"
                    value={newMember.role}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter role/position"
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
                  <label>Profile Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="file-input"
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
                  <label>GitHub</label>
                  <input
                    name="githubLink"
                    value={newMember.githubLink}
                    onChange={handleInputChange}
                    placeholder="https://github.com/username"
                  />
                </div>
                <div className="form-group">
                  <label>LinkedIn</label>
                  <input
                    name="linkedinLink"
                    value={newMember.linkedinLink}
                    onChange={handleInputChange}
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
              </div>
              <div className="form-actions">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={handleCloseAddModal}
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

      {/* Update Member Section (Mobile) */}
      {isMobile && isAdmin && updateMember && (
        <div className="mobile-add-member-box">
          <h3 className="mobile-add-title">Update Team Member</h3>
          <form
            className="members-modal-form members-modal-form-grid mobile-add-form"
            onSubmit={handleUpdateMember}
          >
            {error && <div className="error-message">{error}</div>}
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
                <label>Profile Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleUpdateFileChange}
                  className="file-input"
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
                onClick={() => setUpdateMember(null)}
              >
                Cancel
              </button>
              <button type="submit" className="btn-submit">
                Update Member
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}
