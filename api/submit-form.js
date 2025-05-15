import axios from 'axios';
import qs from 'qs';

export default async function handler(req, res) {
  // Handle only POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // Parse the JSON body
  const { name, phone, area, frequency } = req.body;

  if (!name || !phone || !area || !frequency) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const formData = {
    "entry.1662515206": name,
    "entry.1465121279": phone,
    "entry.233960207": area,
    "entry.1359623008": frequency
  };

  try {
    await axios.post(
      "https://docs.google.com/forms/d/e/1FAIpQLScmaI-dQYF6hsIliDTOOv_bWAXQDcXzReFbsJBigE9qLX3SJw/formResponse",
      qs.stringify(formData),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    );

    // Add CORS headers manually if needed
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    return res.status(200).json({ success: true, message: 'Form submitted to Google successfully' });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to submit to Google Form',
      error: error.message
    });
  }
}
