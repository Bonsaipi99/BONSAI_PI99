export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Chỉ chấp nhận POST' });
  
  const { paymentId } = req.body;
  const apiKey = process.env.PI_API_KEY;

  try {
    const response = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/approve`, {
      method: 'POST',
      headers: { 
        'Authorization': `Key ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      res.status(200).json({ status: "ok" });
    } else {
      const errorData = await response.json();
      res.status(500).json({ error: errorData });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
