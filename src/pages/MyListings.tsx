import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

const MyListings = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState<any[]>([]);

  useEffect(() => {
    fetchMyListings();
  }, []);

  const fetchMyListings = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data } = await supabase
      .from("listings")
      .select(`
        *,
        listing_images (
          image_url
        )
      `)
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    setListings(data || []);
  };

  const deleteListing = async (id: string) => {
    await supabase.from("listings").delete().eq("id", id);
    fetchMyListings();
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>My Listings</h2>

      {listings.length === 0 && <p>No listings yet.</p>}

      {listings.map((item) => (
        <div
          key={item.id}
          style={{
            border: "1px solid #ddd",
            padding: 15,
            marginBottom: 20,
            borderRadius: 10,
            display: "flex",
            gap: 15,
            alignItems: "center",
          }}
        >
          {item.listing_images?.length > 0 && (
            <img
              src={item.listing_images[0].image_url}
              style={{
                width: 120,
                height: 120,
                objectFit: "cover",
                borderRadius: 8,
              }}
            />
          )}

          <div style={{ flex: 1 }}>
            <h3>{item.title}</h3>
            <p>₹ {item.price}</p>

            <button onClick={() => navigate(`/listing/${item.id}`)}>
              View
            </button>

            <button
              style={{ marginLeft: 10, color: "red" }}
              onClick={() => deleteListing(item.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyListings;