// API route for blogs
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

  // Sample blog data
  const sampleBlogs = [
    {
      _id: "1",
      title: "Getting Started with AWS Cloud",
      content: "Learn the basics of AWS cloud computing...",
      tags: ["AWS", "Cloud", "Beginner"],
      author: "AWS Cloud Club",
      date: "2024-01-15",
      category: "tutorial",
    },
    {
      _id: "2",
      title: "Advanced Lambda Functions",
      content: "Deep dive into AWS Lambda serverless computing...",
      tags: ["AWS", "Lambda", "Serverless"],
      author: "Tech Team",
      date: "2024-01-20",
      category: "advanced",
    },
  ];

  switch (method) {
    case "GET":
      // Return all blogs or filter by tag if provided
      res.status(200).json(sampleBlogs);
      break;

    case "POST":
      // Create new blog (placeholder)
      const newBlog = {
        _id: Date.now().toString(),
        ...req.body,
        date: new Date().toISOString().split("T")[0],
      };
      res
        .status(201)
        .json({ message: "Blog created successfully", blog: newBlog });
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
