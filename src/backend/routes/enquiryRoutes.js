// src/backend/routes/enquiryRoutes.js
import express from "express";
import { transporter } from "../mailer.js"; // adjust import to match your mailer export

const router = express.Router();

router.post("/send-enquiry", async (req, res) => {
  const { firstName, lastName, mobile, email, subject, description } = req.body;
  if (
    !firstName ||
    !lastName ||
    !mobile ||
    !email ||
    !subject ||
    !description
  ) {
    return res.status(400).json({ error: "All fields are required." });
  }

  // build the mail options
  const mailOptions = {
    from: `"MVPS Printing Enquiries" <${process.env.SMTP_FROM}>`,
    to: "mvpservices2310@gmail.com",
    cc: email,
    subject: `New Enquiry: ${subject}`,
    html: `
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Mobile:</strong> ${mobile}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Description:</strong><br/>${description.replace(/\n/g, "<br/>")}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.json({ success: true });
  } catch (err) {
    console.error("Enquiry email error:", err);
    return res.status(500).json({ error: "Failed to send enquiry." });
  }
});

export default router;
