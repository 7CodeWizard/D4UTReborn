// public/js/itemDetails.js

import { calculateTotalAttributes, displayTotalAttributes } from './calculateTotalAttributes.js';

export function displayItemDetails(selectedItems) {
  Object.keys(selectedItems).forEach(category => {
    const item = selectedItems[category];
    const itemContainer = document.querySelector(`#${category}-detail .details`);
    if (item) {
      itemContainer.innerHTML = `
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <ul>
          ${item.attributes.map((attr, index) => `
            <li>
              ${attr}
              <input type="number" class="attribute-value" data-category="${category}" data-attribute="${attr}" value="0" placeholder="Enter value">
            </li>`).join('')}
        </ul>
      `;
      console.log(`Displaying details for ${category}:`, item);
    } else {
      itemContainer.innerHTML = '<p>No item selected.</p>';
    }
  });

  document.querySelectorAll('.attribute-value').forEach(input => {
    input.addEventListener('input', () => {
      displayTotalAttributes();
    });
  });
}

export function displaySelectedItemDetails(item) {
  if (!item) {
    console.error("Item is null");
    return;
  }

  console.log("Displaying selected item details:", item);
  const itemImageContainer = document.getElementById("item-image-container");
  const itemInfoContainer = document.getElementById("item-info-container");

  itemImageContainer.innerHTML = `<img src="${item.image}" alt="${item.name}">`;

  itemInfoContainer.innerHTML = `
    <h3>${item.name}</h3>
    <p><strong>Type:</strong> ${item.type}</p>
    ${item.attributes
      .map((attribute, index) => {
        const [attrName, attrValue] = attribute.split(": ");
        return `
          <div class="input-container">
            <p><strong>${attrName}:</strong></p>
            <input type="number" class="attribute-input" id="attribute-${index}" value="${attrValue}" data-attribute="${attrName}">
          </div>
        `;
      })
      .join("")}
    <p><strong>Effect:</strong> ${item.effect}</p>
    <p><strong>Lore:</strong> ${item.lore}</p>
  `;

  document.querySelectorAll('.attribute-input').forEach(input => {
    input.addEventListener('input', () => {
      displayTotalAttributes();
    });
  });

  // Display total attributes initially
  displayTotalAttributes();
}
