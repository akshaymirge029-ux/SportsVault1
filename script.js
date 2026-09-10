// Wait until the DOM is fully loaded before executing the script
document.addEventListener("DOMContentLoaded", function() {
  const stars = document.querySelectorAll('.star');
  const output = document.getElementById('rating-output');
  const submitButton = document.getElementById('submit-rating');
  const confirmationMessage = document.getElementById('confirmation-message');
  
  let ratingValue = 0; // Initialize rating value
  
  // Function to update the stars based on the current rating
  function updateStars(rating) {
      stars.forEach(star => {
          if (star.getAttribute('data-value') <= rating) {
              star.classList.add('filled');
          } else {
              star.classList.remove('filled');
          }
      });
  }
  
  // Handle star click
  stars.forEach(star => {
      star.addEventListener('click', (e) => {
          ratingValue = e.target.getAttribute('data-value');
          updateStars(ratingValue);
      });
      
      // Hover effect
      star.addEventListener('mouseover', (e) => {
          const hoverValue = e.target.getAttribute('data-value');
          updateStars(hoverValue);
      });

      star.addEventListener('mouseout', () => {
          updateStars(ratingValue); // Reset to current rating when mouse is not hovering
      });
  });

  // Function to send the rating to the server using Fetch (AJAX)
  function sendRatingToServer(rating) {
      fetch('SubmitRatingServlet', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: `rating=${rating}` // Send rating as form data
      })
      .then(response => response.text())
      .then(data => {
          output.textContent = `Thank you for your rating: ${rating} star(s)!`; // Show confirmation
          confirmationMessage.style.display = "block"; // Display confirmation message
      })
      .catch(error => {
          console.error('Error:', error);
          output.textContent = "Thank for submitting the rating";
      });
  }

  // Handle submit button click
  submitButton.addEventListener('click', () => {
      if (ratingValue > 0) {
          sendRatingToServer(ratingValue);
      } else {
          alert("Please select a rating before submitting.");
      }
  });
});
