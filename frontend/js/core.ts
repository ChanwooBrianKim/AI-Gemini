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
