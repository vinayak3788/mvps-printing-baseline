// src/pages/ContactUs.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FaPhone, FaEnvelope, FaWhatsapp } from "react-icons/fa";

export default function ContactUs() {
  const phone = "+919518916780";
  const whatsappLink = `https://wa.me/919518916780`;

  return (
    <main className="min-h-screen p-8 bg-white">
      <h1 className="text-3xl font-semibold mb-4">Contact Us</h1>
      <p className="mb-6">For any queries or support, reach out to us via:</p>
      <ul className="space-y-4 mb-8">
        <li className="flex items-center">
          <FaPhone className="mr-2 text-blue-600" />
          <a href={`tel:${phone}`} className="hover:underline">
            {phone}
          </a>
        </li>
        <li className="flex items-center">
          <FaEnvelope className="mr-2 text-green-600" />
          <a
            href="mailto:mvpservices2310@gmail.com"
            className="hover:underline"
          >
            mvpservices2310@gmail.com
          </a>
        </li>
        <li className="flex items-center">
          <FaWhatsapp className="mr-2 text-green-500" />
          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
          >
            WhatsApp us
          </a>
        </li>
      </ul>
      <Link
        to="/"
        className="inline-block mt-8 text-sm text-gray-500 hover:underline"
      >
        ← Back to Home
      </Link>
    </main>
  );
}
