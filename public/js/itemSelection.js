// public/js/itemSelection.js

export function initItemSelection(displayItemDetails, calculateTotalAttributes) {
  const dropdownsContainer = document.getElementById('dropdowns');
  let selectedItems = {
    helmet: null,
    chest: null,
    boot: null,
    weapon1: null,
    weapon2: null,
    pant: null,
    axe2h: null
  };

  function populateItemDropdowns(items) {
    console.log('Populating item dropdowns with items:', items);
    const categories = ['helmet', 'chest', 'boot', 'glove', 'amulet', 'pant', 'ring', 'weapon', 'offhand', 'Shield'];
    dropdownsContainer.innerHTML = ''; // Clear previous dropdowns

    categories.forEach(category => {
      const categoryItems = items.filter(item => item.type === category);

      if (categoryItems.length > 0) {
        const label = document.createElement('label');
        label.htmlFor = category;
        label.textContent = `Choose a ${category}:`;

        const select = document.createElement('select');
        select.id = category;

        categoryItems.forEach(item => {
          const option = document.createElement('option');
          option.value = JSON.stringify(item); // Store item data in option value
          option.text = item.name;
          select.appendChild(option);
        });

        select.addEventListener('change', function() {
          const selectedItem = JSON.parse(select.value);
          selectedItems[category] = selectedItem;
          console.log(`Selected item for ${category}:`, selectedItem);
          displayItemDetails(selectedItems);
          calculateTotalAttributes(selectedItems);
        });

        dropdownsContainer.appendChild(label);
        dropdownsContainer.appendChild(select);
        dropdownsContainer.appendChild(document.createElement('br'));

        // Trigger change event to load default selected item details
        select.dispatchEvent(new Event('change'));
      }
    });
  }

  return { populateItemDropdowns };
}
