// public/js/skillSelection.js
import { updateState } from './state.js';
import { updateSummary } from './summary.js';

export function initSkillSelection(selectSkillCallback) {
  const skillsContainer = document.getElementById('skills-container');

  function populateSkillDropdowns(skills) {
    console.log('Populating skill dropdowns with skills:', skills);
    skillsContainer.innerHTML = ''; // Clear previous content

    skills.forEach(skill => {
      const skillCard = document.createElement('div');
      skillCard.className = 'skill-card';
      skillCard.innerHTML = `
        <h3>${skill.name}</h3>
        <p>Damage Multiplier: ${skill.damageMultiplier}</p>
        <p>Tags: ${skill.tags.join(', ')}</p>
      `;
      skillCard.addEventListener('click', function() {
        document.querySelectorAll('.skill-card').forEach(card => card.classList.remove('selected'));
        skillCard.classList.add('selected');
        console.log(`Selected skill:`, skill);
        
        // Update state with skill name and image
        const skillData = {
          name: skill.name,
          image: `/assets/skills/${skill.icon}`,
          ...skill // Include other skill properties
        };
        updateState('selectedSkill', skillData);
        selectSkillCallback(skill); // Pass selected skill back to main.js

        // Update summary without navigating to the next section
        updateSummary("Skill", skillData);
      });

      skillsContainer.appendChild(skillCard);
    });
  }

  return { populateSkillDropdowns };
}
