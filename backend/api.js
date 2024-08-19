import { userMessage } from "../frontend/js/core.js"; // Import the userMessage variable
import { showTypingEffect } from "../frontend/js/ui.js"; // Import the showTypingEffect function

// API configuration
const API_KEY = "YOUR_API_KEY_HERE"; // Replace with your actual API key
const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`;

// Export the generateAPIResponse function
export const generateAPIResponse = async (incomingMessageDiv) => {
    // Get the text element from the incoming message div
    const textElement = incomingMessageDiv.querySelector('.text');

    // Try to fetch the response from the API
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                prompt: { text: userMessage }, // Adjust the body according to API documentation
                temperature: 0.7,
                maxOutputTokens: 100,
            })
        });

        // Check if the response is not OK (status code is not in the 200-299 range)
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error.message || 'Unknown error occurred');
        }

        // Parse the JSON response
        const data = await response.json();

        // Extract and clean up the API response text
        const apiResponse = data?.candidates?.[0]?.output || "No response received";

        // Display the response or handle errors
        if (apiResponse) {
            showTypingEffect(apiResponse, textElement, incomingMessageDiv);
        } else {
            console.error('API response does not contain the expected data structure.');
            textElement.innerText = "Unexpected API response structure.";
            textElement.classList.add("error");
        }
    } catch (error) {
        console.error('Error fetching API response:', error);
        textElement.innerText = "Failed to get a response from the server.";
        textElement.classList.add("error");
    } finally {
        incomingMessageDiv.classList.remove("loading");
    }
}
