export default function handler(req, res) {
    if (req.method === 'POST') {
        res.json({ ...chatHistory, status: 'success' });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).json({ error: `Method ${req.method} not allowed` });
    }
  }
  