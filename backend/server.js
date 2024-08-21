import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
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

// Example route to handle API requests (this is optional and depends on how your app works)
app.post('/api/message', async (req, res) => {
    const { userMessage } = req.body;
    try {
        const apiResponse = await fetchAPIResponse(userMessage);
        res.status(200).json({ response: apiResponse });
    } catch (error) {
        res.status(500).json({ error: 'Failed to get a response from the server.' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
