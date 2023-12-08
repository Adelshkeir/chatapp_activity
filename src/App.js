import React, { useState, useEffect } from "react";
import Chat from "./components/Chat/Chat.js";
import Input from "./components/Input/Input.js";
import io from "socket.io-client";

const socket = io("https://chat-backend-vtz5.onrender.com/"); 

function App() {
  const [username, setUsername] = useState("Current User");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("chat message", (msg) => {
      setMessages((prevMessages) => {
        console.log("Appending message:", msg);
        return [...prevMessages, msg];
      });
    });

    socket.on("hello", () => {
      console.log("Server says hello!");
    });

    return () => {
      socket.off("chat message");
      socket.off("hello");
    };
  }, []);

  useEffect(() => {
    // This effect will run whenever the messages state changes
    // You can add any additional logic here
    console.log("Messages updated:", messages);
  }, [messages]);

  const sendMessage = (msg) => {
    socket.emit("chat message", { text: msg, sender: username });
  };

  return (
    <div>
      <h1>Real-Time Chat</h1>
      <Chat messages={messages} username={username} />
      <Input sendMessage={sendMessage} />
    </div>
  );
}

export default App;
