// API route for creating events
export default function handler(req, res) {
  const { method } = req;

  if (method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${method} Not Allowed`);
  }

  try {
    // In a real app, you would save to a database
    const newEvent = {
      _id: Date.now().toString(),
      ...req.body,
      registeredCount: 0,
      createdAt: new Date().toISOString(),
    };

    res.status(201).json({
      message: "Event created successfully",
      event: newEvent,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating event",
      error: error.message,
    });
  }
}
