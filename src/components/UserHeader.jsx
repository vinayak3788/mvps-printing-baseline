import React, { useEffect, useState } from "react";
import { auth } from "../config/firebaseConfig";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function UserHeader() {
  const [firstName, setFirstName] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFirstName = async () => {
      const user = auth.currentUser;
      if (!user) return;
      try {
        const { data } = await axios.get(
          `/api/get-profile?email=${encodeURIComponent(user.email)}`,
        );
        setFirstName(data.firstname || user.email.split("@")[0]);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        setFirstName(user.email.split("@")[0]);
      }
    };
    fetchFirstName();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login", { replace: true });
  };

  return (
    <div className="absolute top-4 right-4 flex items-center gap-4 text-sm font-semibold">
      {firstName ? <span>Welcome, {firstName}!</span> : <span>Loading...</span>}
      <button
        onClick={handleLogout}
        className="text-red-600 hover:underline"
        aria-label="Logout"
      >
        Logout
      </button>
    </div>
  );
}
