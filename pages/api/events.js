// API route for events
export default function handler(req, res) {
  const { method } = req;

  // Sample events data
  const sampleEvents = [
    {
      _id: "1",
      title: "AWS Workshop: EC2 Fundamentals",
      description: "Learn the basics of EC2 instances and how to deploy applications",
      date: "2024-02-15",
      time: "10:00 AM",
      location: "Computer Lab 1",
      category: "workshop",
      organizer: "AWS Cloud Club PICT",
      maxParticipants: 50,
      registeredCount: 23
    },
    {
      _id: "2",
      title: "Cloud Security Best Practices",
      description: "Understand security principles in cloud computing",
      date: "2024-02-20", 
      time: "2:00 PM",
      location: "Auditorium",
      category: "seminar",
      organizer: "Security Team",
      maxParticipants: 100,
      registeredCount: 67
    },
    {
      _id: "3",
      title: "Networking Session",
      description: "Connect with industry professionals and alumni",
      date: "2024-02-25",
      time: "6:00 PM", 
      location: "Main Hall",
      category: "networking",
      organizer: "AWS Cloud Club PICT",
      maxParticipants: 80,
      registeredCount: 45
    }
  ];

  switch (method) {
    case 'GET':
      // Return all events
      res.status(200).json(sampleEvents);
      break;
    
    case 'POST':
      // Create new event (placeholder)
      const newEvent = {
        _id: Date.now().toString(),
        ...req.body,
        registeredCount: 0
      };
      res.status(201).json({ message: "Event created successfully", event: newEvent });
      break;
    
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}