import "dotenv/config";
import express from "express";
import cors from "cors";
import { sendMsgToOpenAI } from "./openai.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;
    const reply = await sendMsgToOpenAI(message);
    res.json({ reply });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(4000, () => {
  console.log("Backend running on http://localhost:4000");
});
