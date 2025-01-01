import Pusher from 'pusher';
import Sentiment from 'sentiment';

const sentiment = new Sentiment();
const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_APP_CLUSTER,
  useTLS: true,
});

let chatHistory = { messages: [] };

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { user = null, message = '', timestamp = +new Date() } = req.body;
    const sentimentScore = sentiment.analyze(message).score;

    const chat = { user, message, timestamp, sentiment: sentimentScore };
    chatHistory.messages.push(chat);

    pusher.trigger('chat-room', 'new-message', { chat });

    res.json({ status: 'success', chat });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
