import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

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

    setListing(data);
  }

  if (!listing) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8">
      <div className="bg-white rounded-xl shadow-md p-6 max-w-2xl mx-auto">
        {listing.image_url && (
          <img
            src={listing.image_url}
            alt={listing.title}
            className="w-full h-72 object-cover rounded-md"
          />
        )}

        <h1 className="text-2xl font-bold text-green-700 mt-4">
          {listing.title}
        </h1>

        <p className="text-gray-600 mt-2">
          {listing.description}
        </p>

        <p className="text-green-700 font-semibold mt-3 text-xl">
          ₹{listing.price}
        </p>

        <p className="text-sm text-gray-500 mt-2">
          {listing.college}
        </p>

        <p className="text-sm text-gray-500">
          {listing.address}
        </p>

        <button className="mt-4 bg-teal-600 text-white px-6 py-2 rounded-md">
          Contact Seller
        </button>
      </div>
    </div>
  );
}
