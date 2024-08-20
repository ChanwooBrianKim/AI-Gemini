/*
Manages the interaction with the external API,
ensuring that the user's message is sent 
and the AI's response is received correctly.
*/
// API configuration
const API_KEY = "YOUR_API_KEY";
const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`;

/**
 * Sends a POST request to the API with the user's message and retrieves the response.
 * @param {string} userMessage - The user's message to send to the API.
 * @returns {Promise<string>} - The API's response as a string.
 */

// Function to fetch API response
export const fetchAPIResponse = async (userMessage) => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{
                    role: "user",
                    parts: [{ text: userMessage }]
                }]
            })
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error.message);

        // Extract the API response text and remove asterisks used for bold text in the response
        const apiResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text.replace(/\*\*(.*?)\*\*/g, '$1');

        if (apiResponse) {
            return apiResponse;
        } else {
            console.error('API response does not contain the expected data structure.');
            return 'Unexpected response format from the API.';
        }
    } catch (error) {
        console.error('Error fetching API response:', error);
        return 'Failed to get a response from the server.';
    }
};
