import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useChat } from "../../../context/ChatContext";

function ChatRoom() {
  const {
    chats, setChats,
    selectedChat, setSelectedChat,
    messages, setMessages
  } = useChat();

  const [search, setSearch] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const [managerId, setManagerId] = useState(null);
  const messagesEndRef = useRef(null);

  // جلب بيانات المانجر الحالي (من localStorage أو API حسب نظامك)
  useEffect(() => {
    try {
      const manager = JSON.parse(localStorage.getItem("user"));
      if (manager && manager.id) setManagerId(manager.id);
    } catch {
      setManagerId(null);
    }
  }, []);

  // جلب قائمة الشاتات (users) عند تحميل الصفحة
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const token = localStorage.getItem("access");
        const res = await axios.get("http://127.0.0.1:8000/api/admin/chat-list/", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setChats(res.data);
        // حدد أول شات تلقائيًا
        if (res.data.length > 0 && !selectedChat) {
          setSelectedChat(res.data[0]);
        }
      } catch {
        setChats([]);
      }
    };
    fetchChats();
  }, []);

  // جلب الرسائل عند تغيير الشات المحدد
  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedChat) return;
      try {
        const token = localStorage.getItem("access");
        const res = await axios.get(
          `http://127.0.0.1:8000/api/admin/chat/messages/${selectedChat.id}/`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        setMessages(res.data);
      } catch {
        setMessages([]);
      }
    };
    fetchMessages();
    // polling كل 5 ثواني
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, [selectedChat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // إرسال رسالة
  const handleSend = async () => {
    if (!messageInput.trim() || !selectedChat) return;
    try {
      const token = localStorage.getItem("access");
      await axios.post(
        "http://127.0.0.1:8000/api/chat/send/",
        {
          receiver: selectedChat.id,
          message: messageInput,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessageInput("");
      // جلب الرسائل بعد الإرسال
      const res = await axios.get(
        `http://127.0.0.1:8000/api/admin/chat/messages/${selectedChat.id}/`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setMessages(res.data);
    } catch {}
  };

  // بحث في قائمة الشاتات
const filteredChats = (chats ?? []).filter(
  (c) => c.name && c.name.toLowerCase().includes(search.toLowerCase())
);

  // جلب صورة البروفايل
  const getUserAvatar = (user) =>
  user.profile_image
    ? user.profile_image
    : "https://ui-avatars.com/api/?background=5956e9&color=fff&name=" +
      encodeURIComponent(user.name || "User");
      console.log("chats", chats);

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
            {filteredChats.length === 0 && (
              <div style={{ color: "#aaa", textAlign: "center", marginTop: 40 }}>
                No chats found
              </div>
            )}
            {filteredChats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
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
                    src={getUserAvatar(chat)}
                    alt={chat.name}
                    style={{
                      width: 44,
                      height: 44,
                      objectFit: "cover",
                      borderRadius: "50%",
                      border: "2px solid #eee",
                    }}
                  />
                  {/* يمكنك إضافة حالة الأونلاين لو النظام يدعمها */}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>
                    {chat.name}
                  </div>
                  <div style={{ fontSize: 13, color: "#737373" }}>
                    {chat.title || ""}
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
            {selectedChat ? (
              <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
                <img
                  src={getUserAvatar(selectedChat)}
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
                    {selectedChat.title || ""}
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ color: "#aaa" }}>No chat selected</div>
            )}
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
            {selectedChat && messages.length === 0 && (
              <div style={{ color: "#aaa", textAlign: "center", marginTop: 40 }}>
                No messages yet with this user.
              </div>
            )}
            {selectedChat &&
              messages.map((msg) => {
                const isMe = msg.sender && msg.sender.id === managerId;
                return (
                  <div
                    key={msg.id}
                    style={{
                      alignSelf: isMe ? "flex-end" : "flex-start",
                      maxWidth: "60%",
                    }}
                  >
                    {msg.message && (
                      <div
                        style={{
                          background: isMe ? "#5956e9" : "#f4f6fa",
                          color: isMe ? "#fff" : "#222",
                          borderRadius: 12,
                          padding: "10px 20px",
                          fontWeight: 500,
                          fontSize: 15,
                          marginBottom: 4,
                          wordBreak: "break-word",
                          textAlign: "left",
                        }}
                      >
                        {msg.message}
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
                    <div style={{ color: "#888", fontSize: 12, textAlign: isMe ? "right" : "left" }}>
                      {msg.created_at
                        ? new Date(msg.created_at).toLocaleString()
                        : ""}
                    </div>
                  </div>
                );
              })}
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
              disabled={!selectedChat}
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
              disabled={!selectedChat || !messageInput.trim()}
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