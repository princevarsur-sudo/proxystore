import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import { useEffect, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };

    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
    window.location.reload();
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "15px 30px",
        backgroundColor: "#2e7d32",
        color: "white",
      }}
    >
      <div>
        <Link to="/" style={{ color: "white", marginRight: 20 }}>
          ProxyStore
        </Link>

        {user && (
          <>
            <Link to="/marketplace" style={{ color: "white", marginRight: 20 }}>
              Marketplace
            </Link>

            <Link to="/inbox" style={{ color: "white", marginRight: 20 }}>
              Inbox
            </Link>

            <Link to="/mylistings" style={{ color: "white" }}>
              My Listings
            </Link>
          </>
        )}
      </div>

      <div>
        {user ? (
          <>
            <span style={{ marginRight: 15 }}>{user.email}</span>
            <button
              onClick={handleLogout}
              style={{
                backgroundColor: "#ff6f00",
                border: "none",
                padding: "6px 14px",
                color: "white",
                borderRadius: 6,
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate("/login")}
            style={{
              backgroundColor: "#ff6f00",
              border: "none",
              padding: "6px 14px",
              color: "white",
              borderRadius: 6,
              cursor: "pointer",
            }}
          >
            Login / Sign Up
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;