// API route for all events
export default function handler(req, res) {
  const { method } = req;

  // Add CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${method} Not Allowed`);
  }

  // Sample events data - same as in category route but all events
  const allEvents = [
    {
      _id: "1",
      title: "AWS Workshop: EC2 Fundamentals",
      description:
        "Learn the basics of EC2 instances and how to deploy applications",
      date: "2024-03-15",
      time: "10:00 AM",
      location: "Computer Lab 1",
      category: "workshop",
      organizer: "AWS Cloud Club PICT",
      image: "/calendar-cloud.png",
    },
    {
      _id: "2",
      title: "Cloud Security Best Practices",
      description: "Understand security principles in cloud computing",
      date: "2024-03-20",
      time: "2:00 PM",
      location: "Auditorium",
      category: "seminar",
      organizer: "Security Team",
      image: "/calendar.png",
    },
    {
      _id: "3",
      title: "Networking Session with Industry Experts",
      description: "Connect with industry professionals and alumni",
      date: "2024-03-25",
      time: "6:00 PM",
      location: "Main Hall",
      category: "networking",
      organizer: "AWS Cloud Club PICT",
      image: "/calendar-cloud.png",
    },
    {
      _id: "4",
      title: "DevOps Bootcamp: CI/CD Pipeline",
      description: "Hands-on workshop on building CI/CD pipelines with AWS",
      date: "2024-03-30",
      time: "9:00 AM",
      location: "Computer Lab 2",
      category: "workshop",
      organizer: "DevOps Team",
      image: "/calendar.png",
    },
    {
      _id: "5",
      title: "Serverless Architecture Talk",
      description: "Deep dive into AWS Lambda and serverless technologies",
      date: "2024-04-05",
      time: "3:00 PM",
      location: "Conference Room",
      category: "seminar",
      organizer: "AWS Cloud Club PICT",
      image: "/calendar-cloud.png",
    },
    {
      _id: "6",
      title: "Career Guidance Session",
      description: "Get career advice from AWS certified professionals",
      date: "2024-04-10",
      time: "4:00 PM",
      location: "Auditorium",
      category: "networking",
      organizer: "Career Team",
      image: "/calendar.png",
    },
  ];

  res.status(200).json(allEvents);
}
