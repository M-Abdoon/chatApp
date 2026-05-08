import express from "express";
import cors from "cors";

let messages = [
  { message: "Hi guys", sender: "Ahmed", timestamp: "45145" },
  { message: "how are you Ahmed", sender: "Mustafa", timestamp: "45146" },
  { message: "u see my message guys?", sender: "Fahed", timestamp: "45148" },
  { message: "I'm good, you?", sender: "Ahmed", timestamp: "45147" },
];

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/getMessages", (req, res) => {
  res.json(messages);
});

app.post("/sendMessage", (req, res) => {
  const { message, sender } = req.body;
  if (message && sender) {
    messages.push({ message, sender, timestamp: Date.now() });

    console.log("New message received:", { message, sender });
    res.status(200).json({ success: true });
  } else {
    res.status(400).json({ success: false, error: "Invalid message data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
