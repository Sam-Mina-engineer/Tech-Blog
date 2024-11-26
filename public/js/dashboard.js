document.addEventListener('DOMContentLoaded', () => {
    const newPostButton = document.getElementById('new-post-btn');
    const newPostForm = document.getElementById('new-post-form');
    const editPostForms = document.querySelectorAll('.edit-post-form');
    const deletePostButtons = document.querySelectorAll('.delete-post-btn');
  
    // Show the new post form 

    if (newPostButton) {
      newPostButton.addEventListener('click', () => {
        newPostForm.style.display = 'block';
      });
    }
  
    // Handle new post submission

    if (newPostForm) {
      newPostForm.addEventListener('submit', async (event) => {
        event.preventDefault();
  
        const title = newPostForm.querySelector('input[name="title"]').value.trim();
        const content = newPostForm.querySelector('textarea[name="content"]').value.trim();
  
        if (title && content) {
          try {
            const response = await fetch('/api/posts', {
              method: 'POST',
              body: JSON.stringify({ title, content }),
              headers: { 'Content-Type': 'application/json' },
            });
  
            if (response.ok) {
              document.location.replace('/dashboard');
            } else {
              alert('Failed to create post. Please try again.');
            }
          } catch (error) {
            console.error('Error during post creation:', error);
            alert('An error occurred while trying to create the post. Please try again later.');
          }
        } else {
          alert('Please enter both a title and content.');
        }
      });
    }
  
    // Handle edit post submissions

    editPostForms.forEach((form) => {
      form.addEventListener('submit', async (event) => {
        event.preventDefault();
  
        const postId = form.getAttribute('action').split('/').pop();
        const title = form.querySelector('input[name="title"]').value.trim();
        const content = form.querySelector('textarea[name="content"]').value.trim();
  
        if (title && content) {
          try {
            const response = await fetch(`/api/posts/${postId}`, {
              method: 'PUT',
              body: JSON.stringify({ title, content }),
              headers: { 'Content-Type': 'application/json' },
            });
  
            if (response.ok) {
              document.location.replace('/dashboard');
            } else {
              alert('Failed to update post. Please try again.');
            }
          } catch (error) {
            console.error('Error during post update:', error);
            alert('An error occurred while trying to update the post. Please try again later.');
          }
        } else {
          alert('Please enter both a title and content.');
        }
      });
    });
  
    // Handle delete post requests
    
    deletePostButtons.forEach((button) => {
      button.addEventListener('click', async (event) => {
        event.preventDefault();
  
        const postId = button.getAttribute('data-id');
  
        try {
          const response = await fetch(`/api/posts/${postId}`, {
            method: 'DELETE',
          });
  
          if (response.ok) {
            document.location.replace('/dashboard');
          } else {
            alert('Failed to delete post. Please try again.');
          }
        } catch (error) {
          console.error('Error during post deletion:', error);
          alert('An error occurred while trying to delete the post. Please try again later.');
        }
      });
    });
  });
  