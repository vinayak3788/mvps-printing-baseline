// src/components/UserHeader.jsx

import React, { useEffect, useState } from "react";
import { auth } from "../config/firebaseConfig";
import axios from "axios";

export default function UserHeader() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const fetchName = async () => {
      try {
        const { data: profile } = await axios.get(
          `/api/get-profile?email=${encodeURIComponent(user.email)}`,
        );
        if (profile?.name) {
          setUsername(profile.name);
        } else {
          // Fallback: derive name from email
          const fallbackName = user.email.split("@")[0];
          setUsername(fallbackName);
        }
      } catch (err) {
        console.error("Failed to fetch user profile:", err);
        const fallbackName = user.email.split("@")[0];
        setUsername(fallbackName);
      }
    };

    fetchName();
  }, []);

  if (!username) return null;

  return (
    <div className="text-right text-sm text-gray-600 mb-2">
      👋 Welcome,{" "}
      <span className="font-semibold text-purple-700">{username}</span>!
    </div>
  );
}
