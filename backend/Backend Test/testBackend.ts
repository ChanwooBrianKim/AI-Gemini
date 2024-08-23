// // // ui.js
// // import express from 'express';
// // import bodyParser from 'body-parser';
// // import { insertMessage, getConversationByUserId } from './db.js';  // ES6 import

// // const app = express();
// // app.use(bodyParser.json());

// // app.post('/api/message', async (req, res) => {
// //     const { userId, message, sender } = req.body;
// //     try {
// //         const newMessage = await insertMessage(userId, message, sender);
// //         res.status(201).json(newMessage);
// //     } catch (error) {
// //         res.status(500).json({ error: 'Internal Server Error' });
// //     }
// // });

// // app.get('/api/conversation/:userId', async (req, res) => {
// //     const { userId } = req.params;
// //     try {
// //         const messages = await getConversationByUserId(userId);
// //         res.status(200).json(messages);
// //     } catch (error) {
// //         res.status(500).json({ error: 'Internal Server Error' });
// //     }
// // });

// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => {
// //     console.log(`Server is running on port ${PORT}`);
// // });

// // api.js
// import express from 'express';
// import bodyParser from 'body-parser';
// import { insertMessage, getAllMessages } from './db.js';

// const app = express();
// app.use(bodyParser.json());

// // Route to handle sending a message
// app.post('/api/message', async (req, res) => {
//     const { sender, content } = req.body;  // Expecting { sender: 'user' or 'ai', content: 'message content' }
//     try {
//         const newMessage = await insertMessage(sender, content);
//         res.status(201).json(newMessage);
//     } catch (error) {
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// // Route to retrieve all messages
// app.get('/api/messages', async (req, res) => {
//     try {
//         const messages = await getAllMessages();
//         res.status(200).json(messages);
//     } catch (error) {
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
