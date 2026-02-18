import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabase";

export default function ListingDetails() {
  const { id } = useParams();
  const [listing, setListing] = useState<any>(null);

  useEffect(() => {
    fetchListing();
  }, []);

  async function fetchListing() {
    const { data } = await supabase
      .from("listings")
      .select("*")
      .eq("id", id)
      .single();

    if (data) setListing(data);
  }

  if (!listing) return <p className="p-8">Loading...</p>;

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <img
        src={listing.image_url}
        className="w-full h-80 object-cover rounded-xl"
      />

      <h2 className="text-3xl font-bold mt-6">{listing.title}</h2>
      <p className="text-green-600 text-xl font-semibold">
        ₹{listing.price}
      </p>

      <p className="mt-4">{listing.description}</p>
      <p className="mt-2 text-sm text-gray-500">
        📍 {listing.address}
      </p>

      <button className="mt-6 bg-teal-600 text-white px-6 py-2 rounded">
        Contact Seller: {listing.contact}
      </button>
    </div>
  );
}
