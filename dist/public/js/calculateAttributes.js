// public/js/calculateTotalAttributes.js

import { getState } from './state.js';

export function calculateTotalAttributes() {
  const state = getState('selectedItems');
  const totalAttributes = {};

  // Iterate over all selected items in the state
  Object.values(state).forEach(item => {
    item.attributes.forEach(attribute => {
      const [attrName, attrValue] = attribute.split(": ").map(str => str.trim());
      const value = parseInt(attrValue) || 0;

      if (!totalAttributes[attrName]) {
        totalAttributes[attrName] = 0;
      }
      totalAttributes[attrName] += value;
    });
  });

  console.log('Total attributes calculated:', totalAttributes);
  return totalAttributes;
}

export function displayTotalAttributes() {
  const totalAttributes = calculateTotalAttributes();
  const totalAttributesList = document.getElementById('total-attribute-content');

  totalAttributesList.innerHTML = Object.keys(totalAttributes)
    .filter(attr => totalAttributes[attr] > 0)
    .map(attr => `<li>${attr}: ${totalAttributes[attr]}</li>`)
    .join('');
}
