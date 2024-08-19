export const typingForm = document.querySelector(".typing-form");
export const chatList = document.querySelector(".chat-list");
export const toggleThemeButton = document.querySelector("#toggle-theme-button");
export const deleteChatButton = document.querySelector("#delete-chat-button");

export let userMessage = null;

// API configuration
export const loadLocalstorageData = () => {
    const savedChats = localStorage.getItem("savedChats");
    const isLightMode = (localStorage.getItem("themeColor") === "light_mode");

    // Apply the saved theme
    document.body.classList.toggle("light_mode", isLightMode);
    toggleThemeButton.innerText = isLightMode ? "dark_mode" : "light_mode";

    // Restore saved chats
    chatList.innerHTML = savedChats || "";

    document.body.classList.toggle("hide-header", savedChats);
    chatList.scrollTo(0, chatList.scrollHeight); // Scroll to the button
}

// Load the local storage data
loadLocalstorageData();