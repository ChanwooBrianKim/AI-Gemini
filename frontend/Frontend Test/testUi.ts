// Function to delete a message from the screen
export const deleteMessage = (messageDiv: HTMLElement) => {
    messageDiv.remove(); // Remove the message from the screen
};

// Add delete button to message elements
export const addDeleteButton = (messageDiv: HTMLElement) => {
    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button';
    deleteButton.innerText = 'Delete';
    deleteButton.addEventListener('click', () => deleteMessage(messageDiv));
    messageDiv.appendChild(deleteButton);
};

// Add delete button to existing messages
export const applyDeleteButtons = () => {
    const messages = document.querySelectorAll('.message');
    messages.forEach(message => addDeleteButton(message as HTMLElement));
};
