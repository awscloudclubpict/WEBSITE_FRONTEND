// API route for team members by department
export default function handler(req, res) {
  const { method, query } = req;
  const { department } = query;

  if (method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${method} Not Allowed`);
  }

  // Sample team members data
  const allMembers = [
    {
      _id: "1",
      name: "John Doe",
      role: "President",
      department: "core",
      email: "john@awscloudclubpict.com",
      bio: "Passionate about cloud computing and AWS technologies",
      image: "/avatar.jpeg",
      linkedIn: "https://linkedin.com/in/johndoe",
      github: "https://github.com/johndoe"
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
      github: "https://github.com/janesmith"
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
      github: "https://github.com/mikejohnson"
    },
    {
      _id: "4",
      name: "Sarah Wilson",
      role: "UI/UX Designer", 
      department: "design",
      email: "sarah@awscloudclubpict.com",
      bio: "Creative designer with a passion for user experience",
      image: "/avatar.jpeg",
      linkedIn: "https://linkedin.com/in/sarahwilson"
    },
    {
      _id: "5",
      name: "Alex Brown",
      role: "Event Coordinator",
      department: "event-management", 
      email: "alex@awscloudclubpict.com",
      bio: "Experienced in organizing technical events and workshops",
      image: "/avatar.jpeg",
      linkedIn: "https://linkedin.com/in/alexbrown"
    },
    {
      _id: "6",
      name: "Emma Davis",
      role: "Frontend Developer",
      department: "web-dev",
      email: "emma@awscloudclubpict.com",
      bio: "React specialist with expertise in modern frontend frameworks",
      image: "/avatar.jpeg",
      linkedIn: "https://linkedin.com/in/emmadavis",
      github: "https://github.com/emmadavis"
    },
    {
      _id: "7",
      name: "Tom Wilson",
      role: "Technical Writer",
      department: "tech-blog",
      email: "tom@awscloudclubpict.com",
      bio: "Creates engaging technical content and tutorials",
      image: "/avatar.jpeg",
      linkedIn: "https://linkedin.com/in/tomwilson"
    },
    {
      _id: "8",
      name: "Lisa Anderson",
      role: "Social Media Manager",
      department: "social-media",
      email: "lisa@awscloudclubpict.com", 
      bio: "Manages online presence and community engagement",
      image: "/avatar.jpeg",
      linkedIn: "https://linkedin.com/in/lisaanderson"
    },
    {
      _id: "9",
      name: "David Lee",
      role: "Documentation Lead",
      department: "documentation",
      email: "david@awscloudclubpict.com",
      bio: "Ensures comprehensive and clear project documentation",
      image: "/avatar.jpeg",
      linkedIn: "https://linkedin.com/in/davidlee",
      github: "https://github.com/davidlee"
    },
    {
      _id: "10",
      name: "Rachel Green",
      role: "Tech Team Lead",
      department: "tech-team",
      email: "rachel@awscloudclubpict.com",
      bio: "Leads technical initiatives and cloud infrastructure projects",
      image: "/avatar.jpeg",
      linkedIn: "https://linkedin.com/in/rachelgreen",
      github: "https://github.com/rachelgreen"
    }
  ];

  // Filter members by department
  const filteredMembers = allMembers.filter(member => 
    member.department === department
  );

  res.status(200).json(filteredMembers);
}