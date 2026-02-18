import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      setShowAuth(false);
    }
  };

  const handleSignup = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Check your email to confirm signup.");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-green-700 font-bold text-xl">
        ProxyStore
      </Link>

      <div className="flex gap-4 items-center">
        <Link to="/">Home</Link>
        <Link to="/marketplace">Marketplace</Link>
        <Link to="/my-listings">My Listings</Link>

        {user ? (
          <>
            <span className="text-sm text-gray-600">
              {user.email}
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => setShowAuth(true)}
            className="bg-green-600 text-white px-4 py-1 rounded"
          >
            Login / Signup
          </button>
        )}
      </div>

      {showAuth && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-80">
            <h2 className="text-lg font-bold mb-4">Login / Sign Up</h2>

            <input
              type="email"
              placeholder="Email"
              className="border w-full p-2 mb-2"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="border w-full p-2 mb-4"
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="flex justify-between">
              <button
                onClick={handleLogin}
                className="bg-green-600 text-white px-4 py-1 rounded"
              >
                Login
              </button>

              <button
                onClick={handleSignup}
                className="bg-teal-600 text-white px-4 py-1 rounded"
              >
                Sign Up
              </button>
            </div>

            <button
              onClick={() => setShowAuth(false)}
              className="mt-4 text-sm text-gray-500"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
