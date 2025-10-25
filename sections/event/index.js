// import { useState, useEffect } from "react";
// import Image from "next/image";

// function EventSkeleton({ count = 2 }) {
//   return (
//     <div className="carousel-container">
//       {Array.from({ length: count }).map((_, idx) => (
//         <div key={idx} className="event-card">
//           <div className="event-card-inner skeleton-card">
//             <div className="event-date-box skeleton-date"></div>
//             <div className="skeleton-title"></div>
//             <div className="skeleton-desc"></div>
//             <div className="event-footer">
//               <div className="flex items-center justify-between">
//                 <div className="event-venue">
//                   <div className="event-venue-icon skeleton-dot"></div>
//                   <span className="skeleton-venue"></span>
//                 </div>
//                 <div className="skeleton-btn"></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default function EventSection() {
//   const [activeFilter, setActiveFilter] = useState("All");
//   const [visibleEvents, setVisibleEvents] = useState(2);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [showAddEventModal, setShowAddEventModal] = useState(false);
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // New event form state (includes all fields, but some ignored in POST)
//   const [newEvent, setNewEvent] = useState({
//     event_id: "",
//     title: "",
//     description: "",
//     date: "",
//     time: "",
//     venue: "",
//     mode: "Offline",
//     status: "Upcoming",
//     category: "Workshop",
//     registration_link: "",
//     imageUrl: "", // optional
//   });

//   // Use hardcoded token for all requests
//   const token =
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGV4YW1wbGUuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzYxNDA3NTM1LCJleHAiOjE3NjE0MTExMzV9.q881jh6XpYQESjyS-j7bhOSAHhTL9NVOs4gVP-v7_FY";

//   useEffect(() => {
//     setIsAdmin(true); // demo admin
//   }, []);

//   // Fetch events
//   const fetchEvents = async (category = "All") => {
//     try {
//       setLoading(true);
//       let url = "http://localhost:3001/events";
//       if (category !== "All") {
//         url = `http://localhost:3001/events/category/${category.toLowerCase()}`;
//       }

//       const res = await fetch(url, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       if (res.status === 401) {
//         setEvents([]);
//         throw new Error("Unauthorized: Invalid or missing token");
//       }

//       const data = await res.json();
//       setEvents(data.events || []);
//     } catch (err) {
//       console.error("Error fetching events:", err);
//       setEvents([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   useEffect(() => {
//     fetchEvents(activeFilter);
//     setCurrentIndex(0);
//   }, [activeFilter]);

