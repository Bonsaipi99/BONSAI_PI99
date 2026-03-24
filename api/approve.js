export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');
  const { paymentId } = req.body;
  const apiKey = process.env.PI_API_KEY; // Nó sẽ tự lấy mã mầy đã dán bên Vercel

  try {
    const response = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/approve`, {
      method: 'POST',
      headers: { 
        'Authorization': `Key ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      return res.status(200).json({ message: "Duyệt thành công!" });
    } else {
      const errorData = await response.json();
      return res.status(500).json({ error: errorData });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
