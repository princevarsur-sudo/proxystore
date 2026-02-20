import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Inbox() {
  const [conversations, setConversations] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    const { data } = await supabase.auth.getUser();

    if (!data.user) {
      navigate("/auth");
      return;
    }

    setUser(data.user);
    fetchConversations(data.user.id);
  }

  async function fetchConversations(userId: string) {
    const { data, error } = await supabase
      .from("conversations")
      .select("*")
      .or(`buyer_id.eq.${userId},seller_id.eq.${userId}`)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setConversations(data);
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f1e6] p-8">
      <h1 className="text-3xl font-bold text-green-700 mb-6">
        Inbox
      </h1>

      {conversations.length === 0 ? (
        <p>No conversations yet.</p>
      ) : (
        <div className="space-y-4">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => navigate(`/chat/${conv.id}`)}
              className="bg-white shadow rounded p-4 cursor-pointer hover:bg-green-50"
            >
              <p className="font-semibold">
                Conversation ID: {conv.id.slice(0, 8)}...
              </p>
              <p className="text-sm text-gray-500">
                Listing ID: {conv.listing_id}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
