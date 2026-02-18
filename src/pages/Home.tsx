import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const colleges = [
    {
      name: "NFSU Gandhinagar",
      image: "https://picsum.photos/600/400?random=1",
    },
    {
      name: "Adani University",
      image: "https://picsum.photos/600/400?random=2",
    },
    {
      name: "Nirma University",
      image: "https://picsum.photos/600/400?random=3",
    },
  ];

  return (
    <div
      className="min-h-screen px-10 py-16"
      style={{
        backgroundColor: "#f6f1e6",
        backgroundImage:
          "repeating-linear-gradient(to bottom, transparent, transparent 28px, #d8d2c4 29px)",
      }}
    >
      {/* ================= HERO ================= */}
      <div className="text-center mb-20">
        <h1 className="text-5xl font-bold text-green-700 mb-4">
          ProxyStore
        </h1>

        <p className="text-xl text-teal-600 mb-3">
          Campus Infrastructure Platform
        </p>

        <p className="text-2xl text-orange-500 italic mb-6">
          "Attendance aapki, deals humari"
        </p>

        <p className="max-w-xl mx-auto text-gray-700 mb-8">
          Buy, sell, and discover student deals safely across campuses.
        </p>

        <button
          onClick={() => navigate("/marketplace")}
          className="bg-green-600 text-white px-8 py-3 rounded-full shadow hover:bg-green-700"
        >
          Explore Marketplace
        </button>
      </div>

      {/* ================= COLLEGES ================= */}
      <h2 className="text-3xl font-semibold text-green-700 mb-8">
        Featured Colleges
      </h2>

      <div className="grid md:grid-cols-3 gap-6 mb-20">
        {colleges.map((college, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer overflow-hidden"
            onClick={() =>
              navigate(
                `/marketplace?college=${encodeURIComponent(
                  college.name
                )}`
              )
            }
          >
            <img
              src={college.image}
              className="h-40 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="font-bold">{college.name}</h3>
              <p className="text-sm text-gray-500">
                View live student listings
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ================= BULK ORDERS ================= */}
      <h2 className="text-3xl font-semibold text-green-700 mb-6">
        Bulk Orders & Group Buys
      </h2>

      <div className="grid md:grid-cols-3 gap-6 mb-20">
        {[
          "Hostel Water Cans",
          "Lab Coats Group Buy",
          "Printed Event T-Shirts",
        ].map((item, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-bold">{item}</h3>
            <p className="text-sm text-gray-500 mt-2">
              Join students to unlock discounts.
            </p>
            <button className="mt-4 bg-orange-400 text-white px-4 py-2 rounded">
              Join Bulk Order
            </button>
          </div>
        ))}
      </div>

      {/* ================= FLAT FOR RENT ================= */}
      <h2 className="text-3xl font-semibold text-green-700 mb-6">
        Flats & Rooms Near Campus
      </h2>

      <div className="grid md:grid-cols-3 gap-6 mb-20">
        {[
          {
            title: "2BHK near Nirma University",
            price: "₹8000/month",
          },
          {
            title: "1RK near NFSU",
            price: "₹5500/month",
          },
          {
            title: "PG near Adani University",
            price: "₹6000/month",
          },
        ].map((flat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-bold">{flat.title}</h3>
            <p className="text-green-700 font-semibold">
              {flat.price}
            </p>
            <button className="mt-4 bg-teal-600 text-white px-4 py-2 rounded">
              Contact Owner
            </button>
          </div>
        ))}
      </div>

      {/* ================= RETAIL STORES ================= */}
      <h2 className="text-3xl font-semibold text-green-700 mb-6">
        Retail Stores Near Campus
      </h2>

      <div className="grid md:grid-cols-3 gap-6 mb-20">
        {[
          "Campus Stationery",
          "TechWorld Electronics",
          "Print Hub",
        ].map((store, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-bold">{store}</h3>
            <p className="text-sm text-gray-500 mt-2">
              Special student discounts available.
            </p>
            <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded">
              Visit Store
            </button>
          </div>
        ))}
      </div>

      {/* ================= EVENTS ================= */}
      <h2 className="text-3xl font-semibold text-green-700 mb-6">
        Campus Events & Concerts
      </h2>

      <div className="grid md:grid-cols-3 gap-6 mb-20">
        {[
          "Live DJ Night - Nirma",
          "Tech Fest - Adani University",
          "Sports Tournament - NFSU",
        ].map((event, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-bold">{event}</h3>
            <p className="text-sm text-gray-500 mt-2">
              Book tickets directly via ProxyStore.
            </p>
            <button className="mt-4 bg-orange-500 text-white px-4 py-2 rounded">
              Book Tickets
            </button>
          </div>
        ))}
      </div>

      {/* ================= AMBASSADOR ================= */}
      <div className="bg-white p-10 rounded-xl shadow text-center mb-20">
        <h2 className="text-3xl font-semibold text-green-700 mb-4">
          Become a Campus Ambassador
        </h2>
        <p className="text-gray-600 mb-6">
          Lead ProxyStore in your campus. Earn incentives,
          certificates and recognition.
        </p>
        <button className="bg-green-700 text-white px-8 py-3 rounded-full">
          Apply Now
        </button>
      </div>

      {/* ================= FOOTER ================= */}
      <footer className="text-center text-gray-600 text-sm border-t pt-6">
        <p className="font-semibold text-green-700">
          ProxyStore
        </p>
        <p>Built by students, for students</p>
      </footer>
    </div>
  );
}
