import React, { useState, useEffect } from "react";
import "../App.css";
import { Alert, Input, Button } from "antd";
import moment from "moment";
import socket from "../utils/socket";


const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [userName, setUserName] = useState("");
  const [isUserNameSet, setIsUserNameSet] = useState(false);

  useEffect(() => {
    socket.on("previousMessages", (messages) => {
      setMessages(messages);
    });

    socket.on("receiveMessage", (messageData) => {
      setMessages((prevMessages) => [...prevMessages, messageData]);
    });

    return () => {
      socket.off("previousMessages");
      socket.off("receiveMessage");
    };
  }, []);

  const handleUserNameSet = () => {
    if (userName.trim()) {
      setIsUserNameSet(true);
    }
  };

  const handleMessageSend = () => {
    if (messageInput.trim() && userName.trim()) {
      const messageData = {
        sender: userName,
        message: messageInput,
        timestamp: new Date(),
      };

      socket.emit("sendMessage", messageData);
      setMessageInput("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleMessageSend();
    }
  };

  const groupMessagesByDate = (messages) => {
    return messages.reduce((grouped, message) => {
      const date = moment(message.timestamp).startOf("day").format("YYYY-MM-DD");
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(message);
      return grouped;
    }, {});
  };

  const getInitials = (name) => {
    const names = name.split(" ");
    return names
      .map((word) => word[0]?.toUpperCase())
      .slice(0, 2)
      .join("");
  };

  const groupedMessages = groupMessagesByDate(messages);

  return (
    <div className="chatbot" style={{ borderColor: "#000", borderRadius: "15px", fontFamily: "Arial, sans-serif", backgroundColor: "#fff" }}>
      <div className="chatbot-title" style={{ backgroundColor: "#000", color: "#fff" }}>
        <div className="chatbot-header-left">
          <span className="chat-icon" style={{ fontSize: "30px" }}>🤖</span>
          <div className="header-text">
            <span className="user-name">Group Chat Live</span>
          </div>
        </div>
      </div>

      {!isUserNameSet && (
        <Alert
          message="Please Enter a Username"
          description="You need to set a username to join the chat."
          type="warning"
          showIcon
          style={{ margin: "20px" }}
        />
      )}

      {!isUserNameSet && (
        <div className="username-input" style={{ margin: "20px" }}>
          <Input placeholder="Enter your username" value={userName} onChange={(e) => setUserName(e.target.value)} style={{ marginRight: "10px", marginBottom : "10px" }} />
          <Button type="primary" onClick={handleUserNameSet}>
            Set Username
          </Button>
        </div>
      )}

      {isUserNameSet && (
        <>
          <div className="chat-area">
            {Object.keys(groupedMessages).map((date, index) => (
              <div key={index}>
                <div style={{ textAlign: "center", margin: "0px 0", fontWeight: "bold", fontSize: "14px" }}>
                  {moment(date).calendar(null, {
                    sameDay: "[Today]",
                    lastDay: "[Yesterday]",
                    sameElse: "MMMM D, YYYY",
                  })}
                </div>

                {groupedMessages[date].map((msg, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "center", margin: "5px 0", marginTop : "10px" }}>
                    {msg.sender !== userName && (
                      <div
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "50%",
                          backgroundColor: "#007bff",
                          color: "#fff",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          marginRight: "8px",
                          fontSize: "16px",
                          
                        }}
                      >
                        {getInitials(msg.sender)}
                      </div>
                    )}

                    <div style={{ flex: 1, textAlign: msg.sender === userName ? "right" : "left", marginTop : "20px" }}>
                      <div
                        style={{
                          backgroundColor: msg.sender === userName ? "#007bff" : "#e1e1e1",
                          color: msg.sender === userName ? "#fff" : "#000",
                          display: "inline-table",
                          padding: "12px",
                            borderRadius: "12px",
                          borderTopLeftRadius: msg.sender === userName ? "12px" : "0px",
                          borderTopRightRadius : msg.sender === userName ? "0px" : "12px",
                          wordWrap: "break-word",
                          fontSize: "16px",
                          position: "relative",
                        }}
                      >
                        {msg.message}
                        <span
                          style={{
                            marginTop : "10px",
                            fontSize: "10px",
                            color: msg.sender === userName ? "#d1d1d1" : "#555",
                            position: "relative",
                            bottom: "-10px",
                            right: "0px",
                          }}
                        >
                          {moment(msg.timestamp).format("hh:mm A")}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="input-area" style={{ margin: "5px", display: "flex" }}>
            <Input
              className="chat-input"
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Type a message..."
              onKeyDown={handleKeyPress}
              style={{ marginRight: "10px", flex: 1 }}
            />
            <Button type="primary" className="send-button" onClick={handleMessageSend}>
              ➤
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatBot;
