# 🌟AI Gemini

AI Gemini is an interactive web-based chatbot powered by generative language models. It enables users to have conversations with an AI, receiving dynamic and contextually relevant responses. The project also supports light and dark themes and allows users to save and manage their chat history.

## ✨Features

- 🗨️**Interactive Chat**: Engage in conversations with the AI, powered by a generative language model.
- 🌗**Theming**: Toggle between light and dark mode for a comfortable user experience.
- 💾**Chat History Management**: Save chat history in the browser's local storage and restore it on page load. Option to clear chat history is also provided.
- 📋**Copy to Clipboard**: Copy chat messages to the clipboard with a single click.
- ⌨️**Typing Animation**: Simulates a typing effect for a more engaging chat experience.

## 🚀 Getting Started

### 🛠️ Prerequisites

- A modern web browser (Chrome, Firefox, Edge, etc.)
- Internet connection for API access

### 📥Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/ai-gemini.git

2. **Navigate to the project directory**

    ```bash
    cd ai-gemini

3. **Open 'index.html'**

    ```bash
    open index.html


## 💡 Usage
1. **Start Chatting**: Enter your message in the input field at the bottom and press Enter or click the send button. The AI will respond to your query.

2. **Toggle Theme**: Use the theme toggle button at the top-right to switch between light and dark modes. The chosen theme will be saved and applied on your next visit.

3. **Manage Chat History**:

- **Save**: Your chat history is automatically saved in your browser's local storage.
- **Restore**: Chat history is restored when you revisit or reload the page.
- **Delete**: Use the delete button to clear your chat history.
- **Copy Messages**: Hover over a message and click the copy icon to copy the message to your clipboard.

## 🛠️Technologies Used
- 🌐**HTML5**: Structure of the web page
- 🎨**CSS3**: Styling for the web page, including responsive design and theming
- 🖥️**JavaScript**: Interactivity and API integration
- 🤖**Google Generative Language API**: Backend service to generate AI responses

## 🔑API Key
This project requires an API key to access the Google Generative Language API. To use the AI Gemini project, replace the placeholder API key in the 'script.js' file with your own.

## 🎨Customization
- **Theming**: Modify the :'root' CSS variables in 'style.css' to customize the color scheme.
- **Typing Speed**: Adjust the typing effect speed by modifying the interval in 'showTypingEffect' function within 'script.js'.

## Troubleshooting
- **🔍Blank Screen**: Ensure that the API key is correctly set and that the browser's console does not show any errors.
- **⚠️Chat Not Loading**: Check if the images in the img folder are correctly referenced and that the API is returning valid responses.
- **API Request Issues**: Make sure your API key is valid and correctly placed in api.js.
- **CORS Errors**: Always run the project through a local server to avoid CORS issues.

## 🗂️Project Structure

    ```bash
    ai-gemini/
    │
    ├── backend/               # Backend-related files
    │   └── api.js             # API interactions and server-side logic
    │
    ├── frontend/              # Frontend-related files
    │   ├── js/                # JavaScript files for frontend
    │   │   ├── core.js        # Core logic and global state management
    │   │   ├── ui.js          # UI manipulation functions
    │   │   ├── events.js      # Event listeners and handlers
    │   │   └── main.js        # Entry point for frontend scripts
    │   ├── css/               # CSS files
    │   │   └── style.css      # Main stylesheet
    │   ├── image/             # Images used in the project (e.g., user.png, gemini.png)
    │   └── index.html         # HTML file for the frontend
    │
    └── README.md              # Project documentation