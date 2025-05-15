import axios from 'axios';
const cors = require('cors');
app.use(cors());  // This allows all origins (*)

export default async function handler(req, res) {
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
        },
      }
    );

    return res.status(200).json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to submit form' });
  }
}
