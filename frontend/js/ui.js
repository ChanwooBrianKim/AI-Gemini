import { chatList } from './core.js'; // Import the chatList variable

// Show a typing effect for the incoming message
export const createMessageElement = (content, ...classes) => {
    const div = document.createElement("div");
    div.classList.add("message", ...classes);
    div.innerHTML = content;
    return div;
}

// Function to show a typing effect for the incoming message
export const showTypingEffect = (text, textElement, incomingMessageDiv) => {
    const words = text.split(' ');
    let currentWordIndex = 0;

    // Display each word with a typing effect
    const typingInterval = setInterval(() => {
        textElement.innerText += (currentWordIndex === 0 ? '' : ' ') + words[currentWordIndex++];
        incomingMessageDiv.querySelector(".icon").classList.add("hide");

        if (currentWordIndex === words.length) {
            clearInterval(typingInterval);
            incomingMessageDiv.querySelector(".icon").classList.remove("hide");
            localStorage.setItem("savedChats", chatList.innerHTML); // Save chat to local storage
        }
        chatList.scrollTo(0, chatList.scrollHeight); // Scroll to the bottom of the chat list
    }, 75);
}

// Function to show a loading animation for the incoming message
export const showLoadingAnimation = () => {
    const html = `<div class="message-content">
                    <img src="/image/gemini.png" alt="Gemini Image" class="avatar">
                    <p class="text"></p>
                    <div class="loading-indicator">
                        <div class="loading-bar"></div>
                        <div class="loading-bar"></div>
                        <div class="loading-bar"></div>
                    </div>
                </div>
                <span onClick="copyMessage(this)" class="icon material-symbols-rounded">content_copy</span>`;

    const incomingMessageDiv = createMessageElement(html, "incoming", "loading");
    chatList.appendChild(incomingMessageDiv);

    chatList.scrollTo(0, chatList.scrollHeight); // Scroll to the bottom of the chat list
    return incomingMessageDiv;
}

// Copy the message text to the clipboard
export const copyMessage = (copyIcon) => {
    const messageText = copyIcon.parentElement.querySelector(".text").innerText;

    navigator.clipboard.writeText(messageText);
    copyIcon.innerText = "done"; // Temporarily change the icon to a checkmark
    setTimeout(() => copyIcon.innerText = "content_copy", 1000); // Revert the icon back after 1 second
}
