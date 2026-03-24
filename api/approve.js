const axios = require('axios');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');
  
  const { paymentId } = req.body;
  const apiKey = process.env.PI_API_KEY;

  try {
    const response = await axios.post(
      `https://api.minepi.com/v2/payments/${paymentId}/approve`,
      {},
      { headers: { 'Authorization': `Key ${apiKey}` } }
    );

    res.status(200).json({ message: "Duyệt thành công!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