//   // Format date
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return {
//       day: date.getDate().toString(),
//       month: date.toLocaleString("default", { month: "short" }),
//     };
//   };

//   // Responsive visible events
//   useEffect(() => {
//     const handleResize = () => {
//       setVisibleEvents(window.innerWidth < 768 ? 1 : 2);
//     };
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // Auto carousel scroll
//   useEffect(() => {
//     if (events.length <= visibleEvents) return;
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) => {
//         const nextIndex = prevIndex + 1;
//         return nextIndex >= Math.ceil(events.length / visibleEvents)
//           ? 0
//           : nextIndex;
//       });
//     }, 6000);
//     return () => clearInterval(interval);
//   }, [events.length, visibleEvents]);

//   const scrollCarousel = (direction) => {
//     const maxIndex = Math.ceil(events.length / visibleEvents) - 1;
//     const newIndex =
//       direction === "left"
//         ? Math.max(0, currentIndex - 1)
//         : Math.min(maxIndex, currentIndex + 1);
//     setCurrentIndex(newIndex);
//   };

//   const maxIndex = Math.ceil(events.length / visibleEvents) - 1;
//   const isLeftDisabled = currentIndex === 0;
//   const isRightDisabled = currentIndex >= maxIndex;

//   const getCurrentEvents = () => {
//     if (!Array.isArray(events)) return [];
//     const startIndex = currentIndex * visibleEvents;
//     return events.slice(startIndex, startIndex + visibleEvents);
//   };

//   // Handle input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewEvent({
//       ...newEvent,
//       [name]: value,
//     });
//   };

//   // Submit new event
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!newEvent.event_id) {
//       alert("Event ID is required");
//       return;
//     }

//     // ✅ Extract only mandatory fields
//     const {
//       event_id,
//       title,
//       description,
//       date,
//       venue,
//       mode,
//       status,
//       category,
//     } = newEvent;

//     const eventPayload = {
//       event_id,
//       title,
//       description,
//       date,
//       venue,
//       mode,
//       status,
//       category,
//     };

//     try {
//       const res = await fetch("http://localhost:3001/events/create", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(eventPayload),
//       });

//       if (!res.ok) throw new Error("Failed to add event");

//       setShowAddEventModal(false);
//       setNewEvent({
//         event_id: "",
//         title: "",
//         description: "",
//         date: "",
//         time: "",
//         venue: "",
//         mode: "Offline",
//         status: "Upcoming",
//         category: "Workshop",
//         registration_link: "",
//         imageUrl: "",
//       });

//       fetchEvents(activeFilter);
//       alert("✅ Event created successfully!");
//     } catch (err) {
//       console.error("Error creating event:", err);
//       alert("❌ Failed to create event. Try again.");
//     }
//   };

//   return (
//     <section className="event-section">
//       <div className="event-container">
//         {/* Header */}
//         <div className="event-header">
//           <div className="event-header-content">
//             <h2 className="event-title">
//               Explore Our <span className="event-gradient-text">Events</span>
//             </h2>
//             <p className="event-subtitle">
//               Stay tuned with workshops, webinars, and cloud camps.
//             </p>
//             <div className="filter-container">
//               {["All", "Workshop", "Webinar"].map((filter) => (
//                 <button
//                   key={filter}
//                   className={`filter-button ${
//                     activeFilter === filter
//                       ? "filter-button-active"
//                       : "filter-button-inactive"
//                   }`}
//                   onClick={() => setActiveFilter(filter)}
//                 >
//                   {filter}
//                 </button>
//               ))}
//               {isAdmin && (
//                 <button
//                   className="filter-button filter-button-add"
//                   onClick={() => setShowAddEventModal(true)}
//                 >
//                   + Add Event
//                 </button>
//               )}
//             </div>
//           </div>
//           <div className="event-image-container">
//             <div className="event-image">
//               <Image
//                 src="/calendar-cloud.png"
//                 alt="Calendar and Cloud"
//                 fill
//                 className="object-contain"
//                 priority
//               />
//             </div>
//           </div>
//         </div>

//         {/* Events Carousel */}
//         <div className="event-carousel">
//           <button
//             onClick={() => scrollCarousel("left")}
//             disabled={isLeftDisabled}
//             className={`carousel-arrow carousel-arrow-left ${
//               isLeftDisabled
//                 ? "carousel-arrow-disabled"
//                 : "carousel-arrow-enabled"
//             }`}
//           >
//             <svg
//               className="w-6 h-6 text-white"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M15 19l-7-7 7-7"
//               ></path>
//             </svg>
//           </button>

//           {loading ? (
//             <EventSkeleton count={visibleEvents} />
//           ) : (
//             <div className="carousel-container">
//               {getCurrentEvents().map((event) => {
//                 const { day, month } = formatDate(event.date);

//                 // Show "Register" for all events today or in the future
//                 const eventDate = new Date(event.date);
//                 const today = new Date();
//                 today.setHours(0, 0, 0, 0); // Ignore time for comparison
//                 const isUpcoming = eventDate >= today;

//                 // Show "PAST" label if event date is in the past
//                 const isPast = eventDate < today;

//                 return (
//                   <div key={event.event_id} className="event-card">
//                     <div className="event-card-inner">
//                       {/* Past Event Label */}
//                       {isPast && <div className="event-past-label">PAST</div>}

//                       {/* Date Box */}
//                       <div className="event-date-box">
//                         <span className="event-date-day">{day}</span>
//                         <span className="event-date-month">{month}</span>
//                       </div>

//                       {/* Event Content */}
//                       <div className="flex-grow">
//                         <h3 className="event-title-text">{event.title}</h3>
//                         <p className="event-description">{event.description}</p>
//                       </div>

//                       {/* Footer */}
//                       <div className="event-footer">
//                         <div className="flex items-center justify-between">
//                           <div className="event-venue">
//                             <div className="event-venue-icon">
//                               <div className="event-venue-dot">
//                                 <div className="event-venue-dot-inner"></div>
//                               </div>
//                             </div>
//                             <span className="event-venue-text">
//                               {event.venue}
//                             </span>
//                           </div>
//                           {isUpcoming && (
//                             <a
//                               href={event.registration_link || "#"}
//                               target="_blank"
//                               rel="noopener noreferrer"
//                               className="event-register-button"
//                             >
//                               Register
//                             </a>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}

//           <button
//             onClick={() => scrollCarousel("right")}
//             disabled={isRightDisabled}
//             className={`carousel-arrow carousel-arrow-right ${
//               isRightDisabled
//                 ? "carousel-arrow-disabled"
//                 : "carousel-arrow-enabled"
//             }`}
//           >
//             <svg
//               className="w-6 h-6 text-white"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M9 5l7 7-7 7"
//               ></path>
//             </svg>
//           </button>
//         </div>

//         {/* CTA */}
//         <div className="event-cta">
//           <h1 className="event-cta-title">
//             Don't miss our next hands-on event!
//           </h1>
//           <p className="event-cta-subtitle">
//             Be part of the builder's journey.
//           </p>
//           <button className="event-cta-button">
//             <a href="https://www.meetup.com/aws-cloud-club-at-pict/" target="_blank" alt="Image not loaded">Join Cloud Club</a></button>
//         </div>
//       </div>

//       {/* Add Event Modal */}
//       {showAddEventModal && (
//         <div className="event-form-overlay">
//           <div className="event-form-container">
//             <div className="event-form-header">
//               <h2>Add New Event</h2>
//               <button
//                 className="event-form-close"
//                 onClick={() => setShowAddEventModal(false)}
//               >
//                 &times;
//               </button>
//             </div>

//             <form onSubmit={handleSubmit} className="event-form">
//               {/* Event ID */}
//               <div className="form-group">
//                 <label htmlFor="event_id">Event ID *</label>
//                 <input
//                   type="text"
//                   id="event_id"
//                   name="event_id"
//                   value={newEvent.event_id}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>

//               {/* Title + Category */}
//               <div className="form-row">
//                 <div className="form-group">
//                   <label htmlFor="title">Event Title *</label>
//                   <input
//                     type="text"
//                     id="title"
//                     name="title"
//                     value={newEvent.title}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="category">Category *</label>
//                   <select
//                     id="category"
//                     name="category"
//                     value={newEvent.category}
//                     onChange={handleInputChange}
//                     required
//                   >
//                     <option value="Workshop">Workshop</option>
//                     <option value="Webinar">Webinar</option>
//                     <option value="Conference">Conference</option>
//                     <option value="Seminar">Seminar</option>
//                   </select>
//                 </div>
//               </div>

//               {/* Description */}
//               <div className="form-group">
//                 <label htmlFor="description">Description *</label>
//                 <textarea
//                   id="description"
//                   name="description"
//                   value={newEvent.description}
//                   onChange={handleInputChange}
//                   required
//                   rows="3"
//                 />
//               </div>

//               {/* Date + Time */}
//               <div className="form-row">
//                 <div className="form-group">
//                   <label htmlFor="date">Date *</label>
//                   <input
//                     type="date"
//                     id="date"
//                     name="date"
//                     value={newEvent.date}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="time">Time</label>
//                   <input
//                     type="text"
//                     id="time"
//                     name="time"
//                     value={newEvent.time}
//                     onChange={handleInputChange}
//                     placeholder="e.g., 2:00 PM - 5:00 PM"
//                   />
//                 </div>
//               </div>

//               {/* Venue + Mode */}
//               <div className="form-row">
//                 <div className="form-group">
//                   <label htmlFor="venue">Venue/Platform *</label>
//                   <input
//                     type="text"
//                     id="venue"
//                     name="venue"
//                     value={newEvent.venue}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="mode">Mode *</label>
//                   <select
//                     id="mode"
//                     name="mode"
//                     value={newEvent.mode}
//                     onChange={handleInputChange}
//                     required
//                   >
//                     <option value="Offline">Offline</option>
//                     <option value="Online">Online</option>
//                     <option value="Hybrid">Hybrid</option>
//                   </select>
//                 </div>
//               </div>

//               {/* Status + Registration Link */}
//               <div className="form-row">
//                 <div className="form-group">
//                   <label htmlFor="status">Status *</label>
//                   <select
//                     id="status"
//                     name="status"
//                     value={newEvent.status}
//                     onChange={handleInputChange}
//                     required
//                   >
//                     <option value="Upcoming">Upcoming</option>
//                     <option value="Ongoing">Ongoing</option>
//                     <option value="Past">Past</option>
//                   </select>
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="registration_link">Registration Link</label>
//                   <input
//                     type="url"
//                     id="registration_link"
//                     name="registration_link"
//                     value={newEvent.registration_link}
//                     onChange={handleInputChange}
//                     placeholder="https://forms.example.com/register"
//                   />
//                 </div>
//               </div>

//               {/* Optional Image URL */}
//               <div className="form-group">
//                 <label htmlFor="imageUrl">Banner Image URL</label>
//                 <input
//                   type="text"
//                   id="imageUrl"
//                   name="imageUrl"
//                   value={newEvent.imageUrl}
//                   onChange={handleInputChange}
//                   placeholder="https://example.com/banner.jpg"
//                 />
//               </div>

//               {/* Actions */}
//               <div className="form-actions">
//                 <button
//                   type="button"
//                   className="btn-cancel"
//                   onClick={() => setShowAddEventModal(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button type="submit" className="btn-submit">
//                   Add Event
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// }

import { useState, useEffect } from "react";
import Image from "next/image";

function EventSkeleton({ count = 2 }) {
  return (
    <div className="carousel-container">
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="event-card">
          <div className="event-card-inner skeleton-card">
            <div className="event-date-box skeleton-date"></div>
            <div className="skeleton-title"></div>
            <div className="skeleton-desc"></div>
            <div className="event-footer">
              <div className="flex items-center justify-between">
                <div className="event-venue">
                  <div className="event-venue-icon skeleton-dot"></div>
                  <span className="skeleton-venue"></span>
                </div>
                <div className="skeleton-btn"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function EventSection() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [visibleEvents, setVisibleEvents] = useState(2);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  // New event form state
  const [newEvent, setNewEvent] = useState({
    event_id: "",
    title: "",
    description: "",
    date: "",
    time: "",
    venue: "",
    mode: "Offline",
    status: "Upcoming",
    category: "Workshop",
    registration_link: "",
    imageUrl: "",
  });

  // Dummy events data
  const dummyEvents = [
    // Workshop Events
    {
      event_id: "workshop-1",
      title: "AWS Cloud Computing Workshop",
      description: "Learn about AWS services, EC2, S3, and cloud deployment strategies with hands-on labs.",
      date: "2024-03-15",
      time: "2:00 PM - 5:00 PM",
      venue: "PICT Computer Lab",
      mode: "Offline",
      status: "Upcoming",
      category: "Workshop",
      registration_link: "https://forms.google.com/aws-workshop"
    },
    {
      event_id: "workshop-2",
      title: "Docker & Kubernetes Workshop",
      description: "Master containerization and orchestration with Docker and Kubernetes. Build, deploy, and scale applications.",
      date: "2024-02-20",
      time: "10:00 AM - 1:00 PM",
      venue: "Online - Microsoft Teams",
      mode: "Online",
      status: "Past",
      category: "Workshop",
      registration_link: "https://forms.google.com/docker-k8s"
    },
    {
      event_id: "workshop-3",
      title: "Machine Learning Fundamentals",
      description: "Introduction to ML concepts, algorithms, and practical implementation using Python and scikit-learn.",
      date: "2024-04-10",
      time: "9:30 AM - 4:30 PM",
      venue: "PICT AI Lab",
      mode: "Offline",
      status: "Upcoming",
      category: "Workshop",
      registration_link: "https://forms.google.com/ml-workshop"
    },
    {
      event_id: "workshop-4",
      title: "Web Development with React & Node.js",
      description: "Full-stack web development workshop covering React frontend and Node.js backend development.",
      date: "2024-01-25",
      time: "11:00 AM - 2:00 PM",
      venue: "PICT Seminar Hall",
      mode: "Offline",
      status: "Past",
      category: "Workshop",
      registration_link: "https://forms.google.com/react-node"
    },
    {
      event_id: "workshop-5",
      title: "Cybersecurity Essentials",
      description: "Learn about network security, encryption, and ethical hacking techniques in this comprehensive workshop.",
      date: "2024-05-05",
      time: "1:00 PM - 6:00 PM",
      venue: "PICT Cybersecurity Lab",
      mode: "Offline",
      status: "Upcoming",
      category: "Workshop",
      registration_link: "https://forms.google.com/cybersecurity"
    },

    // Webinar Events
    {
      event_id: "webinar-1",
      title: "Future of Cloud Computing",
      description: "Industry experts discuss emerging trends in cloud technology and career opportunities in cloud computing.",
      date: "2024-03-08",
      time: "6:00 PM - 7:30 PM",
      venue: "Online - Zoom Webinar",
      mode: "Online",
      status: "Upcoming",
      category: "Webinar",
      registration_link: "https://forms.google.com/cloud-future"
    },
    {
      event_id: "webinar-2",
      title: "AI and Machine Learning Trends",
      description: "Explore the latest advancements in AI and ML with industry leaders and researchers.",
      date: "2024-02-12",
      time: "5:00 PM - 6:30 PM",
      venue: "Online - Google Meet",
      mode: "Online",
      status: "Past",
      category: "Webinar",
      registration_link: "https://forms.google.com/ai-trends"
    },
    {
      event_id: "webinar-3",
      title: "DevOps Best Practices",
      description: "Learn about CI/CD pipelines, infrastructure as code, and modern DevOps methodologies.",
      date: "2024-04-18",
      time: "7:00 PM - 8:30 PM",
      venue: "Online - Microsoft Teams",
      mode: "Online",
      status: "Upcoming",
      category: "Webinar",
      registration_link: "https://forms.google.com/devops-webinar"
    },
    {
      event_id: "webinar-4",
      title: "Blockchain Technology Explained",
      description: "Understanding blockchain fundamentals, cryptocurrencies, and real-world applications.",
      date: "2024-01-30",
      time: "4:00 PM - 5:30 PM",
      venue: "Online - Zoom Webinar",
      mode: "Online",
      status: "Past",
      category: "Webinar",
      registration_link: "https://forms.google.com/blockchain-webinar"
    },
    {
      event_id: "webinar-5",
      title: "Data Science Career Path",
      description: "Guidance on building a career in data science, required skills, and industry expectations.",
      date: "2024-05-12",
      time: "6:30 PM - 8:00 PM",
      venue: "Online - YouTube Live",
      mode: "Online",
      status: "Upcoming",
      category: "Webinar",
      registration_link: "https://forms.google.com/datascience-career"
    },

    // Conference Events
    {
      event_id: "conference-1",
      title: "Annual Tech Conference 2024",
      description: "PICT's flagship technology conference featuring talks, workshops, and networking sessions.",
      date: "2024-06-15",
      time: "9:00 AM - 6:00 PM",
      venue: "PICT Main Auditorium",
      mode: "Offline",
      status: "Upcoming",
      category: "Conference",
      registration_link: "https://forms.google.com/tech-conference"
    },
    {
      event_id: "conference-2",
      title: "Cloud Innovation Summit",
      description: "Join industry leaders discussing cloud innovations, case studies, and future technologies.",
      date: "2024-03-22",
      time: "10:00 AM - 5:00 PM",
      venue: "Hybrid - Online & On-campus",
      mode: "Hybrid",
      status: "Upcoming",
      category: "Conference",
      registration_link: "https://forms.google.com/cloud-summit"
    },

    // Seminar Events
    {
      event_id: "seminar-1",
      title: "Career Guidance in IT",
      description: "Interactive session with alumni working in top tech companies sharing their experiences.",
      date: "2024-02-28",
      time: "3:00 PM - 5:00 PM",
      venue: "PICT Seminar Hall 2",
      mode: "Offline",
      status: "Upcoming",
      category: "Seminar",
      registration_link: "https://forms.google.com/career-guidance"
    },
    {
      event_id: "seminar-2",
      title: "Research Opportunities in CS",
      description: "Learn about research avenues and higher education opportunities in computer science.",
      date: "2024-04-05",
      time: "2:30 PM - 4:30 PM",
      venue: "PICT Library Auditorium",
      mode: "Offline",
      status: "Upcoming",
      category: "Seminar",
      registration_link: "https://forms.google.com/research-seminar"
    }
  ];

  useEffect(() => {
    setIsAdmin(true); // demo admin - you can set this based on your logic
  }, []);

  // Filter events based on active filter
  useEffect(() => {
    setLoading(true);
    
    // Simulate API call delay
    const timer = setTimeout(() => {
      if (activeFilter === "All") {
        setEvents(dummyEvents);
      } else {
        const filteredEvents = dummyEvents.filter(
          event => event.category === activeFilter
        );
        setEvents(filteredEvents);
      }
      setLoading(false);
      setCurrentIndex(0);
    }, 500); // Simulate network delay
    
    return () => clearTimeout(timer);
  }, [activeFilter]);

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      day: date.getDate().toString(),
      month: date.toLocaleString("default", { month: "short" }),
    };
  };

  // Responsive visible events
  useEffect(() => {
    const handleResize = () => {
      setVisibleEvents(window.innerWidth < 768 ? 1 : 2);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto carousel scroll
  useEffect(() => {
    if (events.length <= visibleEvents) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        return nextIndex >= Math.ceil(events.length / visibleEvents)
          ? 0
          : nextIndex;
      });
    }, 6000);
    return () => clearInterval(interval);
  }, [events.length, visibleEvents]);

  const scrollCarousel = (direction) => {
    const maxIndex = Math.ceil(events.length / visibleEvents) - 1;
    const newIndex =
      direction === "left"
        ? Math.max(0, currentIndex - 1)
        : Math.min(maxIndex, currentIndex + 1);
    setCurrentIndex(newIndex);
  };

  const maxIndex = Math.ceil(events.length / visibleEvents) - 1;
  const isLeftDisabled = currentIndex === 0;
  const isRightDisabled = currentIndex >= maxIndex;

  const getCurrentEvents = () => {
    if (!Array.isArray(events)) return [];
    const startIndex = currentIndex * visibleEvents;
    return events.slice(startIndex, startIndex + visibleEvents);
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({
      ...newEvent,
      [name]: value,
    });
  };

  // Submit new event (add to dummy data)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newEvent.event_id) {
      alert("Event ID is required");
      return;
    }

    // Create new event object
    const newEventObj = {
      ...newEvent,
      event_id: newEvent.event_id.toLowerCase().replace(/\s+/g, '-'),
    };

    // Add to dummy events array
    dummyEvents.unshift(newEventObj); // Add to beginning
    
    // Update state to reflect the new event
    if (activeFilter === "All" || activeFilter === newEvent.category) {
      setEvents(prevEvents => [newEventObj, ...prevEvents]);
    }

    setShowAddEventModal(false);
    setNewEvent({
      event_id: "",
      title: "",
      description: "",
      date: "",
      time: "",
      venue: "",
      mode: "Offline",
      status: "Upcoming",
      category: "Workshop",
      registration_link: "",
      imageUrl: "",
    });

    alert("✅ Event created successfully!");
  };

  return (
    <section className="event-section">
      <div className="event-container">
        {/* Header */}
        <div className="event-header">
          <div className="event-header-content">
            <h2 className="event-title">
              Explore Our <span className="event-gradient-text">Events</span>
            </h2>
            <p className="event-subtitle">
              Stay tuned with workshops, webinars, and cloud camps.
            </p>
            <div className="filter-container">
              {["All", "Workshop", "Webinar", "Conference", "Seminar"].map((filter) => (
                <button
                  key={filter}
                  className={`filter-button ${
                    activeFilter === filter
                      ? "filter-button-active"
                      : "filter-button-inactive"
                  }`}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              ))}
              {isAdmin && (
                <button
                  className="filter-button filter-button-add"
                  onClick={() => setShowAddEventModal(true)}
                >
                  + Add Event
                </button>
              )}
            </div>
          </div>
          <div className="event-image-container">
            <div className="event-image">
              <Image
                src="/calendar-cloud.png"
                alt="Calendar and Cloud"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>

        {/* Events Carousel */}
        <div className="event-carousel">
          <button
            onClick={() => scrollCarousel("left")}
            disabled={isLeftDisabled}
            className={`carousel-arrow carousel-arrow-left ${
              isLeftDisabled
                ? "carousel-arrow-disabled"
                : "carousel-arrow-enabled"
            }`}
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
          </button>

          {loading ? (
            <EventSkeleton count={visibleEvents} />
          ) : (
            <div className="carousel-container">
              {getCurrentEvents().map((event) => {
                const { day, month } = formatDate(event.date);

                // Show "Register" for all events today or in the future
                const eventDate = new Date(event.date);
                const today = new Date();
                today.setHours(0, 0, 0, 0); // Ignore time for comparison
                const isUpcoming = eventDate >= today;

                // Show "PAST" label if event date is in the past
                const isPast = eventDate < today;

                return (
                  <div key={event.event_id} className="event-card">
                    <div className="event-card-inner">
                      {/* Past Event Label */}
                      {isPast && <div className="event-past-label">PAST</div>}

                      {/* Date Box */}
                      <div className="event-date-box">
                        <span className="event-date-day">{day}</span>
                        <span className="event-date-month">{month}</span>
                      </div>

                      {/* Event Content */}
                      <div className="flex-grow">
                        <h3 className="event-title-text">{event.title}</h3>
                        <p className="event-description">{event.description}</p>
                        <div className="event-meta">
                          <span className="event-category-badge">{event.category}</span>
                          <span className="event-mode-badge">{event.mode}</span>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="event-footer">
                        <div className="flex items-center justify-between">
                          <div className="event-venue">
                            <div className="event-venue-icon">
                              <div className="event-venue-dot">
                                <div className="event-venue-dot-inner"></div>
                              </div>
                            </div>
                            <span className="event-venue-text">
                              {event.venue}
                            </span>
                          </div>
                          {isUpcoming && (
                            <a
                              href={event.registration_link || "#"}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="event-register-button"
                            >
                              Register
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <button
            onClick={() => scrollCarousel("right")}
            disabled={isRightDisabled}
            className={`carousel-arrow carousel-arrow-right ${
              isRightDisabled
                ? "carousel-arrow-disabled"
                : "carousel-arrow-enabled"
            }`}
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
          </button>
        </div>

        {/* CTA */}
        <div className="event-cta">
          <h1 className="event-cta-title">
            Don't miss our next hands-on event!
          </h1>
          <p className="event-cta-subtitle">
            Be part of the builder's journey.
          </p>
          <button className="event-cta-button">
            <a href="https://www.meetup.com/aws-cloud-club-at-pict/" target="_blank" rel="noopener noreferrer">Join Cloud Club</a>
          </button>
        </div>
      </div>

      {/* Add Event Modal */}
      {showAddEventModal && (
        <div className="event-form-overlay">
          <div className="event-form-container">
            <div className="event-form-header">
              <h2>Add New Event</h2>
              <button
                className="event-form-close"
                onClick={() => setShowAddEventModal(false)}
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit} className="event-form">
              {/* Event ID */}
              <div className="form-group">
                <label htmlFor="event_id">Event ID *</label>
                <input
                  type="text"
                  id="event_id"
                  name="event_id"
                  value={newEvent.event_id}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., workshop-6"
                />
              </div>

              {/* Title + Category */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="title">Event Title *</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={newEvent.title}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter event title"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="category">Category *</label>
                  <select
                    id="category"
                    name="category"
                    value={newEvent.category}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="Workshop">Workshop</option>
                    <option value="Webinar">Webinar</option>
                    <option value="Conference">Conference</option>
                    <option value="Seminar">Seminar</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div className="form-group">
                <label htmlFor="description">Description *</label>
                <textarea
                  id="description"
                  name="description"
                  value={newEvent.description}
                  onChange={handleInputChange}
                  required
                  rows="3"
                  placeholder="Describe the event details, topics covered, and learning outcomes"
                />
              </div>

              {/* Date + Time */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="date">Date *</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={newEvent.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="time">Time</label>
                  <input
                    type="text"
                    id="time"
                    name="time"
                    value={newEvent.time}
                    onChange={handleInputChange}
                    placeholder="e.g., 2:00 PM - 5:00 PM"
                  />
                </div>
              </div>

              {/* Venue + Mode */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="venue">Venue/Platform *</label>
                  <input
                    type="text"
                    id="venue"
                    name="venue"
                    value={newEvent.venue}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., PICT Lab, Online - Zoom, etc."
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="mode">Mode *</label>
                  <select
                    id="mode"
                    name="mode"
                    value={newEvent.mode}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="Offline">Offline</option>
                    <option value="Online">Online</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
              </div>

              {/* Status + Registration Link */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="status">Status *</label>
                  <select
                    id="status"
                    name="status"
                    value={newEvent.status}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="Upcoming">Upcoming</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Past">Past</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="registration_link">Registration Link</label>
                  <input
                    type="url"
                    id="registration_link"
                    name="registration_link"
                    value={newEvent.registration_link}
                    onChange={handleInputChange}
                    placeholder="https://forms.example.com/register"
                  />
                </div>
              </div>

              {/* Optional Image URL */}
              <div className="form-group">
                <label htmlFor="imageUrl">Banner Image URL</label>
                <input
                  type="text"
                  id="imageUrl"
                  name="imageUrl"
                  value={newEvent.imageUrl}
                  onChange={handleInputChange}
                  placeholder="https://example.com/banner.jpg"
                />
              </div>

              {/* Actions */}
              <div className="form-actions">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setShowAddEventModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  Add Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}