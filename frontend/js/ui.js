import { createMessageElement, setIsResponseGenerating, getIsResponseGenerating } from './core.js'; 
import { generateAPIResponse } from './main.js';

export const showTypingEffect = (text, textElement, incomingMessageDiv, chatList) => {
    const words = text.split(' ');
    let currentWordIndex = 0; 

    const typingInterval = setInterval(() => {
        textElement.innerText += (currentWordIndex === 0 ? '' : ' ') + words[currentWordIndex++];
        incomingMessageDiv.querySelector(".icon").classList.add("hide");

        if (currentWordIndex === words.length) { 
            clearInterval(typingInterval);
            setIsResponseGenerating(false);
            incomingMessageDiv.querySelector(".icon").classList.remove("hide");
            localStorage.setItem("savedChats", chatList.innerHTML); // Save chat
        }
        chatList.scrollTo(0, chatList.scrollHeight); // Scroll to the bottom
    }, 75);
};

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

    const incomingMessageDiv = createMessageElement(html, "incoming", "loading");
    chatList.appendChild(incomingMessageDiv);

    // Attach the copyMessage function to the icon
    const copyIcon = incomingMessageDiv.querySelector('.copy-icon');
    copyIcon.addEventListener('click', () => copyMessage(copyIcon));

    chatList.scrollTo(0, chatList.scrollHeight); // Scroll to the bottom

    // Call generateAPIResponse with the correct parameters
    generateAPIResponse(incomingMessageDiv, userMessage);
};

export const copyMessage = (copyIcon) => {
    const messageText = copyIcon.parentElement.querySelector(".text").innerText;

    navigator.clipboard.writeText(messageText);
    copyIcon.innerText = "done"; // Show tick icon
    setTimeout(() => copyIcon.innerText = "content_copy", 1000); // Revert icon after 1 second
};
