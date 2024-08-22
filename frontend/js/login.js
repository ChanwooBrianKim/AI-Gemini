document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        if (data.token) {
            localStorage.setItem('token', data.token); // Store the token
            window.location.href = 'index.html'; // Redirect to chat page
        } else {
            document.getElementById('login-error').innerText = data.error; // Show error message
        }
    } catch (error) {
        console.error('Login failed:', error);
        document.getElementById('login-error').innerText = 'An error occurred. Please try again.';
    }
});