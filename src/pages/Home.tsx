import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

import nfsuImg from "../assets/colleges/nfsu.jpg";
import nirmaImg from "../assets/colleges/nirma.jpg";
import adaniImg from "../assets/colleges/adani.jpg";

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
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

  const colleges = [
    { name: "NFSU", img: nfsuImg },
    { name: "Nirma", img: nirmaImg },
    { name: "Adani", img: adaniImg },
  ];

  return (
    <div style={{ textAlign: "center", padding: 60 }}>
      
      {/* Hero Section */}
      <h1 style={{ color: "#2f855a", fontSize: 48 }}>
        🌿 ProxyStore
      </h1>

      <p style={{ fontSize: 18, marginTop: 10 }}>
        Campus Marketplace for Students
      </p>

      <p style={{ marginTop: 5, color: "gray" }}>
        Buy • Sell • Chat • All inside your campus
      </p>

      <div style={{ marginTop: 40 }}>
        <button
          onClick={() => navigate("/marketplace")}
          style={{
            background: "#2f855a",
            color: "white",
            padding: "14px 28px",
            borderRadius: 12,
            border: "none",
            marginRight: 15,
            fontSize: 16,
            cursor: "pointer",
          }}
        >
          Enter Marketplace
        </button>

        {!user && (
          <button
            onClick={() => navigate("/auth")}
            style={{
              background: "#dd6b20",
              color: "white",
              padding: "14px 28px",
              borderRadius: 12,
              border: "none",
              fontSize: 16,
              cursor: "pointer",
            }}
          >
            Login / Sign Up
          </button>
        )}
      </div>

      {/* Featured Colleges */}
      <div style={{ marginTop: 100 }}>
        <h3 style={{ marginBottom: 40 }}>Featured Colleges</h3>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 40,
            flexWrap: "wrap",
          }}
        >
          {colleges.map((college) => (
            <div
              key={college.name}
              onClick={() =>
                navigate(`/marketplace?college=${college.name}`)
              }
              style={{
                width: 280,
                borderRadius: 20,
                overflow: "hidden",
                cursor: "pointer",
                boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                transition: "transform 0.3s ease",
                background: "white",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <img
                src={college.img}
                alt={college.name}
                style={{
                  width: "100%",
                  height: 180,
                  objectFit: "cover",
                }}
              />

              <div style={{ padding: 20 }}>
                <h4
                  style={{
                    color: "#dd6b20",
                    marginBottom: 10,
                  }}
                >
                  {college.name}
                </h4>

                <p style={{ fontSize: 14, color: "gray" }}>
                  Explore student listings
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Home;
