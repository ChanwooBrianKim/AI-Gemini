// Login form
document.getElementById('login-form')?.addEventListener('submit', async (e: Event) => {
    e.preventDefault();  // Prevent default form submission behavior

    // Extract username and password from the input fields
    const username: string = (document.getElementById('username') as HTMLInputElement).value;
    const password: string = (document.getElementById('password') as HTMLInputElement).value;

    try {
        // Send login request to the server
        const response = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        // Handle the response from the server
        const data = await response.json();
        if (data.token) {
            localStorage.setItem('token', data.token); // Store the token in localStorage
            window.location.href = 'index.html'; // Redirect to the main page after successful login
        } else {
            (document.getElementById('login-error') as HTMLElement).innerText = data.error; // Display error message
        }
    } catch (error) {
        console.error('Login failed:', error);
        (document.getElementById('login-error') as HTMLElement).innerText = 'An error occurred. Please try again.'; // Display a generic error message
    }
});