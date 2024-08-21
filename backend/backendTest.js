// ui.js
import express from 'express';
import bodyParser from 'body-parser';
import { insertMessage, getConversationByUserId } from './db.js';  // ES6 import

const app = express();
app.use(bodyParser.json());

app.post('/api/message', async (req, res) => {
    const { userId, message, sender } = req.body;
    try {
        const newMessage = await insertMessage(userId, message, sender);
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/conversation/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const messages = await getConversationByUserId(userId);
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
