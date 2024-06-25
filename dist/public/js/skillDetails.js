// public/js/skillDetails.js

export function displaySkillDetails(skills, skillClass) {
  console.log('Displaying skills:', skills);
  console.log('Selected class:', skillClass);

  const skillsContainer = document.getElementById('skills-container');

  const classDirectoryMap = {
    Barbarian: 'barbarian',
    Necromancer: 'necromancer',
    // Add other class mappings as needed
  };

  const classDirectory = classDirectoryMap[skillClass] || skillClass.toLowerCase();

  skillsContainer.innerHTML = skills.map(skill => `
    <div class="skill">
      <img src="/assets/${classDirectory}/${skill.icon}" alt="${skill.name}" class="skill-icon">
      <div class="skill-details">
        <h3>${skill.name}</h3>
        <p>Damage Multiplier: ${skill.damageMultiplier}</p>
        <p>Tags: ${skill.tags.join(', ')}</p>
      </div>
    </div>
  `).join('');
}
