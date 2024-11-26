document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
  
    if (loginForm) {
      loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
  
        // Get user input values

        const email = document.querySelector('input[name="email"]').value.trim();
        const password = document.querySelector('input[name="password"]').value.trim();
  
        // Check if both fields have values

        if (email && password) {
          try {

            // Make a POST request to the login endpoint

            const response = await fetch('/api/users/login', {
              method: 'POST',
              body: JSON.stringify({ email, password }),
              headers: { 'Content-Type': 'application/json' },
            });
  
            if (response.ok) {

              // Redirect to the dashboard if login is successful

              document.location.replace('/dashboard');
            } else {
              
              // Display an error if login fails
              
              alert('Failed to log in. Please check your email and password.');
            }
          } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred while trying to log in. Please try again later.');
          }
        } else {
          alert('Please enter both email and password.');
        }
      });
    }
  });
  