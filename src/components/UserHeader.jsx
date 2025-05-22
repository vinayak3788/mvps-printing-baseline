// components/UserHeader.jsx
import { auth } from "../config/firebaseConfig";
import { useEffect, useState } from "react";

export default function UserHeader() {
  const [name, setName] = useState("");

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) setName(username);
  }, []);

  return (
    <div className="fixed top-2 right-4 bg-purple-100 text-purple-800 px-3 py-1 rounded-md shadow text-sm z-50">
      {name && `Welcome, ${name.split(" ")[0]}!`}
    </div>
  );
}
