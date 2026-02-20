import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabase";

const Chat = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    loadUser();
    fetchMessages();
  }, []);

  const loadUser = async () => {
    const { data } = await supabase.auth.getUser();
    setUser(data.user);
  };

  const fetchMessages = async () => {
    const { data } = await supabase
      .from("messages")
      .select("*")
      .eq("conversation_id", id)
      .order("created_at", { ascending: true });

    setMessages(data || []);
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    await supabase.from("messages").insert([
      {
        conversation_id: id,
        sender_id: user.id,
        content: newMessage,
      },
    ]);

    setNewMessage("");
    fetchMessages();
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>Chat</h2>

      <div style={{ marginBottom: 20 }}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              textAlign: msg.sender_id === user?.id ? "right" : "left",
              marginBottom: 10,
            }}
          >
            <span
              style={{
                display: "inline-block",
                padding: "8px 12px",
                borderRadius: 12,
                backgroundColor:
                  msg.sender_id === user?.id
                    ? "#2e7d32"
                    : "#eee",
                color:
                  msg.sender_id === user?.id
                    ? "white"
                    : "black",
              }}
            >
              {msg.content}
            </span>
          </div>
        ))}
      </div>

      <input
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type message..."
        style={{ width: "80%", padding: 10 }}
      />

      <button
        onClick={sendMessage}
        style={{
          padding: 10,
          marginLeft: 10,
          backgroundColor: "#ff6f00",
          color: "white",
          border: "none",
          borderRadius: 6,
        }}
      >
        Send
      </button>
    </div>
  );
};

export default Chat;