import { useState } from "react";
import "./App.css";
import sendIcon from "./assets/send.svg";
import gptLogo from "./assets/chatgptLogo.svg";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  async function sendMessage() {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    const res = await fetch("http://localhost:4000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();

    const botMsg = { role: "assistant", text: data.reply };
    setMessages((prev) => [...prev, botMsg]);
  }

  return (
    <div className="chat-container">
      <header className="chat-header">
        <img src={gptLogo} alt="logo" />
        <h2>ChatGPT Clone</h2>
      </header>

      <div className="chat-body">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.role}`}>
            {msg.text}
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Send a message..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>
          <img src={sendIcon} alt="send" />
        </button>
      </div>
    </div>
  );
}

export default App;
