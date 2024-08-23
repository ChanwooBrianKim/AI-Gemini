/*
Purpose: server.js is the main entry point for your backend server. 
It sets up the Express server, handles routing, and manages requests and responses 
between the client and the server.
*/

import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import path from 'path';
import { fileURLToPath } from 'url';
import { createUser, findUserByUsername, insertMessage } from './db.js'; // Import the function to insert messages into the DB
import { fetchAPIResponse } from './api.js'; // Import the API function

const app = express();
const SECRET_KEY = 'YOUR_SECRET_KEY'

// Middleware to parse JSON requests
app.use(express.json());

// Serve static files (CSS, JS, images)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '../frontend')));

// Temporally user test
const insertTempUser = async () => {
    const username = 'testuser';
    const password = '1234'; // Plain text password

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser(username, hashedPassword);

    console.log('User inserted:', user);
};

insertTempUser().catch(console.error);

// User Registration Route
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
    // try {
    //     const hashedPassword = await bcrypt.hash(password, 10);
    //     const user = await createUser(username, hashedPassword);
    //     res.status(201).json({ message: 'User created successfully', user });
    // } catch (error) {
    //     console.error('Error creating user:', error);
    //     res.status(500).json({ error: 'Failed to create user' });
    // }
    try {
        // Check if the user already exists
        const existingUser = await findUserByUsername(username);
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists='});
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 15);

        // Create user
        const newUser = await createUser(username, hashedPassword);
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Failed to register user' });
    }
});

// User Login Route
app.post('/api/login', async (req, res) => {
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
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.sendStatus(401); // Unauthorized
    }
    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.sendStatus(403); // Forbidden
        }
        req.user = user;
        next();
    });
};

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
