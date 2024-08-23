/*
Purpose: Binds user interactions with the corresponding functions
to handle events like sending messages, toggling themes, and managing chat history.
*/
import { handleOutgoingChat } from './main.js';
import { loadLocalStorageData } from './core.js';
// Define the types for the parameters
export const setupEventListeners = (typingForm, chatList, toggleThemeButton, deleteChatButton, suggestions) => {
    // Toggle between light and dark mode
    toggleThemeButton.addEventListener("click", () => {
        const isLightMode = document.body.classList.toggle("light_mode");
        localStorage.setItem("themeColor", isLightMode ? "light_mode" : "dark_mode");
        toggleThemeButton.innerText = isLightMode ? "dark_mode" : "light_mode";
    });
    // Delete all chats from local storage when button is clicked
    deleteChatButton.addEventListener("click", () => {
        if (confirm("Are you sure you want to delete all chats?")) {
            localStorage.removeItem("savedChats");
            loadLocalStorageData(chatList, toggleThemeButton);
        }
    });
    // Set userMessage and handle outgoing chat when a suggestion is clicked
    suggestions.forEach(suggestion => {
        suggestion.addEventListener("click", () => {
            const userMessage = suggestion.querySelector(".text").innerText;
            handleOutgoingChat(userMessage);
        });
    });
    // Prevent default form submission and handle outgoing chat
    typingForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const userMessage = typingForm.querySelector(".typing-input").value.trim();
        handleOutgoingChat(userMessage);
    });
};
