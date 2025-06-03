import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useChat } from "../../context/ChatContext.jsx";

const ChatRoomCard = ({ onClose }) => {
  const { messages, setMessages, selectedChat, setSelectedChat } = useChat();
  const [text, setText] = useState("");
  const [admin, setAdmin] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [adminLoading, setAdminLoading] = useState(true);
  const [error, setError] = useState("");
  const messagesEndRef = useRef(null);

  // Get current user id from localStorage
  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user && user.id) setCurrentUserId(user.id);
    } catch {
      setCurrentUserId(null);
    }
  }, []);

  // Get admin info
  useEffect(() => {
    const fetchAdmin = async () => {
      setAdminLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("access");
        const res = await axios.get("http://127.0.0.1:8000/api/admin-user/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAdmin(res.data);
      } catch (err) {
        setAdmin(null);
        setError("تعذر جلب بيانات الأدمن. تأكد من اتصالك أو من صلاحياتك.");
      } finally {
        setAdminLoading(false);
      }
    };
    fetchAdmin();
  }, []);

  // Get messages
  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem("access");
      const res = await axios.get("http://127.0.0.1:8000/api/chat/messages/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(res.data);
    } catch (err) {
      setError("تعذر جلب الرسائل.");
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send message
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() || !admin?.id) return;
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("access");
      await axios.post(
        "http://127.0.0.1:8000/api/chat/send/",
        { receiver: admin.id, message: text },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setText("");
      await fetchMessages();
    } catch (err) {
      setError("تعذر إرسال الرسالة. حاول لاحقاً أو تأكد من اتصالك.");
      console.error("Send Error:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: 100,
        right: 30,
        width: 340,
        height: 440,
        background: "#fff",
        borderRadius: 16,
        boxShadow: "0 8px 32px #0002",
        zIndex: 10000,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "#5956e9",
          color: "#fff",
          padding: "14px 18px",
          fontWeight: 700,
          fontSize: 17,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {adminLoading ? "Loading..." : "Chat with Admin"}
        <span
          onClick={onClose}
          style={{ cursor: "pointer", fontSize: 20, marginLeft: 10 }}
        >
          ×
        </span>
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          padding: 14,
          overflowY: "auto",
          background: "#f7f7fa",
        }}
      >
        {error && (
          <div
            style={{
              color: "#f33",
              textAlign: "center",
              marginTop: 10,
              marginBottom: 10,
            }}
          >
            {error}
          </div>
        )}
        {adminLoading ? (
          <div style={{ color: "#888", textAlign: "center", marginTop: 50 }}>
            Loading messages...
          </div>
        ) : messages.length === 0 ? (
          <div style={{ color: "#888", textAlign: "center", marginTop: 50 }}>
            No messages yet. Say hi to Admin!
          </div>
        ) : (
          messages.map((msg, idx) => {
            const isMe =
              currentUserId && msg.sender && msg.sender.id === currentUserId;
            return (
              <div
                key={msg.id || idx}
                style={{
                  display: "flex",
                  flexDirection: isMe ? "row-reverse" : "row",
                  marginBottom: 10,
                }}
              >
                <div
                  style={{
                    background: isMe ? "#5956e9" : "#e9eafe",
                    color: isMe ? "#fff" : "#5956e9",
                    borderRadius: 14,
                    padding: "6px 16px",
                    maxWidth: "80%",
                    alignSelf: isMe ? "flex-end" : "flex-start",
                  }}
                >
                  {msg.message}
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>
      {/* Input */}
      <form
        onSubmit={sendMessage}
        style={{
          padding: 10,
          borderTop: "1px solid #eee",
          display: "flex",
          gap: 8,
        }}
      >
        <input
          className="form-control"
          type="text"
          placeholder={
            adminLoading ? "يتم تحميل الأدمن..." : "Type your message…"
          }
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ borderRadius: 8, fontSize: 15, flex: 1 }}
          disabled={loading}
        />
        <button
          className="btn btn-primary"
          type="submit"
          style={{
            borderRadius: 8,
            fontWeight: 600,
          }}
          disabled={!text.trim() || !admin?.id || loading || adminLoading}
        >
          {loading ? "..." : "Send"}
        </button>
      </form>
    </div>
  );
};

export default ChatRoomCard;
