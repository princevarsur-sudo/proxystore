import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

type Props = {
  listing: any;
  user: any;
};

export default function ListingCard({ listing, user }: Props) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirmDelete = confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    await supabase.from("listings").delete().eq("id", listing.id);
    window.location.reload();
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-4 border border-orange-200">
      <img
        src={listing.image_url}
        alt={listing.title}
        className="w-full h-48 object-cover rounded-lg mb-3"
      />

      <h3 className="text-lg font-bold text-green-700">
        {listing.title}
      </h3>

      <p className="text-orange-600 font-semibold text-xl">
        ₹{listing.price}
      </p>

      <p className="text-sm text-gray-500">
        {listing.college}
      </p>

      <div className="flex gap-2 mt-4 flex-wrap">

        {/* View Details */}
        <Link
          to={`/listing/${listing.id}`}
          className="bg-green-600 text-white px-3 py-1 rounded-lg"
        >
          View
        </Link>

        {/* Chat */}
        {user && user.id !== listing.seller_id && (
          <button
            onClick={() => navigate(`/chat/${listing.id}`)}
            className="bg-orange-500 text-white px-3 py-1 rounded-lg"
          >
            Chat
          </button>
        )}

        {/* Delete (Only owner) */}
        {user && user.id === listing.seller_id && (
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-3 py-1 rounded-lg"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
