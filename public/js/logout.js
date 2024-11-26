document.addEventListener('DOMContentLoaded', () => {
    const logoutForm = document.getElementById('logout-form');
  
    if (logoutForm) {
      logoutForm.addEventListener('submit', async (event) => {
        event.preventDefault();
  
        try {

          // Make a POST request to the logout endpoint

          const response = await fetch('/api/users/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
          });
  
          if (response.ok) {

            // Redirect to the homepage if logout is successful

            document.location.replace('/');
          } else {
            
            // Display an error if logout fails

            alert('Failed to log out. Please try again.');
          }
        } catch (error) {
          console.error('Error during logout:', error);
          alert('An error occurred while trying to log out. Please try again later.');
        }
      });
    }
  });
  