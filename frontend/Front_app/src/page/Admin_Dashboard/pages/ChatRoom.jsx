import React, { useState, useRef, useEffect } from "react";

const dummyChats = [
  {
    id: 1,
    name: "Kaiya George",
    avatar: "https://randomuser.me/api/portraits/women/11.jpg",
    title: "Project Manager",
    lastMsg: "15 mins",
    online: true,
  },
  {
    id: 2,
    name: "Lindsey Curtis",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    title: "Designer",
    lastMsg: "30 mins",
    online: true,
  },
  {
    id: 3,
    name: "Zain Geidt",
    avatar: "https://randomuser.me/api/portraits/men/25.jpg",
    title: "Content Writer",
    lastMsg: "45 mins",
    online: true,
  },
  {
    id: 4,
    name: "Carla George",
    avatar: "https://randomuser.me/api/portraits/women/90.jpg",
    title: "Front-end Developer",
    lastMsg: "2 days",
    online: false,
  },
  {
    id: 5,
    name: "Abram Schleifer",
    avatar: "https://randomuser.me/api/portraits/men/14.jpg",
    title: "Digital Marketer",
    lastMsg: "1 hour",
    online: true,
  },
  {
    id: 6,
    name: "Lincoln Donin",
    avatar: "https://randomuser.me/api/portraits/men/36.jpg",
    title: "Project ManagerProduct Designer",
    lastMsg: "3 days",
    online: true,
  },
  {
    id: 7,
    name: "Erin Geidthem",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    title: "Copyrighter",
    lastMsg: "5 days",
    online: false,
  },
  {
    id: 8,
    name: "Alena Baptista",
    avatar: "https://randomuser.me/api/portraits/women/77.jpg",
    title: "SEO Expert",
    lastMsg: "2 hours",
    online: false,
  },
];

// Sample messages for one user
const dummyMessages = [
  {
    id: 1,
    sender: "other",
    text: "I want to make an appointment tomorrow from 2:00 to 5:00pm?",
    time: "2 hours ago",
  },
  {
    id: 2,
    sender: "me",
    text: "If don't like something, I'll stay away from it.",
    time: "2 hours ago",
  },
  {
    id: 3,
    sender: "other",
    text: "I want more detailed information.",
    time: "2 hours ago",
  },
  {
    id: 4,
    sender: "me",
    text: "If don't like something, I'll stay away from it.",
    time: "2 hours ago",
  },
  {
    id: 5,
    sender: "me",
    text: "They got there early, and got really good seats.",
    time: "2 hours ago",
  },
  {
    id: 6,
    sender: "me",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=cover&w=400&q=80",
    time: "2 hours ago",
  },
];

