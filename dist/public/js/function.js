export function displaySelectedItemDetails(item) {
    console.log("Displaying selected item details:", item);
    const itemImageContainer = document.getElementById("item-image-container");
    const itemInfoContainer = document.getElementById("item-info-container");

    itemImageContainer.innerHTML = `<img src="${item.image}" alt="${item.name}">`;

    itemInfoContainer.innerHTML = `
            <h3>${item.name}</h3>
            <p><strong>Type:</strong> ${item.type}</p>
            ${item.attributes
              .map(
                (attribute, index) => `
                <div class="input-container">
                    <p><strong>${attribute}:</strong></p>
                    <input type="number" class="attribute-input" id="attribute-${index}">
                </div>
            `
              )
              .join("")}
            <p><strong>Effect:</strong> ${item.effect}</p>
            <p><strong>Lore:</strong> ${item.lore}</p>
        `;
  }
