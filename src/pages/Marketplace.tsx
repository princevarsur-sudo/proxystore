import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  college: string;
  address: string;
  image_url: string;
}

export default function Marketplace() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [contact, setContact] = useState("");
  const [college, setCollege] = useState("");
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    fetchListings();
  }, []);

  async function fetchListings() {
    const { data, error } = await supabase
      .from("listings")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setListings(data);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!image) {
      alert("Please upload image");
      return;
    }

    // Upload image to Supabase storage
    const fileName = `${Date.now()}-${image.name}`;

    const { error: uploadError } = await supabase.storage
      .from("listing-images")
      .upload(fileName, image);

    if (uploadError) {
      alert("Image upload failed");
      return;
    }

    const { data: publicUrlData } = supabase.storage
      .from("listing-images")
      .getPublicUrl(fileName);

    const imageUrl = publicUrlData.publicUrl;

    // Insert into database
    const { error } = await supabase.from("listings").insert([
      {
        title,
        description: `Contact: ${contact}`,
        price: Number(price),
        category: "General",
        image_url: imageUrl,
        seller_id: null,
        college,
        address: "Student Listing",
        status: "available",
      },
    ]);

    if (error) {
      alert(error.message);
      return;
    }

    setTitle("");
    setPrice("");
    setContact("");
    setCollege("");
    setImage(null);

    fetchListings();
  }

  return (
    <div className="min-h-screen p-8 notebook-bg">
      <h1 className="text-3xl font-bold text-green-700 mb-6">
        Campus Marketplace
      </h1>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md mb-10"
      >
        <input
          type="text"
          placeholder="Product Name"
          className="w-full border p-2 mb-3 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Price"
          className="w-full border p-2 mb-3 rounded"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Your Contact Number"
          className="w-full border p-2 mb-3 rounded"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="College Name"
          className="w-full border p-2 mb-3 rounded"
          value={college}
          onChange={(e) => setCollege(e.target.value)}
          required
        />

        <input
          type="file"
          className="w-full border p-2 mb-4 rounded"
          onChange={(e) =>
            setImage(e.target.files ? e.target.files[0] : null)
          }
          required
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          Post Listing
        </button>
      </form>

      {/* LISTINGS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {listings.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            <img
              src={item.image_url}
              alt={item.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="text-green-700 font-bold">₹{item.price}</p>
              <p className="text-sm text-gray-600">{item.college}</p>
              <p className="text-sm text-gray-500">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
