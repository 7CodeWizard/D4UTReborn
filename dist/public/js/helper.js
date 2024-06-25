export function calculateTotalAttributes(selectedItems) {
  const totalAttributes = {};
  const totalAttributesList = document.getElementById('total-attributes-list');
  console.log('Calculating total attributes...');

  document.querySelectorAll('.attribute-value').forEach(input => {
    const attribute = input.getAttribute('data-attribute');
    const value = parseInt(input.value) || 0;
    if (!totalAttributes[attribute]) {
      totalAttributes[attribute] = 0;
    }
    totalAttributes[attribute] += value;
    console.log(`Attribute: ${attribute}, Value: ${value}, Total so far: ${totalAttributes[attribute]}`);
  });

  console.log('Total attributes calculated:', totalAttributes);
  totalAttributesList.innerHTML = Object.keys(totalAttributes)
    .filter(attr => totalAttributes[attr] > 0)
    .map(attr => `<li>${attr}: ${totalAttributes[attr]}</li>`)
    .join('');
}
