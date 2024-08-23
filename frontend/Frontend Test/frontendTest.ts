// // // main.js
// // import { createMessageElement, loadLocalStorageData, setIsResponseGenerating, getIsResponseGenerating } from './core.js'; // Import functions from core.js
// // import { setupEventListeners } from './events.js'; // Import setupEventListeners from events.js
// // import { showTypingEffect, showLoadingAnimation } from './ui.js'; // Import showTypingEffect and showLoadingAnimation from ui.js

// // // Function to send a message to the server and retrieve the AI's response
// // const sendMessageToServer = async (userMessage) => {
// //     try {
// //         const response = await fetch('/api/message', {
// //             method: 'POST',
// //             headers: { 'Content-Type': 'application/json' },
// //             body: JSON.stringify({ userMessage }),
// //         });
// //         const data = await response.json();
// //         return data.response; // Assuming the server returns { response: "AI's response" }
// //     } catch (error) {
// //         console.error('Error fetching response from server:', error);
// //         return 'Failed to get a response from the server.';
// //     }
// // };

// // // Function to handle the response from the backend API and show typing effect
// // export const generateAPIResponse = async (incomingMessageDiv, userMessage) => {
// //     const textElement = incomingMessageDiv.querySelector('.text'); // Get text element

// //     // Fetch the response from the server using userMessage
// //     const apiResponse = await sendMessageToServer(userMessage);

// //     // Handle and display the API response
// //     if (apiResponse) {
// //         showTypingEffect(apiResponse, textElement, incomingMessageDiv, document.querySelector(".chat-list"));
// //     } else {
// //         textElement.innerText = "Failed to generate a response.";
// //         textElement.classList.add("error");
// //     }

// //     setIsResponseGenerating(false);
// //     incomingMessageDiv.classList.remove("loading");
// // };

// // // Initialize event listeners
// // setupEventListeners(
// //     document.querySelector(".typing-form"),
// //     document.querySelector(".chat-list"),
// //     document.querySelector("#toggle-theme-button"),
// //     document.querySelector("#delete-chat-button"),
// //     document.querySelectorAll(".suggestion-list .suggestion")
// // );

// // // Load local storage data to restore previous chats and theme settings
// // loadLocalStorageData(document.querySelector(".chat-list"), document.querySelector("#toggle-theme-button"));

// // // Login.js login form
// // document.getElementById('login-form').addEventListener('submit', async (e) => {
// //     e.preventDefault();
// //     const username = document.getElementById('username').value;
// //     const password = document.getElementById('password').value;

// //     try {
// //         const response = await fetch('/api/login', {
// //             method: 'POST',
// //             headers: { 'Content-Type': 'application/json' },
// //             body: JSON.stringify({ username, password }),
// //         });

// //         const data = await response.json();

// //         if (data.token) {
// //             localStorage.setItem('token', data.token); // Store the token
// //             window.location.href = 'index.html'; // Redirect to chat page
// //         } else {
// //             document.getElementById('login-error').innerText = data.error; // Show error message
// //         }
// //     } catch (error) {
// //         console.error('Login failed:', error);
// //         document.getElementById('login-error').innerText = 'An error occurred. Please try again.';
// //     }
// // });

// // register.js test
// document.getElementById('register-form').addEventListener('submit', async (e) => {
//     e.preventDefault();
//     const username = document.getElementById('username').value;
//     const password = document.getElementById('password').value;

//     try {
//         const response = await fetch('http://localhost:5000/api/register', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ username, password }),
//         });

//         const data = await response.json();

//         if (response.ok) {
//             window.location.href = 'login.html'; // Redirect to login page after successful registration
//         } else {
//             document.getElementById('register-error').innerText = data.error; // Show error message
//         }
//     } catch (error) {
//         console.error('Registration failed:', error);
//         document.getElementById('register-error').innerText = 'An error occurred. Please try again.';
//     }
// });
