import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

const Marketplace = () => {
  const navigate = useNavigate();

  const [college, setCollege] = useState("NFSU");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [images, setImages] = useState<FileList | null>(null);
  const [listings, setListings] = useState<any[]>([]);

  useEffect(() => {
    fetchListings();
  }, [college]);

  const fetchListings = async () => {
    const { data } = await supabase
      .from("listings")
      .select(`
        *,
        listing_images (
          image_url
        )
      `)
      .eq("college", college)
      .order("created_at", { ascending: false });

    setListings(data || []);
  };

  const handlePost = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Login first");
      return;
    }

    const { data: listing } = await supabase
      .from("listings")
      .insert({
        user_id: user.id,
        title,
        price,
        description,
        college,
        address,
        contact,
      })
      .select()
      .single();

    if (images && listing) {
      for (let i = 0; i < images.length; i++) {
        const file = images[i];
        const filePath = `${listing.id}/${file.name}`;

        await supabase.storage
          .from("listing-images")
          .upload(filePath, file);

        const { data } = supabase.storage
          .from("listing-images")
          .getPublicUrl(filePath);

        await supabase.from("listing_images").insert({
          listing_id: listing.id,
          image_url: data.publicUrl,
        });
      }
    }

    fetchListings();
  };

  return (
    <div style={{ padding: 40 }}>
      <h1 style={{ color: "#2f855a" }}>🌿 ProxyStore Marketplace</h1>

      <div className="card" style={{ marginBottom: 40 }}>
        <h2 style={{ color: "#dd6b20" }}>Post Your Product</h2>

        <select value={college} onChange={(e) => setCollege(e.target.value)}>
          <option>NFSU</option>
          <option>Nirma</option>
          <option>Adani</option>
        </select>

        <br /><br />
        <input placeholder="Product Name" onChange={(e) => setTitle(e.target.value)} />
        <br /><br />
        <input placeholder="Price" onChange={(e) => setPrice(e.target.value)} />
        <br /><br />
        <textarea placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
        <br /><br />
        <input placeholder="Address" onChange={(e) => setAddress(e.target.value)} />
        <br /><br />
        <input placeholder="Contact (Optional)" onChange={(e) => setContact(e.target.value)} />
        <br /><br />
        <input type="file" multiple onChange={(e) => setImages(e.target.files)} />
        <br /><br />

        <button
          style={{
            background: "#2f855a",
            color: "white",
            padding: "10px 20px",
            borderRadius: 10,
            border: "none",
          }}
          onClick={handlePost}
        >
          Post Now
        </button>
      </div>

      <h2 style={{ color: "#2f855a" }}>{college} Listings</h2>

      {listings.map((item) => (
        <div
          key={item.id}
          className="card"
          style={{
            display: "flex",
            gap: 20,
            marginBottom: 20,
            alignItems: "center",
          }}
        >
          {item.listing_images?.length > 0 && (
            <img
              src={item.listing_images[0].image_url}
              style={{
                width: 140,
                height: 140,
                objectFit: "cover",
                borderRadius: 12,
              }}
            />
          )}

          <div style={{ flex: 1 }}>
            <h3>{item.title}</h3>
            <p style={{ color: "#dd6b20", fontWeight: "bold" }}>
              ₹ {item.price}
            </p>

            <button
              style={{
                background: "#2f855a",
                color: "white",
                padding: "6px 14px",
                borderRadius: 8,
                border: "none",
              }}
              onClick={() => navigate(`/listing/${item.id}`)}
            >
              View
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Marketplace;