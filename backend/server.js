import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { insertMessage } from './db.js'; // Import the function to insert messages into the DB
import { fetchAPIResponse } from './api.js'; // Import the API function

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Serve static files (CSS, JS, images)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '../frontend')));

// Serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// API endpoint to handle messages
app.post('/api/message', async (req, res) => {
    const { userMessage } = req.body;
    try {
        console.log('Received user message:', userMessage);

        // First, insert the user's message into the database
        await insertMessage('user', userMessage);

        // Then, fetch the AI's response
        const apiResponse = await fetchAPIResponse(userMessage);

        // Insert the AI's response into the database
        await insertMessage('ai', apiResponse);

        res.status(200).json({ response: apiResponse });
    } catch (error) {
        console.error('Error handling /api/message:', error);
        res.status(500).json({ error: 'Failed to handle the message.' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
