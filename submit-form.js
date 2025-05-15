// api/submit-form.js

export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).send('Method Not Allowed');
    }
  
    const { name, phone, pincode, plan } = req.body;
  
    const formData = new URLSearchParams();
    formData.append("entry.1662515206", name);
    formData.append("entry.1465121279", phone);
    formData.append("entry.233960207", pincode);
    formData.append("entry.1359623008", plan);
  
    try {
      const response = await fetch("https://docs.google.com/forms/d/e/1FAIpQLScmaI-dQYF6hsIliDTOOv_bWAXQDcXzReFbsJBigE9qLX3SJw/formResponse", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      });
  
      return res.status(200).json({ message: "Form submitted successfully." });
    } catch (error) {
      console.error("Form submission failed:", error);
      return res.status(500).json({ error: "Form submission failed." });
    }
  }
  