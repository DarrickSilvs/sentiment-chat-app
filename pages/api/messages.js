export default function handler(req, res) {
    if (req.method === 'POST') {
      res.json({ ...chatHistory, status: 'success' });
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  }
  