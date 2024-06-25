// public/js/classSelection.js
import { updateState, getState } from './state.js';
import { updateSummary } from "./summary.js";

export function initClassSelection(selectClassCallback, currentClass) {
  const classesContainer = document.getElementById('classes-container');
  const classConfirmButton = document.getElementById('class-confirm');

  const classes = [
    { name: 'Barbarian', icon: 'barb.webp' },
    { name: 'Sorceress', icon: 'sorc.webp' },
    { name: 'Necromancer', icon: 'necro.webp' },
    { name: 'Druid', icon: 'druid.webp' },
    { name: 'Rogue', icon: 'rogue.webp' }
  ];

  classes.forEach(classItem => {
    const classCard = document.createElement('div');
    classCard.className = 'class-card';
    classCard.innerHTML = `
      <img src="/assets/classes/${classItem.icon}" alt="${classItem.name}">
      <h3>${classItem.name}</h3>
    `;
    classCard.addEventListener('click', function() {
      if (classItem.name === currentClass) {
        console.log(`Class ${classItem.name} is already selected.`);
        return; // Do nothing if the class is already selected
      }
      document.querySelectorAll('.class-card').forEach(card => card.classList.remove('selected'));
      classCard.classList.add('selected');
      console.log(`Selected class: ${classItem.name}`);
      updateState('selectedClass', classItem.name);
      selectClassCallback(classItem.name);
      classConfirmButton.style.display = 'block';

      // Update summary without navigating to the next section
      updateSummary("Class", classItem.name);
    });

    classesContainer.appendChild(classCard);
  });
}
