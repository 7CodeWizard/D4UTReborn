export function initUniqueItemSelection(onItemSelected) {
    function populateUniqueItems(items) {
        const itemsContainer = document.getElementById('items-container');
        console.log('Populating unique items with items:', items);
        itemsContainer.innerHTML = ''; // Clear previous items
  
        items.forEach(item => {
            const itemCard = document.createElement('div');
            itemCard.className = 'item-card';
            const imageUrl = item.name.startsWith("Custom") ? "/assets/custom_gear.png" : item.image;
            itemCard.innerHTML = `
                <img src="${imageUrl}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>${item.type}</p>
            `;
            itemCard.addEventListener('click', () => {
                console.log(`Item selected: ${item.name}`); // Add this log
                document.querySelectorAll('.item-card').forEach(card => card.classList.remove('selected'));
                itemCard.classList.add('selected');
                onItemSelected(item);
            });
  
            itemsContainer.appendChild(itemCard);
        });
    }
  
    return { populateUniqueItems };
}
