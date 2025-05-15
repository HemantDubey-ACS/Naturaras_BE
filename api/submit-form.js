import axios from "axios";
import qs from "qs";

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    // Destructure and normalize input
    const { name, phone, location, plan } = req.body;

    if (!name || !phone || !location || !plan) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Normalize and sanitize inputs
    const formattedData = {
      name: name.trim(),
      phone: phone.trim(),
      location: location.trim(),
      plan: plan.charAt(0).toUpperCase() + plan.slice(1).toLowerCase(), // Capitalize first letter
    };

    const formData = {
      "entry.1662515206": formattedData.name,
      "entry.1465121279": formattedData.phone,
      "entry.233960207": formattedData.location,
      "entry.1359623008": formattedData.plan,
    };

    console.log("Sending data:", qs.stringify(formData)); // Debug log

    await axios.post(
      "https://docs.google.com/forms/d/e/1FAIpQLScmaI-dQYF6hsIliDTOOv_bWAXQDcXzReFbsJBigE9qLX3SJw/formResponse",
      qs.stringify(formData),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    return res.status(200).json({ success: true, message: "Form submitted" });
  } catch (error) {
    console.error("Submission failed:", {
      message: error.message,
      data: error.response?.data,
      status: error.response?.status,
    });

    return res.status(500).json({ success: false, message: "Submission failed" });
  }
}
