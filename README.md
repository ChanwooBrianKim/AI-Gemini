# 🌟AI Gemini

AI Gemini is an interactive web-based chatbot powered by generative language models. It enables users to have conversations with an AI, receiving dynamic and contextually relevant responses. The project also supports light and dark themes and allows users to save and manage their chat history.

## ✨Features

- 🗨️**Interactive Chat**: Engage in conversations with the AI, powered by a generative language model.
- 🌗**Theming**: Toggle between light and dark mode for a comfortable user experience.
- 💾**Chat History Management**: Save chat history in the browser's local storage and restore it on page load. Option to clear chat history is also provided.
- 📋**Copy to Clipboard**: Copy chat messages to the clipboard with a single click.
- ⌨️**Typing Animation**: Simulates a typing effect for a more engaging chat experience.
- 🗄️**Database Integration**: Store chat messages in a PostgreSQL database for persistent storage and retrieval.

## 🚀 Getting Started

### 🛠️ Prerequisites

- A modern web browser (Chrome, Firefox, Edge, etc.)
- Internet connection for API access
- PostgreSQL installed and configured
- Node.js installed (with npm)

### 📥Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/ai-gemini.git

2. **Navigate to the project directory**

    ```bash
    cd ai-gemini

3. **Set Up Environment Variables**
- Create a .env file in the root directory and add your PostgreSQL connection string:

    ```bash
    DATABASE_URL=postgres://yourusername:yourpassword@localhost:5432/ai_gemini_db
- Replace yourusername, yourpassword, and other details as necessary.

4. **Install Dependencies**

    ```bash
    npm install

5. **Set Up the Database**
- Ensure PostgreSQL is running.
- Run the following command to create the messages table in the database:

    ```bash
    psql -U yourusername -d ai_gemini_db -f backend/db/create_messages_table.sql

6. **Start the Server**

    ```bash
    npm start

7. **Open 'index.html' or running local host**

    ```bash
    open index.html or proper local host


## 💡 Usage
1. **Start Chatting**: Enter your message in the input field at the bottom and press Enter or click the send button. The AI will respond to your query.

2. **Toggle Theme**: Use the theme toggle button at the top-right to switch between light and dark modes. The chosen theme will be saved and applied on your next visit.

3. **Manage Chat History**:

- **Save**: Your chat history is automatically saved in your browser's local storage.
- **Restore**: Chat history is restored when you revisit or reload the page.
- **Delete**: Use the delete button to clear your chat history.
- **Copy Messages**: Hover over a message and click the copy icon to copy the message to your clipboard.

4. **Database Storage**:

- All chat messages, both user inputs and AI responses, are stored in a PostgreSQL database for persistence.
- You can access and manage the stored messages using PostgreSQL commands or a tool like pgAdmin.

## 🛠️Technologies Used
- 🌐**HTML5**: Structure of the web page
- 🎨**CSS3**: Styling for the web page, including responsive design and theming
- 🖥️**JavaScript**: Interactivity and API integration
- 🤖**Google Generative Language API**: Backend service to generate AI responses
- ⚙️ **Node.js**: Server-side environment
- 📦 **Express.js**: Backend web framework

## 🔑API Key
This project requires an API key to access the Google Generative Language API. To use the AI Gemini project, replace the placeholder API key in the 'api.js' file with your own.

## Database Setup

- **Database**: PostgreSQL
- **Schema**: The database contains a messages table structured as follows:

    ```bash
    CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    sender VARCHAR(50) NOT NULL,  -- 'user' or 'ai'
    content TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

- **Inserting Messages**: Messages are inserted into the database whenever a user sends a message or the AI responds.
- **Retrieving Messages**: You can retrieve all stored messages using:

    ```bash
    SELECT * FROM messages ORDER BY sent_at ASC;

## 🎨Customization
- **Theming**: Modify the :'root' CSS variables in 'style.css' to customize the color scheme.
- **Typing Speed**: Adjust the typing effect speed by modifying the interval in 'showTypingEffect' function within 'script.js'.

## Troubleshooting
- **🔍Blank Screen**: Ensure that the API key is correctly set and that the browser's console does not show any errors.
- **⚠️Chat Not Loading**: Check if the images in the img folder are correctly referenced and that the API is returning valid responses.
- **API Request Issues**: Make sure your API key is valid and correctly placed in api.js.
- **CORS Errors**: Always run the project through a local server to avoid CORS issues.

## User's journey

**User Input**:
- **Triggered by**: User types a message and submits it via the form.
- **Handled in**: 'events.js' through the 'setupEventListeners' function, which calls 'handleOutgoingChat' from 'main.js'.

**Message Handling**:
- **Handled in**: 'main.js' via 'handleOutgoingChat'.
- **Actions**: Creates a new message element using 'createMessageElement' from 'core.js', appends it to the chat list, and calls 'showLoadingAnimation' from 'ui.js'.

**Loading Animation**:
- **Handled in**: 'ui.js' via 'showLoadingAnimation'.
- **Actions**: Displays a loading indicator while the AI response is being fetched, then calls 'generateAPIResponse' from 'main.js'.

**API Response**:
- **Handled in**: 'main.js' via 'generateAPIResponse'.
- **Actions**: Fetches the AI response using 'fetchAPIResponse' from 'api.js', then triggers the 'showTypingEffect' in 'ui.js' to display the response.

**UI Updates**:
- **Handled in**: 'ui.js' via 'showTypingEffect'.
- **Actions**: Simulates a typing effect and displays the AI's response in the chat.

**Additional Interactions**:
- **Handled in**: 'ui.js' for actions like copying messages ('copyMessage') and toggling themes ('toggleThemeButton' via event setup in 'events.js').

## 🗂️Project Structure

   ```bash
    ai-gemini/
    │
    ├── backend/               # Backend-related files
    │   ├── api.js             # API interactions and server-side logic
    │   ├── db.js              # Database connection and query logic
    │   └── create_messages_table.sql  # SQL script to create the messages table
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
