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

  const { name, phone, location, plan } = req.body;

  if (!name || !phone || !location || !plan) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const formData = {
    "entry.1662515206": name,
    "entry.1465121279": phone,
    "entry.233960207": location,
    "entry.1359623008": plan,
  };

  try {
    const encoded = qs.stringify(formData);
    console.log("Submitting data:", encoded); // Debug log

    const response = await axios.post(
      "https://docs.google.com/forms/d/e/1FAIpQLScmaI-dQYF6hsIliDTOOv_bWAXQDcXzReFbsJBigE9qLX3SJw/formResponse",
      encoded,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
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
