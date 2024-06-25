import { navigateToSection } from "./main.js"; // Import the navigateToSection function

export function initializeEventListeners() {
  // Load welcome message
  fetch('welcome.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('information').innerHTML = data;
      const getStartedButton = document.getElementById("get-started-button");
      if (getStartedButton) {
        getStartedButton.addEventListener("click", () => {
          console.log("Get Started button clicked");
          navigateToSection("Class");
        });
      }
    })
    .catch(error => console.error('Error loading welcome message:', error));

  // You can add more event listeners here in the future
}
