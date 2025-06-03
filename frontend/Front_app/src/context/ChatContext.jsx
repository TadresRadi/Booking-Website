import React, { createContext, useContext, useState } from "react";

const ChatContext = createContext();

export function useChat() {
  return useContext(ChatContext);
}

export function ChatProvider({ children }) {
  const [chats, setChats] = useState([]); // مهم!
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);

  return (
    <ChatContext.Provider
      value={{
        chats,
        setChats,
        selectedChat,
        setSelectedChat,
        messages,
        setMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}