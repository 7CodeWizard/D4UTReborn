// public/js/summary.js

export function updateSummary(type, value, details = null) {
    const summaryContent = document.getElementById("summary-content");
    console.log(
      `Updating summary: type=${type}, value=${value}, details=${details}`
    );
    const existingSummaryItem = document.querySelector(
      `#summary-content li[data-type="${type}"]`
    );
    if (existingSummaryItem) {
      existingSummaryItem.innerHTML = `<strong>${type}:</strong> ${value}`;
      if (details) {
        const detailsList = document.createElement("ul");
        details.forEach((detail) => {
          const detailItem = document.createElement("li");
          detailItem.textContent = detail;
          detailsList.appendChild(detailItem);
        });
        existingSummaryItem.appendChild(detailsList);
      }
    } else {
      const summaryItem = document.createElement("li");
      summaryItem.setAttribute("data-type", type);
      summaryItem.innerHTML = `<strong>${type}:</strong> ${value}`;
      summaryItem.classList.add("clickable-summary-item"); // Add class for clickable styling
      if (details) {
        const detailsList = document.createElement("ul");
        details.forEach((detail) => {
          const detailItem = document.createElement("li");
          detailItem.textContent = detail;
          detailsList.appendChild(detailItem);
        });
        summaryItem.appendChild(detailsList);
      }
      summaryContent.appendChild(summaryItem);
  
      // Add event listener for navigation
      summaryItem.addEventListener("click", () => navigateToSection(type, fetchUniqueItems, selectedClass));
    }
  }
  
  export function resetSummary() {
    const summaryContent = document.getElementById("summary-content");
    console.log("Resetting summary");
    summaryContent.innerHTML = "";
  }
  