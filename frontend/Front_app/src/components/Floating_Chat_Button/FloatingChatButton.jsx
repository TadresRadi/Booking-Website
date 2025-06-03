import React, { useState } from "react";
import ChatRoomCard from "../../page/Chat_Room/ChatRoomCard.jsx";

const FloatingChatButton = () => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => setOpen((prev) => !prev);

  return (
    <>
      {/* أيقونة رسالة (Chat/Message) */}
      <div
        onClick={handleToggle}
        style={{
          position: "fixed",
          bottom: 30,
          right: 30,
          zIndex: 9999,
          background: "#5956e9",
          borderRadius: "50%",
          width: 56,
          height: 56,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 20px #0001",
          cursor: "pointer"
        }}
        title="Chat with admin"
      >
        {/* أيقونة رسالة (chat bubble) SVG */}
        <svg width={29} height={29} fill="#fff" viewBox="0 0 24 24">
          <path d="M20 2H4a2 2 0 0 0-2 2v20l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm0 14H6l-2 2V4h16z"/>
        </svg>
      </div>
      {/* كارد الشات */}
      {open && <ChatRoomCard onClose={handleToggle} />}
    </>
  );
};

export default FloatingChatButton;