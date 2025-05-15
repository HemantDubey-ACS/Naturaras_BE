import axios from 'axios';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');  // Allow any origin
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    // Handle preflight request
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, phone, location, plan } = req.body;

  if (!name || !phone || !location || !plan) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const formData = new URLSearchParams();
  formData.append('entry.1662515206', name);
  formData.append('entry.1465121279', phone);
  formData.append('entry.233960207', location);
  formData.append('entry.1359623008', plan);

  try {
    await axios.post(
      'https://docs.google.com/forms/d/e/1FAIpQLScmaI-dQYF6hsIliDTOOv_bWAXQDcXzReFbsJBigE9qLX3SJw/formResponse',
      formData.toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0 Safari/537.36',
        },
      }
    );
  
    return res.status(200).json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Error submitting form:', error.response?.data || error.message || error);
    return res.status(500).json({ message: 'Failed to submit form'+ error.response?.data || error.message || error });
  }
  
}
