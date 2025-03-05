import Contact from "../models/Contact.js";

const sendMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newMessage = new Contact({ name, email, message });
    await newMessage.save();

    res.status(201).json({ success: "Message sent successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ✅ Make sure this export is correct
export { sendMessage };
