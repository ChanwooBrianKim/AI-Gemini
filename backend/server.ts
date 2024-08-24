/*
Purpose: server.ts is the main entry point for your backend server. 
It sets up the Express server, handles routing, and manages requests and responses 
between the client and the server.
*/

import express, { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import path from 'path';
import { fileURLToPath } from 'url';
import { createUser, findUserByUsername, getAllMessages, insertMessage } from './db.js'; // Import the function to insert messages into the DB
import { fetchAPIResponse } from './api.js'; // Import the API function
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const app = express();
const SECRET_KEY = process.env.SECRET_KEY || 'YOUR_SECRET_KEY'; // Use environment variable for the secret key

// Middleware to parse JSON requests
app.use(express.json());

// Serve static files (CSS, JS, images)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '../frontend')));
app.use(express.static(path.join(__dirname, '../dist/frontend')));

// // Temporarily insert a test user (for development/testing purposes)
// const insertTempUser = async () => {
//     const username = 'testuser';
//     const password = '1234'; // Plain text password

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await createUser(username, hashedPassword);

//     console.log('User inserted:', user);
// };

// insertTempUser().catch(console.error);

// User Registration Route
app.post('/api/register', async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await findUserByUsername(username);
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = await createUser(username, hashedPassword);
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Failed to register user' });
    }
});

// User Login Route
app.post('/api/login', async (req: Request, res: Response) => {
    const { username, password } = req.body;
    console.log('Received Username:', username);
    console.log('Received Password:', password);

    try {
        const user = await findUserByUsername(username);
        if (!user) {
            console.log('User not found');
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        console.log('Found User:', user);

        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Password Match:', isMatch);

        if (!isMatch) {
            console.log('Password does not match');
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Failed to log in' });
    }
});

// Middleware to authenticate JWT token
const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.sendStatus(401); // Unauthorized
    }
    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.sendStatus(403); // Forbidden
        }
        (req as any).user = user; // Attach user to request
        next();
    });
};

// Serve the index.html file
app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// API endpoint to handle messages
app.post('/api/message', authenticateToken, async (req: Request, res: Response) => {
    const { userMessage } = req.body;
    const user = (req as any).user;
    try {
        console.log('Received user message:', userMessage);

        // First, insert the user's message into the database
        await insertMessage(user.id, 'user', userMessage);

        // Then, fetch the AI's response
        const apiResponse = await fetchAPIResponse(userMessage);

        // Insert the AI's response into the database
        await insertMessage(user.id, 'ai', apiResponse);

        res.status(200).json({ response: apiResponse });
    } catch (error) {
        console.error('Error handling /api/message:', error);
        res.status(500).json({ error: 'Failed to handle the message.' });
    }
});

// API endpoint to retrieve chat history
app.get('/api/messages', authenticateToken, async (req: Request, res: Response) => {
    const user = (req as any).user;

    try {
        const messages = await getAllMessages(user.id);
        res.status(200).json({ messages });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retreive messages.' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
