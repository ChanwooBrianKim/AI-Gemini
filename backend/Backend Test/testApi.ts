// import fetch from 'node-fetch';

// // API configuration
// const API_KEY = 'YOUR_API_KEY';  // Replace with your actual API key
// const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`;

// /**
//  * Sends a POST request to the API with the user's message and retrieves the response.
//  * @param {string} userMessage - The user's message to send to the API.
//  * @returns {Promise<string>} - The API's response as a string.
//  */
// export const fetchAPIResponse = async (userMessage) => {
//     try {
//         // Send a POST request to the API with the user's message
//         const response = await fetch(API_URL, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//                 contents: [{
//                     role: 'user',
//                     parts: [{ text: userMessage }]
//                 }]
//             })
//         });

//         // Parse the response JSON
//         const data = await response.json();

//         // Check if the response is okay, otherwise throw an error
//         if (!response.ok) throw new Error(data.error.message);

//         // Extract the API response text and remove asterisks used for bold text
//         const apiResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text.replace(/\*\*(.*?)\*\*/g, '$1');

//         // Check if the API response is correctly structured
//         if (apiResponse) {
//             return apiResponse;
//         } else {
//             console.error('API response does not contain the expected data structure.');
//             return 'Unexpected response format from the API.';
//         }
//     } catch (error) {
//         console.error('Error fetching API response:', error);
//         return 'Failed to get a response from the server.';
//     }
// };
