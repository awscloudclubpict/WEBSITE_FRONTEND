// API route for individual team member operations
export default function handler(req, res) {
  const { method, query } = req;
  const { id } = query;

  // Sample member data (in a real app, this would come from a database)
  const sampleMember = {
    _id: id,
    name: "Sample Member",
    role: "Developer",
    department: "web-dev",
    email: "sample@awscloudclubpict.com",
    bio: "A dedicated team member",
    image: "/default-avatar.jpg",
    linkedIn: "https://linkedin.com/in/sample",
    github: "https://github.com/sample"
  };

  switch (method) {
    case 'GET':
      // Get individual member
      res.status(200).json(sampleMember);
      break;
    
    case 'PUT':
      // Update member
      const updatedMember = {
        ...sampleMember,
        ...req.body,
        _id: id
      };
      res.status(200).json({ 
        message: "Member updated successfully", 
        member: updatedMember 
      });
      break;
    
    case 'DELETE':
      // Delete member
      res.status(200).json({ 
        message: "Member deleted successfully", 
        deletedId: id 
      });
      break;
    
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}