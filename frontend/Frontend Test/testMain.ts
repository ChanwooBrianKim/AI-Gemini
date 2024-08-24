// /*
// Purpose: Acts as the entry point for the frontend, 
// orchestrating the flow of the application by coordinating between different modules.
// */

// import { 
//     createMessageElement, 
//     loadLocalStorageData, 
//     setIsResponseGenerating, 
//     getIsResponseGenerating 
// } from './core.js'; // Import functions from core.js
// import { setupEventListeners } from './events.js'; // Import setupEventListeners from events.js
// import { showTypingEffect, showLoadingAnimation } from './ui.js'; // Import showTypingEffect and showLoadingAnimation from ui.js

// // Function to send a message to the server and retrieve the AI's response
// const sendMessageToServer = async (userMessage: string): Promise<string> => {
//     try {
//         // Retrieve the token from localStorage
//         const token = localStorage.getItem('token');

//         // Check if the token exists
//         if (!token) {
//             throw new Error('No token found, user might not be authenticated');
//         }

//         // Send the request with the Authorization header
//         const response = await fetch('/api/message', {
//             method: 'POST',
//             headers: { 
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}` // Attach the token
//             },
//             body: JSON.stringify({ userMessage }),
//         });

//         // Check if the response is unauthorized
//         if (response.status === 401) {
//             throw new Error('Unauthorized - Please login again.');
//         }

//         // Parse the response as JSON
//         const data = await response.json();
//         return data.response; // Assuming the server returns { response: "AI's response" }
//     } catch (error) {
//         console.error('Error fetching response from server:', error);
//         return 'Failed to get a response from the server.';
//     }
// };

// // Function to fetch and display messages on page load
// const loadMessages = async () => {
//     try {
//         const response = await fetch('/api/messages', {
//             method: 'GET',
//             headers: {
//                 'Authorization': `Bearer ${localStorage.getItem('token')}`
//             },
//         });
//         const data = await response.json();
//         const chatList = document.querySelector(".chat-list") as HTMLElement;
//         data.messages.forEach((message: { sender: string, content: string }) => {
//             const html = `
//                 <div class="message-content">
//                     <img src="${message.sender === 'user' ? '../../image/user.png' : '../../image/gemini.png'}" alt="${message.sender} Image" class="avatar">
//                     <p class="text">${message.content}</p>
//                 </div>`;
//             const messageDiv = createMessageElement(html, message.sender === 'user' ? 'outgoing' : 'incoming');
//             chatList.appendChild(messageDiv);
//         });
//     } catch (error) {
//         console.error('Error loading messages:', error);
//     }
// };

// // Function to handle outgoing chat messages
// export const handleOutgoingChat = (userMessage: string): void => {
//     // Exit if there is no message or if a response is already being generated
//     if (!userMessage || getIsResponseGenerating()) return; 
    
//     // Set the flag indicating that a response is being generated
//     setIsResponseGenerating(true);

//     // Create the outgoing message HTML structure
//     const html = `
//         <div class="message-content">
//             <img src="../../image/user.png" alt="User Image" class="avatar">
//             <p class="text"></p>
//         </div>`;

//     // Create and append the outgoing message element
//     const outgoingMessageDiv = createMessageElement(html, "outgoing");
//     (outgoingMessageDiv.querySelector(".text") as HTMLElement).innerText = userMessage;
//     const chatList = document.querySelector(".chat-list") as HTMLElement;
//     chatList.appendChild(outgoingMessageDiv);

//     // Reset the input field and scroll to the bottom of the chat list
//     (document.querySelector(".typing-form") as HTMLFormElement).reset(); 
//     chatList.scrollTo(0, chatList.scrollHeight); 

//     // Hide the header once chat starts
//     document.body.classList.add("hide-header");

//     // Show the loading animation and handle the API response
//     setTimeout(() => showLoadingAnimation(chatList, userMessage), 500);
// };

// // Function to handle the response from the API and show typing effect
// export const generateAPIResponse = async (incomingMessageDiv: HTMLElement, userMessage: string): Promise<void> => {
//     const textElement = incomingMessageDiv.querySelector('.text') as HTMLElement; // Get text element

//     try {
//         // Fetch the response from the backend using userMessage
//         const apiResponse = await sendMessageToServer(userMessage);

//         // Handle and display the API response
//         if (apiResponse) {
//             showTypingEffect(apiResponse, textElement, incomingMessageDiv, document.querySelector(".chat-list") as HTMLElement);
//         } else {
//             throw new Error("Failed to generate a response.");
//         }
//     } catch (error) {
//         // Handle errors and display an error message
//         console.error(error);
//         textElement.innerText = "Failed to generate a response.";
//         textElement.classList.add("error");
//     } finally {
//         // Reset the response generation flag and remove the loading indicator
//         setIsResponseGenerating(false);
//         incomingMessageDiv.classList.remove("loading");
//     }
// };

// // Initialize event listeners for various UI elements
// setupEventListeners(
//     document.querySelector(".typing-form") as HTMLFormElement,
//     document.querySelector(".chat-list") as HTMLElement,
//     document.querySelector("#toggle-theme-button") as HTMLElement,
//     document.querySelector("#delete-chat-button") as HTMLElement,
//     document.querySelectorAll(".suggestion-list .suggestion") as NodeListOf<Element>
// );

// // Load local storage data to restore previous chats and theme settings
// loadLocalStorageData(
//     document.querySelector(".chat-list") as HTMLElement, 
//     document.querySelector("#toggle-theme-button") as HTMLElement
// );

// // Load messages from the database when the page loads
// loadMessages();

