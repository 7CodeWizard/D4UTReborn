// public/js/affixSelection.js
export function populateAffixSelection(affixes) {
  const affixesContainer = document.getElementById("affixes-container");
  affixesContainer.innerHTML = "";

  affixes.forEach((affix, index) => {
      const affixCheckbox = document.createElement("input");
      affixCheckbox.type = "checkbox";
      affixCheckbox.className = "affix-input";
      affixCheckbox.id = `affix-${index}`;
      affixCheckbox.value = affix;

      const affixLabel = document.createElement("label");
      affixLabel.htmlFor = `affix-${index}`;
      affixLabel.textContent = affix;

      const affixContainer = document.createElement("div");
      affixContainer.className = "affix-container";
      affixContainer.appendChild(affixCheckbox);
      affixContainer.appendChild(affixLabel);

      affixesContainer.appendChild(affixContainer);
  });
}
