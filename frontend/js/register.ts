// Register form
document.getElementById('register-form')?.addEventListener('submit', async (e: Event) => {
    e.preventDefault();

    const username: string = (document.getElementById('username') as HTMLInputElement).value;
    const password: string = (document.getElementById('password') as HTMLInputElement).value;

    try {
        const response = await fetch('http://localhost:5000/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        if (response.ok) {
            window.location.href = 'login.html'; // Redirect to login page after successful registration
        } else {
            (document.getElementById('register-error') as HTMLElement).innerText = data.error; // Show error message
        }
    } catch (error) {
        console.error('Registration failed:', error);
        (document.getElementById('register-error') as HTMLElement).innerText = 'An error occurred. Please try again.';
    }
});
