import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";

export const Appbar = () => {
  const [username, setUsername] = useState("User");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setLoading(false);
          return;
        }

        console.log("🔍 Fetching user data...");
        
        const response = await fetch("http://localhost:3000/api/v1/user/me", {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        console.log("📡 Response status:", response.status);
        
        if (response.ok) {
          const userData = await response.json();

          setUsername(userData.firstName || userData.username || "User");
        } else {

          const errorText = await response.text();
          console.log("Error response:", errorText);
        }
      } catch (err) {

      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/signin";
  };

  if (loading) {
    return (
      <div className="shadow-lg h-16 px-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex justify-between items-center text-white">
        <div className="text-2xl font-bold tracking-wide">PayTM App</div>
        <div className="text-md">Loading...</div>
      </div>
    );
  }

  return (
    <div className="shadow-lg h-16 px-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex justify-between items-center text-white">
      
      {/* Left - App Title */}
      <div className="text-2xl font-bold tracking-wide">
         PayTM App
      </div>
      
      {/* Right - User Section */}
      <div className="flex items-center space-x-4">
        <div className="text-md md:text-lg font-medium">
          Hello, {username}
        </div>
        
        <div className="rounded-full h-12 w-12 bg-white text-indigo-600 flex items-center justify-center font-bold text-xl">
          {username.charAt(0).toUpperCase()}
        </div>
        
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};