// API route for events by category
export default function handler(req, res) {
  const { method, query } = req;
  const { category } = query;

  if (method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${method} Not Allowed`);
  }

  // Sample events data
  const allEvents = [
    {
      _id: "1",
      title: "AWS Workshop: EC2 Fundamentals",
      description: "Learn the basics of EC2 instances and how to deploy applications",
      date: "2024-02-15",
      time: "10:00 AM",
      location: "Computer Lab 1",
      category: "workshop",
      organizer: "AWS Cloud Club PICT"
    },
    {
      _id: "2",
      title: "Cloud Security Best Practices",
      description: "Understand security principles in cloud computing",
      date: "2024-02-20", 
      time: "2:00 PM",
      location: "Auditorium",
      category: "seminar",
      organizer: "Security Team"
    },
    {
      _id: "3",
      title: "Networking Session",
      description: "Connect with industry professionals and alumni",
      date: "2024-02-25",
      time: "6:00 PM", 
      location: "Main Hall",
      category: "networking",
      organizer: "AWS Cloud Club PICT"
    }
  ];

  // Filter events by category
  const filteredEvents = allEvents.filter(event => 
    event.category.toLowerCase() === category.toLowerCase()
  );

  res.status(200).json(filteredEvents);
}