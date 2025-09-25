// API route for team members
export default function handler(req, res) {
  // Add CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  const { method } = req;

  // Sample team members data
  const sampleMembers = [
    {
      _id: "1",
      name: "John Doe",
      role: "President",
      department: "core",
      email: "john@awscloudclubpict.com",
      bio: "Passionate about cloud computing and AWS technologies",
      image: "/avatar.jpeg",
      linkedIn: "https://linkedin.com/in/johndoe",
      github: "https://github.com/johndoe",
    },
    {
      _id: "2",
      name: "Jane Smith",
      role: "Vice President",
      department: "core",
      email: "jane@awscloudclubpict.com",
      bio: "Expert in cloud architecture and DevOps practices",
      image: "/avatar.jpeg",
      linkedIn: "https://linkedin.com/in/janesmith",
      github: "https://github.com/janesmith",
    },
    {
      _id: "3",
      name: "Mike Johnson",
      role: "Web Developer",
      department: "web-dev",
      email: "mike@awscloudclubpict.com",
      bio: "Full-stack developer specializing in React and Node.js",
      image: "/avatar.jpeg",
      linkedIn: "https://linkedin.com/in/mikejohnson",
      github: "https://github.com/mikejohnson",
    },
    {
      _id: "4",
      name: "Sarah Wilson",
      role: "UI/UX Designer",
      department: "design",
      email: "sarah@awscloudclubpict.com",
      bio: "Creative designer with a passion for user experience",
      image: "/avatar.jpeg",
      linkedIn: "https://linkedin.com/in/sarahwilson",
    },
    {
      _id: "5",
      name: "Alex Brown",
      role: "Event Coordinator",
      department: "event-management",
      email: "alex@awscloudclubpict.com",
      bio: "Experienced in organizing technical events and workshops",
      image: "/avatar.jpeg",
      linkedIn: "https://linkedin.com/in/alexbrown",
    },
  ];

  switch (method) {
    case "GET":
      // Return all team members
      res.status(200).json(sampleMembers);
      break;

    case "POST":
      // Add new team member (placeholder)
      const newMember = {
        _id: Date.now().toString(),
        ...req.body,
        image: req.body.image || "/default-avatar.jpg",
      };
      res
        .status(201)
        .json({ message: "Member added successfully", member: newMember });
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
