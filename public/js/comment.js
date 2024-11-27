document.addEventListener('DOMContentLoaded', () => {
    const commentForms = document.querySelectorAll('#comment-form');
  
    // Add event listeners

    commentForms.forEach((form) => {
      form.addEventListener('submit', async (event) => {
        event.preventDefault();
  
        const content = form.querySelector('textarea[name="content"]').value.trim();
        const postId = form.querySelector('input[name="post_id"]').value;
  
        if (content) {
          try {

            // Make a POST request to submit comment

            const response = await fetch('/api/comments', {
              method: 'POST',
              body: JSON.stringify({ content, post_id: postId }),
              headers: { 'Content-Type': 'application/json' },
            });
  
            if (response.ok) {

              // Reload page to show new comment

              document.location.reload();
            } else {
              alert('Failed to add comment. Please try again.');
            }
          } catch (error) {
            console.error('Error during submission:', error);
            alert('An error occurred while trying to add the comment. Please try again later.');
          }
        } else {
          alert('Please enter a comment before submitting.');
        }
      });
    });
  });
  