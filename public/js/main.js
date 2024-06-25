import { updateState, getState, state } from './state.js';
import { initClassSelection } from "./classSelection.js";
import { initItemSelection } from "./itemSelection.js";
import { initSkillSelection } from "./skillSelection.js";
import { displayItemDetails, displaySelectedItemDetails } from "./itemDetails.js";
import { calculateTotalAttributes, displayTotalAttributes } from "./calculateTotalAttributes.js";
import { displaySkillDetails } from "./skillDetails.js";
import { initUniqueItemSelection } from "./uniqueItemSelection.js";
import { updateSummary, resetSummary } from "./summary.js";
import { fetchSkills, fetchUniqueItems, fetchAffixes, fetchBaseStats, fetchBaseAttributes } from "./dataFetchers.js";
import { saveBuild, loadBuilds, loadBuild, deleteBuild } from "./buildManager.js";
import { initializeEventListeners } from "./eventListeners.js";
import { populateAffixSelection } from "./affixSelection.js";
import { handleError } from './errorHandler.js';

let selectedAffixes = [];

const { populateUniqueItems } = initUniqueItemSelection((item) => {
  updateState('selectedItem', item);
  if (item.name.startsWith("Custom")) {
    const gearType = item.type.split(" ")[1].toLowerCase();
    fetchAffixes(state.selectedClass.name, gearType, populateAffixSelection);
    navigateToSection("Affixes");
  } else {
    displaySelectedItemDetails(item);
    navigateToSection("Item Details");
  }
});

