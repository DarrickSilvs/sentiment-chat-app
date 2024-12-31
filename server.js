/* server.js */
    
import cors from 'cors';
import next from 'next';
import Pusher from 'pusher';
import express from 'express';
import pkg from 'body-parser';
const { json, urlencoded } = pkg;
import Sentiment from 'sentiment';
import dotenv from 'dotenv';
dotenv.config();

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;

const app = next({ dev });
const handler = app.getRequestHandler();
const sentiment = new Sentiment();

// Ensure that your pusher credentials are properly set in the .env file
// Using the specified variables
const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_APP_CLUSTER,
  encrypted: true
});

app.prepare()
  .then(() => {
  
    const server = express();
    
    server.use(cors());
    server.use(json());
    server.use(urlencoded({ extended: true }));
    
    server.get('*', (req, res) => {
      return handler(req, res);
    });

    const chatHistory = { messages: [] };
    
    server.post('/message', (req, res, next) => {
      const { user = null, message = '', timestamp = +new Date } = req.body;
      const sentimentScore = sentiment.analyze(message).score;
      
      const chat = { user, message, timestamp, sentiment: sentimentScore };
      
      chatHistory.messages.push(chat);
      pusher.trigger('chat-room', 'new-message', { chat });
    });
    
    server.post('/messages', (req, res, next) => {
      res.json({ ...chatHistory, status: 'success' });
    });
    
    
    server.listen(port, err => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
    
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });