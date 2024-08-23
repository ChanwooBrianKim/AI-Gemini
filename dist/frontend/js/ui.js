/*
Purpose: Handles UI-related effects and animations,
ensuring a smooth user experience.
*/
import { createMessageElement, setIsResponseGenerating } from './core.js';
import { generateAPIResponse } from './main.js'; // Import generateAPIResponse from main.js
// Function to show typing effect
export const showTypingEffect = (text, textElement, incomingMessageDiv, chatList) => {
    const words = text.split(' ');
    let currentWordIndex = 0;
    // Set interval to show typing effect
    const typingInterval = setInterval(() => {
        var _a, _b;
        textElement.innerText += (currentWordIndex === 0 ? '' : ' ') + words[currentWordIndex++];
        (_a = incomingMessageDiv.querySelector(".icon")) === null || _a === void 0 ? void 0 : _a.classList.add("hide");
        if (currentWordIndex === words.length) {
            clearInterval(typingInterval);
            setIsResponseGenerating(false);
            (_b = incomingMessageDiv.querySelector(".icon")) === null || _b === void 0 ? void 0 : _b.classList.remove("hide");
            localStorage.setItem("savedChats", chatList.innerHTML); // Save chat
        }
        chatList.scrollTo(0, chatList.scrollHeight); // Scroll to the bottom
    }, 75);
};
// Function to show loading animation
export const showLoadingAnimation = (chatList, userMessage) => {
    const html = `<div class="message-content">
                    <img src="../../image/gemini.png" alt="Gemini Image" class="avatar">
                    <p class="text"></p>
                    <div class="loading-indicator">
                        <div class="loading-bar"></div>
                        <div class="loading-bar"></div>
                        <div class="loading-bar"></div>
                    </div>
                </div>
                <span class="icon material-symbols-rounded copy-icon">content_copy</span>`;
    // Create a new message element
    const incomingMessageDiv = createMessageElement(html, "incoming", "loading");
    chatList.appendChild(incomingMessageDiv);
    // Attach the copyMessage function to the icon
    const copyIcon = incomingMessageDiv.querySelector('.copy-icon');
    copyIcon.addEventListener('click', () => copyMessage(copyIcon));
    chatList.scrollTo(0, chatList.scrollHeight); // Scroll to the bottom
    // Call generateAPIResponse with the correct parameters
    generateAPIResponse(incomingMessageDiv, userMessage);
};
// Function to copy the message text to the clipboard
export const copyMessage = (copyIcon) => {
    var _a;
    const messageText = ((_a = copyIcon.parentElement) === null || _a === void 0 ? void 0 : _a.querySelector(".text")).innerText;
    navigator.clipboard.writeText(messageText);
    copyIcon.innerText = "done"; // Show tick icon
    setTimeout(() => copyIcon.innerText = "content_copy", 1000); // Revert icon after 1 second
};
