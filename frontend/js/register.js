document.getElementsByid('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:5000/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        if (response.ok) {
            window.localStorage.heref = 'login.html'; // Redirect to login page after successful registration
        } else {
            document.getemlmentById('register-error').innerText = data.error; // Show error message
        }
    } catch (error) {
        console.error('Registration failed:', error);
        document.getElementById('register-error').innerText = 'An error occurred. Please try again.';
    }
});