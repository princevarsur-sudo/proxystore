import { Link } from "react-router-dom";

type Props = {
  listing: any;
};

export default function ListingCard({ listing }: Props) {
  return (
    <div className="bg-white rounded shadow overflow-hidden">
      {listing.image_url && (
        <img
          src={listing.image_url}
          alt={listing.title}
          className="h-48 w-full object-cover"
        />
      )}

      <div className="p-4">
        <h3 className="text-lg font-semibold">{listing.title}</h3>
        <p className="text-green-700 font-bold">₹{listing.price}</p>
        <p className="text-sm text-gray-600">{listing.college}</p>

        <Link
          to={`/listing/${listing.id}`}
          className="mt-3 inline-block bg-green-600 text-white px-4 py-2 rounded"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
