// import express from 'express';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import { createUser, findUserByUsername, insertMessage } from './db.js';
// import { fetchAPIResponse } from './api.js';

// const app = express();
// const SECRET_KEY = 'your-secret-key'; // Use a secure key in production

// app.use(express.json());

// // Middleware to parse JSON requests
// app.use(express.json());

// // Serve static files (CSS, JS, images)
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// app.use(express.static(path.join(__dirname, '../frontend')));

// User Registration Route
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await createUser(username, hashedPassword);
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Failed to create user' });
    }
});

// // User Login Route
// app.post('/api/login', async (req, res) => {
//     const { username, password } = req.body;
//     try {
//         const user = await findUserByUsername(username);
//         if (!user) {
//             return res.status(400).json({ error: 'Invalid credentials' });
//         }
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ error: 'Invalid credentials' });
//         }
//         const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
//         res.status(200).json({ message: 'Login successful', token });
//     } catch (error) {
//         console.error('Error during login:', error);
//         res.status(500).json({ error: 'Failed to log in' });
//     }
// });

// // Middleware to authenticate JWT token
// const authenticateToken = (req, res, next) => {
//     const token = req.headers['authorization']?.split(' ')[1];
//     if (!token) {
//         return res.sendStatus(401); // Unauthorized
//     }
//     jwt.verify(token, SECRET_KEY, (err, user) => {
//         if (err) {
//             return res.sendStatus(403); // Forbidden
//         }
//         req.user = user;
//         next();
//     });
// };

// // Chat Message Route - Protected
// app.post('/api/message', authenticateToken, async (req, res) => {
//     const { userMessage } = req.body;
//     try {
//         console.log('Received user message:', userMessage);

//         // First, insert the user's message into the database
//         await insertMessage('user', userMessage);

//         // Then, fetch the AI's response
//         const apiResponse = await fetchAPIResponse(userMessage);

//         // Insert the AI's response into the database
//         await insertMessage('ai', apiResponse);

//         res.status(200).json({ response: apiResponse });
//     } catch (error) {
//         console.error('Error handling /api/message:', error);
//         res.status(500).json({ error: 'Failed to handle the message.' });
//     }
// });

// // Serve the index.html file
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '../frontend/index.html'));
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
