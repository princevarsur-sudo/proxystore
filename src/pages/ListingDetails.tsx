import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabase";

const ListingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [listing, setListing] = useState<any>(null);
  const [images, setImages] = useState<any[]>([]);

  useEffect(() => {
    fetchListing();
  }, []);

  const fetchListing = async () => {
    const { data } = await supabase
      .from("listings")
      .select("*")
      .eq("id", id)
      .single();

    if (!data) return;

    setListing(data);

    const { data: imgs } = await supabase
      .from("listing_images")
      .select("*")
      .eq("listing_id", data.id);

    setImages(imgs || []);
  };

  const handleStartChat = async () => {
    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;

    if (!user) {
      navigate("/login");
      return;
    }

    if (!listing) return;

    if (listing.user_id === user.id) {
      alert("You cannot chat with your own listing.");
      return;
    }

    // 🔎 Check if conversation already exists
    const { data: existing } = await supabase
      .from("conversations")
      .select("*")
      .eq("listing_id", listing.id)
      .eq("buyer_id", user.id)
      .eq("seller_id", listing.user_id)
      .maybeSingle();

    if (existing) {
      navigate(`/chat/${existing.id}`);
      return;
    }

    // ➕ Create new conversation
    const { data: newConv, error } = await supabase
      .from("conversations")
      .insert([
        {
          listing_id: listing.id,
          buyer_id: user.id,
          seller_id: listing.user_id,
        },
      ])
      .select()
      .single();

    if (error) {
      alert("Error creating conversation");
      return;
    }

    navigate(`/chat/${newConv.id}`);
  };

  if (!listing) return <p>Loading...</p>;

  return (
    <div style={{ padding: 30 }}>
      <h2>{listing.title}</h2>
      <p>₹ {listing.price}</p>
      <p>{listing.description}</p>

      <div style={{ display: "flex", gap: 10 }}>
        {images.map((img) => (
          <img
            key={img.id}
            src={img.image_url}
            width={150}
            style={{ borderRadius: 8 }}
          />
        ))}
      </div>

      <button
        onClick={handleStartChat}
        style={{
          marginTop: 20,
          padding: "10px 20px",
          backgroundColor: "#2e7d32",
          color: "white",
          border: "none",
          borderRadius: 6,
          cursor: "pointer",
        }}
      >
        Chat with Seller
      </button>
    </div>
  );
};

export default ListingDetails;