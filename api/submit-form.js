import axios from "axios";
import qs from "qs";

export default async function handler(req, res) {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(204).end();  // 204 No Content is standard for preflight
  }

  // Allow only POST
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST, OPTIONS");
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  res.setHeader("Access-Control-Allow-Origin", "*");

  const { name, phone, area, frequency } = req.body;

  if (!name || !phone || !area || !frequency) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const formData = {
      "entry.1662515206": name,
      "entry.1465121279": phone,
      "entry.233960207": area,
      "entry.1359623008": frequency,
    };

    await axios.post(
      "https://docs.google.com/forms/d/e/1FAIpQLScmaI-dQYF6hsIliDTOOv_bWAXQDcXzReFbsJBigE9qLX3SJw/formResponse",
      qs.stringify(formData),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    return res.status(200).json({ success: true, message: "Form submitted" });
  } catch (error) {
    console.error("Submit error:", error.message);
    return res.status(500).json({ success: false, message: "Submission failed" });
  }
}
