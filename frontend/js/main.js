import { fetchAPIResponse } from '../../backend/api.js';
import { createMessageElement, loadLocalStorageData, setIsResponseGenerating, getIsResponseGenerating } from './core.js';
import { setupEventListeners } from './events.js';
import { showTypingEffect, showLoadingAnimation } from './ui.js';

export const handleOutgoingChat = (userMessage) => {
    if (!userMessage || getIsResponseGenerating()) return; // Exit if there is no message

    setIsResponseGenerating(true);

    const html = `<div class="message-content">
                    <img src="../../image/user.png" alt="User Image" class="avatar">
                    <p class="text"></p>
                </div>`;

    const outgoingMessageDiv = createMessageElement(html, "outgoing");
    outgoingMessageDiv.querySelector(".text").innerText = userMessage;
    document.querySelector(".chat-list").appendChild(outgoingMessageDiv);

    document.querySelector(".typing-form").reset(); // Clear input field
    document.querySelector(".chat-list").scrollTo(0, document.querySelector(".chat-list").scrollHeight); // Scroll to the bottom
    document.body.classList.add("hide-header"); // Hide header once chat starts

    // Pass userMessage to showLoadingAnimation
    setTimeout(() => showLoadingAnimation(document.querySelector(".chat-list"), userMessage), 500);
};

// Function to handle the response from the API and show typing effect
export const generateAPIResponse = async (incomingMessageDiv, userMessage) => {
    const textElement = incomingMessageDiv.querySelector('.text'); // Get text element

    // Fetch the response from the API using userMessage
    const apiResponse = await fetchAPIResponse(userMessage);

    // Handle and display the API response
    if (apiResponse) {
        showTypingEffect(apiResponse, textElement, incomingMessageDiv, document.querySelector(".chat-list"));
    } else {
        textElement.innerText = "Failed to generate a response.";
        textElement.classList.add("error");
    }

    setIsResponseGenerating(false);
    incomingMessageDiv.classList.remove("loading");
};

// Initialize event listeners
setupEventListeners(
    document.querySelector(".typing-form"),
    document.querySelector(".chat-list"),
    document.querySelector("#toggle-theme-button"),
    document.querySelector("#delete-chat-button"),
    document.querySelectorAll(".suggestion-list .suggestion")
);

// Load local storage data to restore previous chats and theme settings
loadLocalStorageData(document.querySelector(".chat-list"), document.querySelector("#toggle-theme-button"));
