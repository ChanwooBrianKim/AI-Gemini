// Handle all event listeners and user interactions in this file.
import { typingForm, toggleThemeButton, deleteChatButton, chatList, loadLocalstorageData } from "./core.js"; // Import necessary variables and functions from core.js
import { showLoadingAnimation, createMessageElement } from "./ui.js"; // Import UI-related functions from ui.js
import { generateAPIResponse } from "../../backend/api.js"; // Import the API function from backend

// Handle sending outgoing chat messages
const handleOutgoingChat = () => {
    const userMessageInput = typingForm.querySelector(".typing-input").value.trim();
    if (!userMessageInput) return;

    const html = `<div class="message-content">
                    <img src="image/user.png" alt="User Image" class="avatar">
                    <p class="text"></p>
                </div>`;

    // Create an outgoing message element and append it to the chat list
    const outgoingMessageDiv = createMessageElement(html, "outgoing");
    outgoingMessageDiv.querySelector(".text").innerText = userMessageInput;
    chatList.appendChild(outgoingMessageDiv);

    // Reset the form, scroll to the bottom of the chat list, and show loading animation
    typingForm.reset();
    chatList.scrollTo(0, chatList.scrollHeight);

    // Simulate API response after a delay
    setTimeout(() => {
        const incomingMessageDiv = showLoadingAnimation();
        generateAPIResponse(incomingMessageDiv);
    }, 500);
}

// Add event listeners for form submission, theme toggling, and chat deletion
typingForm.addEventListener("submit", (e) => {
    e.preventDefault();
    handleOutgoingChat();
});

// Toggle light/dark theme on button click
toggleThemeButton.addEventListener("click", () => {
    const isLightMode = document.body.classList.toggle("light_mode");
    localStorage.setItem("themeColor", isLightMode ? "light_mode" : "dark_mode");
    toggleThemeButton.innerText = isLightMode ? "dark_mode" : "light_mode";
});

// Delete all chats from local storage on button click
deleteChatButton.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete all chats?")) {
        localStorage.removeItem("savedChats");
        loadLocalstorageData();
    }
});