function ChatRoom() {
  const [search, setSearch] = useState("");
  const [selectedChat, setSelectedChat] = useState(dummyChats[1]); // default: Lindsey Curtis
  const [messages, setMessages] = useState(dummyMessages);
  const [messageInput, setMessageInput] = useState("");
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom on messages update
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, selectedChat]);

  // Send message handler
  const handleSend = () => {
    if (messageInput.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          sender: "me",
          text: messageInput,
          time: "Just now",
        },
      ]);
      setMessageInput("");
    }
  };

  // Filtered chats list by search
  const filteredChats = dummyChats.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  // On selecting a different chat
  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
    setMessages(dummyMessages); // For demo, always same messages
  };

  return (
    <div
      style={{
        background: "#f7f9fb",
        minHeight: "calc(100vh - 60px)",
        width: "100%",
        padding: "0",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          padding: "30px 40px 0 40px",
          fontWeight: 700,
          fontSize: 24,
          color: "#222",
        }}
      >
        Chat
      </div>
      <div
        style={{
          flex: 1,
          display: "flex",
          gap: 24,
          padding: "24px 40px 24px 40px",
        }}
      >
        {/* Chats Sidebar */}
        <div
          className="chat-sidebar"
          style={{
            background: "#fff",
            borderRadius: 16,
            boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
            minWidth: 310,
            maxWidth: 340,
            width: "100%",
            padding: 24,
            display: "flex",
            flexDirection: "column",
            height: "calc(80vh)",
            maxHeight: 650,
          }}
        >
          <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 18 }}>
            Chats
          </div>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              borderRadius: 10,
              border: "1px solid #eee",
              padding: "8px 14px",
              marginBottom: 18,
              background: "#f7f9fb",
              fontSize: 15,
            }}
          />
          <div
            style={{
              overflowY: "auto",
              flex: 1,
              minHeight: 0,
            }}
          >
            {filteredChats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => handleSelectChat(chat)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 13,
                  padding: "10px 6px",
                  borderRadius: 12,
                  cursor: "pointer",
                  marginBottom: 4,
                  background:
                    selectedChat && selectedChat.id === chat.id
                      ? "#f6f6ff"
                      : "transparent",
                  transition: "background 0.2s",
                }}
              >
                <div style={{ position: "relative" }}>
                  <img
                    src={chat.avatar}
                    alt={chat.name}
                    style={{
                      width: 44,
                      height: 44,
                      objectFit: "cover",
                      borderRadius: "50%",
                      border: "2px solid #eee",
                    }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      right: 2,
                      bottom: 2,
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: chat.online ? "#0fc47e" : "#f6b93b",
                      border: "2px solid #fff",
                    }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>
                    {chat.name}
                  </div>
                  <div style={{ fontSize: 13, color: "#737373" }}>
                    {chat.title}
                  </div>
                </div>
                <div style={{ fontSize: 13, color: "#aaa" }}>
                  {chat.lastMsg}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div
          className="chat-window"
          style={{
            flex: 1,
            minWidth: 0,
            background: "#fff",
            borderRadius: 16,
            boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
            display: "flex",
            flexDirection: "column",
            height: "calc(80vh)",
            maxHeight: 650,
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "16px 24px",
              borderBottom: "1px solid #ececec",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
              <img
                src={selectedChat.avatar}
                alt={selectedChat.name}
                style={{
                  width: 44,
                  height: 44,
                  objectFit: "cover",
                  borderRadius: "50%",
                  border: "2px solid #eee",
                }}
              />
              <div>
                <div style={{ fontWeight: 600, fontSize: 16 }}>
                  {selectedChat.name}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: "#737373",
                    fontWeight: 400,
                  }}
                >
                  {selectedChat.title}
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 16 }}>
              <button title="Call" style={{ background: "none", border: "none", fontSize: 20, color: "#5956e9" }}>
                <i className="bi bi-telephone"></i>
              </button>
              <button title="More" style={{ background: "none", border: "none", fontSize: 20, color: "#5956e9" }}>
                <i className="bi bi-three-dots"></i>
              </button>
            </div>
          </div>
          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "32px 24px 16px 24px",
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            {messages.map((msg) =>
              msg.sender === "me" ? (
                <div key={msg.id} style={{ alignSelf: "flex-end", maxWidth: "60%" }}>
                  {msg.text && (
                    <div
                      style={{
                        background: "#5956e9",
                        color: "#fff",
                        borderRadius: 12,
                        padding: "10px 20px",
                        fontWeight: 500,
                        fontSize: 15,
                        marginBottom: 4,
                        wordBreak: "break-word",
                        textAlign: "left",
                      }}
                    >
                      {msg.text}
                    </div>
                  )}
                  {msg.image && (
                    <img
                      src={msg.image}
                      alt=""
                      style={{
                        display: "block",
                        borderRadius: 12,
                        maxWidth: 220,
                        maxHeight: 130,
                        marginBottom: 4,
                      }}
                    />
                  )}
                  <div style={{ color: "#888", fontSize: 12, textAlign: "right" }}>{msg.time}</div>
                </div>
              ) : (
                <div key={msg.id} style={{ alignSelf: "flex-start", maxWidth: "60%" }}>
                  {msg.text && (
                    <div
                      style={{
                        background: "#f4f6fa",
                        color: "#222",
                        borderRadius: 12,
                        padding: "10px 20px",
                        fontWeight: 500,
                        fontSize: 15,
                        marginBottom: 4,
                        wordBreak: "break-word",
                        textAlign: "left",
                      }}
                    >
                      {msg.text}
                    </div>
                  )}
                  {msg.image && (
                    <img
                      src={msg.image}
                      alt=""
                      style={{
                        display: "block",
                        borderRadius: 12,
                        maxWidth: 220,
                        maxHeight: 130,
                        marginBottom: 4,
                      }}
                    />
                  )}
                  <div style={{ color: "#888", fontSize: 12 }}>{selectedChat.name}, {msg.time}</div>
                </div>
              )
            )}
            <div ref={messagesEndRef}></div>
          </div>
          {/* Message input */}
          <div
            style={{
              borderTop: "1px solid #ececec",
              padding: "12px 18px",
              display: "flex",
              alignItems: "center",
              gap: 16,
              background: "#fff",
            }}
          >
            <button style={{ background: "none", border: "none", fontSize: 20, color: "#5956e9" }}>
              <i className="bi bi-paperclip"></i>
            </button>
            <input
              type="text"
              placeholder="Type a message"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend();
              }}
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                fontSize: 16,
                background: "#f7f9fb",
                padding: "12px 16px",
                borderRadius: 8,
              }}
            />
            <button
              onClick={handleSend}
              style={{
                background: "#5956e9",
                border: "none",
                color: "#fff",
                fontSize: 22,
                padding: "8px 16px",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              title="Send"
            >
              <i className="bi bi-send"></i>
            </button>
            <button style={{ background: "none", border: "none", fontSize: 20, color: "#5956e9" }}>
              <i className="bi bi-mic"></i>
            </button>
          </div>
        </div>
      </div>
      {/* Responsive styles */}
      <style>
        {`
        @media (max-width: 900px) {
          .chat-sidebar {
            min-width: 90px !important;
            max-width: 120px !important;
            padding: 12px !important;
          }
          .chat-window {
            padding: 0 !important;
            min-width: 0;
          }
        }
        @media (max-width: 700px) {
          .chat-sidebar {
            display: none !important;
          }
          .chat-window {
            width: 100% !important;
            min-width: 0;
            max-width: none;
          }
        }
        `}
      </style>
    </div>
  );
}

export default ChatRoom;