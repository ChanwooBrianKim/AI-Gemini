/*
Purpose: Manages shared state and utility functions 
that are used across various other modules.
*/

export let isResponseGenerating: boolean = false;

// Function to set isResponseGenerating value
export const setIsResponseGenerating = (value: boolean): void => {
    isResponseGenerating = value;
};

// Function to get isResponseGenerating value
export const getIsResponseGenerating = (): boolean => {
    return isResponseGenerating;
};

// Function to create a message element
export const createMessageElement = (content: string, ...classes: string[]): HTMLDivElement => {
    const div: HTMLDivElement = document.createElement("div");
    div.classList.add("message", ...classes);
    div.innerHTML = content;
    return div;
};

// Function to load data from local storage
export const loadLocalStorageData = (chatList: HTMLElement, toggleThemeButton: HTMLElement): void => {
    const savedChats: string | null = localStorage.getItem("savedChats");
    const isLightMode: boolean = (localStorage.getItem("themeColor") === "light_mode");

    // Apply the stored theme
    document.body.classList.toggle("light_mode", isLightMode);
    toggleThemeButton.innerText = isLightMode ? "dark_mode" : "light_mode";

    // Restore saved chats
    chatList.innerHTML = savedChats || "";

    document.body.classList.toggle("hide-header", !!savedChats);
    chatList.scrollTo(0, chatList.scrollHeight); // Scroll to the bottom
};
