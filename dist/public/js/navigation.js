// public/js/navigation.js
import { fetchUniqueItems } from './dataFetchers.js';
import { initUniqueItemSelection } from './uniqueItemSelection.js';
import { getState } from './state.js';

const { populateUniqueItems } = initUniqueItemSelection(() => {});

export function navigateToSection(type) {
    const selectedClass = getState('selectedClass');
    console.log(`Navigating to section: ${type}`);
    hideAllSections();

    document.getElementById("dps-box").style.display = "block";
    document.getElementById("suggestion-box").style.display = "block";
    document.getElementById("total-attribute-box").style.display = "block";
    document.getElementById("summary-box").style.display = "block";

    switch (type) {
        case "Information":
            showSection("information");
            break;
        case "Class":
            showSection("class-selection");
            break;
        case "Skill":
            showSection("skill-selection");
            break;
        case "Helmet":
            showSection("item-selection");
            fetchUniqueItems(selectedClass, "helmet", populateUniqueItems);
            break;
        case "Chest":
            showSection("item-selection");
            fetchUniqueItems(selectedClass, "chest", populateUniqueItems);
            break;
        case "Pant":
            showSection("item-selection");
            fetchUniqueItems(selectedClass, "pant", populateUniqueItems);
            break;
        case "Item Details":
            showSection("item-details");
            break;
        case "Profile":
            showSection("profile-page");
            break;
        case "Affixes":
            showSection("affix-selection");
            break;
        default:
            console.error(`Unknown section: ${type}`);
    }
}

function hideAllSections() {
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'none';
    });
}

function showSection(sectionId) {
    document.getElementById(sectionId).style.display = 'block';
}
