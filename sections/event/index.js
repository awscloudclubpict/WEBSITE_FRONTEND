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
  const [user, setUser] = useState(null);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [showUpdateEventModal, setShowUpdateEventModal] = useState(false);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  // API Base URL
  const API_BASE_URL = "https://webiste-aws.onrender.com";

  // Event form states
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
    banner_image_url: "",
  });

  const [selectedEvent, setSelectedEvent] = useState(null);

  // Check if user is admin on component mount
  useEffect(() => {
    checkAdminStatus();
    fetchEvents();
  }, []);

  // Check if user is logged in as admin
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

  // Fetch events from backend
  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/events/`);
      const data = await response.json();

      if (response.ok) {
        setEvents(data.events || []);
      } else {
        console.error("Failed to fetch events:", data.error);
        setEvents([]);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch events by category
  const fetchEventsByCategory = async (category) => {
    setLoading(true);
    try {
      let url = `${API_BASE_URL}/events/`;
      if (category !== "All") {
        url = `${API_BASE_URL}/events/category/${category.toLowerCase()}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        setEvents(data.events || []);
      } else {
        console.error("Failed to fetch events:", data.error);
        setEvents([]);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      setEvents([]);
    } finally {
      setLoading(false);
      setCurrentIndex(0);
    }
  };

  // Filter events based on active filter
  useEffect(() => {
    fetchEventsByCategory(activeFilter);
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

  // Handle input changes for new event
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({
      ...newEvent,
      [name]: value,
    });
  };

  // Handle input changes for update event
  const handleUpdateInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedEvent({
      ...selectedEvent,
      [name]: value,
    });
  };

  // Submit new event
  const handleSubmit = async (e) => {
    e.preventDefault();
    setActionLoading(true);

    try {
      const userData = localStorage.getItem("user");
      if (!userData) {
        alert("Please login as admin to create events");
        return;
      }

      const user = JSON.parse(userData);
      if (user.role !== "admin") {
        alert("Only admin users can create events");
        return;
      }

      const response = await fetch(`${API_BASE_URL}/events/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEvent),
      });

      const data = await response.json();

      if (response.ok) {
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
          banner_image_url: "",
        });
        fetchEventsByCategory(activeFilter);
        alert("✅ Event created successfully!");
      } else {
        alert(`❌ Failed to create event: ${data.error}`);
      }
    } catch (error) {
      console.error("Error creating event:", error);
      alert("❌ Error creating event. Please try again.");
    } finally {
      setActionLoading(false);
    }
  };

  // Update event - WITHOUT token requirement
  const handleUpdate = async (e) => {
    e.preventDefault();
    setActionLoading(true);

    try {
      const userData = localStorage.getItem('user');
      if (!userData) {
        alert('Please login as admin to update events');
        return;
      }

      const user = JSON.parse(userData);
      if (user.role !== 'admin') {
        alert('Only admin users can update events');
        return;
      }

      const response = await fetch(
        `${API_BASE_URL}/events/${selectedEvent.event_id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(selectedEvent),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setShowUpdateEventModal(false);
        setSelectedEvent(null);
        fetchEventsByCategory(activeFilter);
        alert('✅ Event updated successfully!');
      } else {
        alert(`❌ Failed to update event: ${data.error}`);
      }
    } catch (error) {
      console.error('Error updating event:', error);
      alert('❌ Error updating event. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };

  // Delete event - WITHOUT token requirement
  const handleDelete = async (eventId) => {
    if (!confirm('Are you sure you want to delete this event?')) {
      return;
    }

    setActionLoading(true);

    try {
      const userData = localStorage.getItem('user');
      if (!userData) {
        alert('Please login as admin to delete events');
        return;
      }

      const user = JSON.parse(userData);
      if (user.role !== 'admin') {
        alert('Only admin users can delete events');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/events/${eventId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (response.ok) {
        fetchEventsByCategory(activeFilter);
        alert('✅ Event deleted successfully!');
      } else {
        alert(`❌ Failed to delete event: ${data.error}`);
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('❌ Error deleting event. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };

  // Open update modal
  const openUpdateModal = (event) => {
    setSelectedEvent({ ...event });
    setShowUpdateEventModal(true);
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
              {["All", "Workshop", "Webinar", "Conference", "Seminar"].map(
                (filter) => (
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
                )
              )}
              {isAdmin && (
                <button
                  className="filter-button filter-button-add"
                  onClick={() => setShowAddEventModal(true)}
                  disabled={actionLoading}
                >
                  {actionLoading ? "Loading..." : "+ Add Event"}
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
          ) : events.length === 0 ? (
            <div className="no-events-message">
              <h3>No events found</h3>
              <p>Check back later for upcoming events!</p>
            </div>
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
                      {/* Event Header with Past Label and Admin Actions */}
                      <div className="event-header-row">
                        {/* Past Event Label */}
                        {isPast && <div className="event-past-label">PAST</div>}
                        
                        {/* Admin Actions - Centered */}
                        {isAdmin && (
                          <div className="event-admin-actions">
                            <button
                              className="admin-btn admin-btn-edit"
                              onClick={() => openUpdateModal(event)}
                              disabled={actionLoading}
                              title="Edit Event"
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <button
                              className="admin-btn admin-btn-delete"
                              onClick={() => handleDelete(event.event_id)}
                              disabled={actionLoading}
                              title="Delete Event"
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        )}
                      </div>

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
                          <span className="event-category-badge">
                            {event.category}
                          </span>
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
                          {isUpcoming && event.registration_link && (
                            <a
                              href={event.registration_link}
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
            <a
              href="https://www.meetup.com/aws-cloud-club-at-pict/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Join Cloud Club
            </a>
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
                disabled={actionLoading}
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
                  disabled={actionLoading}
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
                    disabled={actionLoading}
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
                    disabled={actionLoading}
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
                  disabled={actionLoading}
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
                    disabled={actionLoading}
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
                    disabled={actionLoading}
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
                    disabled={actionLoading}
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
                    disabled={actionLoading}
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
                    disabled={actionLoading}
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
                    disabled={actionLoading}
                  />
                </div>
              </div>

              {/* Optional Image URL */}
              <div className="form-group">
                <label htmlFor="banner_image_url">Banner Image URL</label>
                <input
                  type="text"
                  id="banner_image_url"
                  name="banner_image_url"
                  value={newEvent.banner_image_url}
                  onChange={handleInputChange}
                  placeholder="https://example.com/banner.jpg"
                  disabled={actionLoading}
                />
              </div>

              {/* Actions */}
              <div className="form-actions">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setShowAddEventModal(false)}
                  disabled={actionLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-submit"
                  disabled={actionLoading}
                >
                  {actionLoading ? "Creating..." : "Add Event"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Update Event Modal */}
      {showUpdateEventModal && selectedEvent && (
        <div className="event-form-overlay">
          <div className="event-form-container">
            <div className="event-form-header">
              <h2>Update Event</h2>
              <button
                className="event-form-close"
                onClick={() => setShowUpdateEventModal(false)}
                disabled={actionLoading}
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleUpdate} className="event-form">
              {/* Event ID (disabled for update) */}
              <div className="form-group">
                <label htmlFor="update_event_id">Event ID</label>
                <input
                  type="text"
                  id="update_event_id"
                  value={selectedEvent.event_id}
                  disabled
                  className="disabled-input"
                />
                <small className="disabled-note">
                  Event ID cannot be changed
                </small>
              </div>

              {/* Title + Category */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="update_title">Event Title *</label>
                  <input
                    type="text"
                    id="update_title"
                    name="title"
                    value={selectedEvent.title}
                    onChange={handleUpdateInputChange}
                    required
                    placeholder="Enter event title"
                    disabled={actionLoading}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="update_category">Category *</label>
                  <select
                    id="update_category"
                    name="category"
                    value={selectedEvent.category}
                    onChange={handleUpdateInputChange}
                    required
                    disabled={actionLoading}
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
                <label htmlFor="update_description">Description *</label>
                <textarea
                  id="update_description"
                  name="description"
                  value={selectedEvent.description}
                  onChange={handleUpdateInputChange}
                  required
                  rows="3"
                  placeholder="Describe the event details, topics covered, and learning outcomes"
                  disabled={actionLoading}
                />
              </div>

              {/* Date + Time */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="update_date">Date *</label>
                  <input
                    type="date"
                    id="update_date"
                    name="date"
                    value={selectedEvent.date.split("T")[0]}
                    onChange={handleUpdateInputChange}
                    required
                    disabled={actionLoading}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="update_time">Time</label>
                  <input
                    type="text"
                    id="update_time"
                    name="time"
                    value={selectedEvent.time}
                    onChange={handleUpdateInputChange}
                    placeholder="e.g., 2:00 PM - 5:00 PM"
                    disabled={actionLoading}
                  />
                </div>
              </div>

              {/* Venue + Mode */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="update_venue">Venue/Platform *</label>
                  <input
                    type="text"
                    id="update_venue"
                    name="venue"
                    value={selectedEvent.venue}
                    onChange={handleUpdateInputChange}
                    required
                    placeholder="e.g., PICT Lab, Online - Zoom, etc."
                    disabled={actionLoading}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="update_mode">Mode *</label>
                  <select
                    id="update_mode"
                    name="mode"
                    value={selectedEvent.mode}
                    onChange={handleUpdateInputChange}
                    required
                    disabled={actionLoading}
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
                  <label htmlFor="update_status">Status *</label>
                  <select
                    id="update_status"
                    name="status"
                    value={selectedEvent.status}
                    onChange={handleUpdateInputChange}
                    required
                    disabled={actionLoading}
                  >
                    <option value="Upcoming">Upcoming</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Past">Past</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="update_registration_link">
                    Registration Link
                  </label>
                  <input
                    type="url"
                    id="update_registration_link"
                    name="registration_link"
                    value={selectedEvent.registration_link}
                    onChange={handleUpdateInputChange}
                    placeholder="https://forms.example.com/register"
                    disabled={actionLoading}
                  />
                </div>
              </div>

              {/* Optional Image URL */}
              <div className="form-group">
                <label htmlFor="update_banner_image_url">
                  Banner Image URL
                </label>
                <input
                  type="text"
                  id="update_banner_image_url"
                  name="banner_image_url"
                  value={selectedEvent.banner_image_url}
                  onChange={handleUpdateInputChange}
                  placeholder="https://example.com/banner.jpg"
                  disabled={actionLoading}
                />
              </div>

              {/* Actions */}
              <div className="form-actions">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setShowUpdateEventModal(false)}
                  disabled={actionLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-submit"
                  disabled={actionLoading}
                >
                  {actionLoading ? "Updating..." : "Update Event"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}