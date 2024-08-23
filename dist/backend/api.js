/*
Responsible for managing interactions with the external AI API (e.g., Google Generative Language API).
It sends user messages to the API and retrieves AI-generated responses.
*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const API_KEY = "YOUR_API_KEY"; // Replace with your actual API key
const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`;
/**
 * Sends a POST request to the API with the user's message and retrieves the response.
 * @param userMessage - The user's message to send to the API.
 * @returns A Promise that resolves to the API's response as a string.
 */
export const fetchAPIResponse = (userMessage) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    try {
        // Send a POST request to the API with the user's message
        const response = yield fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{
                        role: "user",
                        parts: [{ text: userMessage }]
                    }]
            })
        });
        // Parse the response JSON
        const data = yield response.json();
        // Check if the response is okay, otherwise throw an error
        if (!response.ok)
            throw new Error(data.error.message);
        // Extract the API response text and remove asterisks used for bold text
        const apiResponse = (_e = (_d = (_c = (_b = (_a = data === null || data === void 0 ? void 0 : data.candidates) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.content) === null || _c === void 0 ? void 0 : _c.parts) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e.text.replace(/\*\*(.*?)\*\*/g, '$1');
        // Check if the API response is correctly structured
        if (apiResponse) {
            return apiResponse;
        }
        else {
            console.error('API response does not contain the expected data structure.');
            return 'Unexpected response format from the API.';
        }
    }
    catch (error) {
        console.error('Error fetching API response:', error);
        return 'Failed to get a response from the server.';
    }
});