async function onClassSelected(selectedClass) {
  try {
    const [stats, baseAttributes] = await Promise.all([
      fetchBaseStats(selectedClass),
      fetchBaseAttributes()
    ]);
    updateState('baseStats', stats);
    updateState('baseAttributes', baseAttributes);
    updateState('selectedClass', { name: selectedClass });
    displayTotalAttributes();
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

document.addEventListener("DOMContentLoaded", async function () {
  try {
    initializeEventListeners();
    console.log("DOMContentLoaded event triggered");

    // Fetch base attributes and update state
   fetchBaseAttributes();

    // Initial display of total attributes
    displayTotalAttributes();
  } catch (error) {
    handleError(error, "DOMContentLoaded");
  }
});

function navigateToSection(type) {
  try {
    console.log(`Navigating to section: ${type}`);
    const informationSection = document.getElementById("information");
    const classSelectionSection = document.getElementById("class-selection");
    const skillSelectionSection = document.getElementById("skill-selection");
    const itemSelectionSection = document.getElementById("item-selection");
    const itemDetailsSection = document.getElementById("item-details");
    const affixSelectionSection = document.getElementById("affix-selection");
    const profilePageSection = document.getElementById("profile-page");

    // Ensure these sections are always displayed
    document.getElementById("dps-box").style.display = "block";
    document.getElementById("suggestion-box").style.display = "block";
    document.getElementById("total-attribute-box").style.display = "block";
    document.getElementById("summary-box").style.display = "block";

    // Hide all main sections
    informationSection.style.display = "none";
    classSelectionSection.style.display = "none";
    skillSelectionSection.style.display = "none";
    itemSelectionSection.style.display = "none";
    itemDetailsSection.style.display = "none";
    affixSelectionSection.style.display = "none";
    profilePageSection.style.display = "none";

    switch (type) {
      case "Information":
        informationSection.style.display = "block";
        break;
      case "Class":
        classSelectionSection.style.display = "block";
        break;
      case "Skill":
        skillSelectionSection.style.display = "block";
        fetchSkills(
          state.selectedClass.name,
          populateSkillDropdowns,
          displaySkillDetails,
          addSkillSelectionListeners
        );
        break;
      case "Helmet":
        itemSelectionSection.style.display = "block";
        fetchUniqueItems(state.selectedClass.name, "helmet", populateUniqueItems);
        break;
      case "Chest":
        itemSelectionSection.style.display = "block";
        fetchUniqueItems(state.selectedClass.name, "chest", populateUniqueItems);
        break;
      case "Pant":
        itemSelectionSection.style.display = "block";
        fetchUniqueItems(state.selectedClass.name, "pant", populateUniqueItems);
        break;
      case "Item Details":
        itemDetailsSection.style.display = "block";
        break;
      case "Profile":
        profilePageSection.style.display = "block";
        break;
      case "Affixes":
        affixSelectionSection.style.display = "block";
        break;
      default:
        console.error(`Unknown section: ${type}`);
    }
  } catch (error) {
    handleError(error, `navigateToSection(${type})`);
  }
}

export function navigateToItemDetail(type, value, details) {
  try {
    console.log(`Navigating to item detail for: ${type}`);
    const itemType = type.toLowerCase();
    
    const selectedItem = state.selectedItems[itemType];
    
    if (selectedItem) {
      state.selectedItem = selectedItem;
      console.log(`Selected item:`, state.selectedItem);
      
      navigateToSection("Item Details");
      displaySelectedItemDetails(state.selectedItem);
    } else {
      console.error(`No item found for type: ${type}`);
    }
  } catch (error) {
    handleError(error, `navigateToItemDetail(${type}, ${value})`);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  try {
      initializeEventListeners();
      console.log("DOMContentLoaded event triggered");

      displayTotalAttributes();

      const classConfirmButton = document.getElementById("class-confirm");
      const skillConfirmButton = document.getElementById("skill-confirm");
      const skillBackButton = document.getElementById("skill-back");
      const itemConfirmButton = document.getElementById("item-confirm");
      const itemBackButton = document.getElementById("item-back");
      const itemDetailsBackButton = document.getElementById("item-details-back");
      const itemDetailsConfirmButton = document.getElementById("item-details-confirm");
      const affixConfirmButton = document.getElementById("affix-confirm");
      const affixBackButton = document.getElementById("affix-back");
      const profileBackButton = document.getElementById("profile-back");
      const homeButton = document.getElementById("home-button");
      const selectClassButton = document.getElementById("select-class-button");
      const selectSkillButton = document.getElementById("select-skill-button");
      const selectHelmetButton = document.getElementById("select-helmet-button");
      const selectChestButton = document.getElementById("select-chest-button");
      const selectPantButton = document.getElementById("select-pant-button");

      const summaryContent = document.getElementById("summary-content");

      const { populateSkillDropdowns } = initSkillSelection((skill) => {
          updateState('selectedSkill', skill);
          updateSummary("Skill", skill.name);
      });

      function addSkillSelectionListeners(skills) {
          const skillElements = document.querySelectorAll(".skill");
          skillElements.forEach((skillElement, index) => {
              skillElement.addEventListener("click", () => {
                  skillElements.forEach((el) => el.classList.remove("selected"));
                  skillElement.classList.add("selected");
                  updateState('selectedSkill', skills[index]);
                  console.log(`Selected skill: ${state.selectedSkill.name}`);
                  updateSummary("Skill", state.selectedSkill.name);
              });
          });
      }

      classConfirmButton.addEventListener("click", async () => {
          try {
              if (!state.selectedClass.name) {
                  alert("Please select a class.");
                  return;
              }
              console.log(`Class selected: ${state.selectedClass.name}`);
              updateSummary("Class", state.selectedClass.name);
              const classSelectionSection = document.getElementById("class-selection");
              const skillSelectionSection = document.getElementById("skill-selection");
              classSelectionSection.style.display = "none";
              skillSelectionSection.style.display = "block";
              await fetchBaseStats(state.selectedClass.name);
              await fetchBaseAttributes(); // Fetch base attributes for the selected class
              displayTotalAttributes();
              fetchSkills(
                  state.selectedClass.name,
                  populateSkillDropdowns,
                  displaySkillDetails,
                  addSkillSelectionListeners
              );
          } catch (error) {
              handleError(error, "classConfirmButton click event");
          }
      });

      skillConfirmButton.addEventListener("click", () => {
          try {
              if (!state.selectedSkill.name) {
                  alert("Please select a skill.");
                  return;
              }
              console.log("Skill selected:", state.selectedSkill.name);
              updateSummary("Skill", state.selectedSkill.name);
              const skillSelectionSection = document.getElementById("skill-selection");
              const itemSelectionSection = document.getElementById("item-selection");
              skillSelectionSection.style.display = "none";
              itemSelectionSection.style.display = "block";
              fetchUniqueItems(state.selectedClass.name, "helmet", populateUniqueItems);
          } catch (error) {
              handleError(error, "skillConfirmButton click event");
          }
      });

      skillBackButton.addEventListener("click", () => {
          try {
              const skillSelectionSection = document.getElementById("skill-selection");
              const classSelectionSection = document.getElementById("class-selection");
              skillSelectionSection.style.display = "none";
              classSelectionSection.style.display = "block";
              const classConfirmButton = document.getElementById("class-confirm");
              classConfirmButton.style.display = "none";
          } catch (error) {
              handleError(error, "skillBackButton click event");
          }
      });

      itemConfirmButton.addEventListener("click", () => {
          try {
              if (!state.selectedItem) {
                  alert("Please select an item.");
                  return;
              }
              console.log("Item selected:", state.selectedItem);

              const itemTypes = ["helmet", "chest", "pant"];
              let nextItemType = null;
              for (const type of itemTypes) {
                  if (!state.selectedItems[type]) {
                      nextItemType = type;
                      break;
                  }
              }

              if (nextItemType) {
                  navigateToSection(nextItemType.charAt(0).toUpperCase() + nextItemType.slice(1));
                  fetchUniqueItems(state.selectedClass.name, nextItemType, populateUniqueItems);
              } else {
                  console.log("All item types have been selected.");
                  navigateToSection("Information");
              }
          } catch (error) {
              handleError(error, "itemConfirmButton click event");
          }
      });

      itemBackButton.addEventListener("click", () => {
          try {
              const itemSelectionSection = document.getElementById("item-selection");
              const skillSelectionSection = document.getElementById("skill-selection");
              itemSelectionSection.style.display = "none";
              skillSelectionSection.style.display = "block";
          } catch (error) {
              handleError(error, "itemBackButton click event");
          }
      });

      itemDetailsBackButton.addEventListener("click", () => {
          try {
              const itemDetailsSection = document.getElementById("item-details");
              const itemSelectionSection = document.getElementById("item-selection");
              itemDetailsSection.style.display = "none";
              itemSelectionSection.style.display = "block";
          } catch (error) {
              handleError(error, "itemDetailsBackButton click event");
          }
      });

      itemDetailsConfirmButton.addEventListener("click", () => {
          try {
              console.log("Item details confirm button clicked");
              const inputs = document.querySelectorAll(".attribute-input");
              const selectedValues = Array.from(inputs).map((input) => {
                  const attribute = input.getAttribute('data-attribute');
                  const value = input.value;
                  return `${attribute}: ${value}`;
              });

              console.log("Selected input values:", selectedValues);

              const itemType = state.selectedItem.type.split(" ")[1].toLowerCase();
              console.log("Item Type:", itemType);

              const updatedItem = {
                  ...state.selectedItem,
                  attributes: selectedValues
              };

              console.log("Updated Item Before State Update:", updatedItem);
              updateState('selectedItem', updatedItem);
              state.selectedItems[itemType] = updatedItem;
              console.log("Updated Item After State Update:", updatedItem);

              updateSummary(itemType, updatedItem.name, updatedItem);
              navigateToSection(itemType.charAt(0).toUpperCase() + itemType.slice(1));
              displayTotalAttributes();
          } catch (error) {
              handleError(error, "itemDetailsConfirmButton click event");
          }
      });

      affixConfirmButton.addEventListener("click", () => {
          try {
              console.log("Affix confirm button clicked");
              const affixInputs = document.querySelectorAll(".affix-input:checked");
              if (affixInputs.length !== 3) {
                  alert("Please select exactly 3 affixes.");
                  return;
              }
              selectedAffixes = Array.from(affixInputs).map((input) => input.value);
              console.log("Selected affixes:", selectedAffixes);

              state.selectedItem.attributes = selectedAffixes;

              const affixSelectionSection = document.getElementById("affix-selection");
              const itemDetailsSection = document.getElementById("item-details");
              affixSelectionSection.style.display = "none";
              itemDetailsSection.style.display = "block";
              displaySelectedItemDetails(state.selectedItem);
              displayTotalAttributes();
          } catch (error) {
              handleError(error, "affixConfirmButton click event");
          }
      });

      affixBackButton.addEventListener("click", () => {
          try {
              const affixSelectionSection = document.getElementById("affix-selection");
              const itemSelectionSection = document.getElementById("item-selection");
              affixSelectionSection.style.display = "none";
              itemSelectionSection.style.display = "block";
          } catch (error) {
              handleError(error, "affixBackButton click event");
          }
      });

      initClassSelection(onClassSelected, state.selectedClass);

      function displaySelectedItemDetails(item) {
          console.log("Displaying selected item details:", item);
          const itemImageContainer = document.getElementById("item-image-container");
          const itemInfoContainer = document.getElementById("item-info-container");

          itemImageContainer.innerHTML = `<img src="${item.image}" alt="${item.name}">`;

          itemInfoContainer.innerHTML = `
              <h3>${item.name}</h3>
              <p><strong>Type:</strong> ${item.type}</p>
              ${item.attributes
                  .map((attribute, index) => `
                      <div class="input-container">
                          <p><strong>${attribute}:</strong></p>
                          <input type="number" class="attribute-input" id="attribute-${index}" value="${attribute.split(": ")[1]}" data-attribute="${attribute.split(": ")[0]}">
                      </div>
                  `)
                  .join("")}
              <p><strong>Effect:</strong> ${item.effect}</p>
              <p><strong>Lore:</strong> ${item.lore}</p>
          `;

          document.querySelectorAll('.attribute-input').forEach(input => {
              input.addEventListener('input', () => {
                  displayTotalAttributes();
              });
          });

          displayTotalAttributes();
      }

      loadBuilds();

      window.loadBuild = loadBuild;
      window.deleteBuild = deleteBuild;

      document.getElementById("save-build-button").addEventListener("click", () =>
          saveBuild(state.selectedClass.name, state.selectedSkill.name, state.selectedItems, summaryContent)
      );
      document.getElementById("profile-button").addEventListener("click", () => navigateToSection("Profile"));
      profileBackButton.addEventListener("click", () => navigateToSection("summary-box"));
      homeButton.addEventListener("click", () => navigateToSection("Information"));

      selectClassButton.addEventListener("click", () => navigateToSection("Class"));
      selectSkillButton.addEventListener("click", () => navigateToSection("Skill"));
      selectHelmetButton.addEventListener("click", () => navigateToSection("Helmet"));
      selectChestButton.addEventListener("click", () => navigateToSection("Chest"));
      selectPantButton.addEventListener("click", () => navigateToSection("Pant"));

      navigateToSection("Information");
  } catch (error) {
      handleError(error, "DOMContentLoaded second part");
  }
});

export { navigateToSection };
