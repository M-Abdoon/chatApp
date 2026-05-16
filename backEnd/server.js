import express from "express";
import cors from "cors";

let messages = [
  {
    message: "Hi! welcome to the app, you can send messages now.",
    sender: "Mohammed Abdoon",
    timestamp: "45145",
  },
];

const app = express();
const PORT = 3000;

app.use(
  cors({
    origin: "https://m-abdoon-chatapp.hosting.codeyourfuture.io/",
  }),
);
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
