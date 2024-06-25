// public/js/summary.js
import { addObserver } from './state.js';
import { navigateToItemDetail } from './main.js'; // Ensure you import the function if needed

const colorClasses = {
    class: "blueish",
    skill: "redish",
    pant: "orange",
    helmet: "dark-blue",
    chest: "cyan"
};

function createSummaryItem(type, value, details) {
    const summaryItem = document.createElement("li");
    summaryItem.setAttribute("data-type", type);
    summaryItem.setAttribute("data-value", value);
    summaryItem.setAttribute("data-details", JSON.stringify(details));
    summaryItem.classList.add(colorClasses[type.toLowerCase()] || "");
    summaryItem.classList.add("clickable-summary-item");

    if (details && details.image) {
        const itemImage = document.createElement("img");
        itemImage.src = details.image;
        itemImage.alt = `${type} image`;
        itemImage.style.width = "50px"; // Adjust size as needed
        summaryItem.appendChild(itemImage);
    } else {
        summaryItem.innerHTML = `<strong>${type}:</strong> ${value}`;
    }

    summaryItem.addEventListener("click", () => navigateToItemDetail(type, value, details));

    return summaryItem;
}

function updateContainer(container, type, value, details) {
    let existingItem = container.querySelector(`[data-type="${type}"]`);
    if (existingItem) {
        // Update existing item
        existingItem.innerHTML = "";
        existingItem.classList.add(colorClasses[type.toLowerCase()] || "");

        if (details && details.image) {
            const itemImage = document.createElement("img");
            itemImage.src = details.image;
            itemImage.alt = `${type} image`;
            itemImage.style.width = "50px"; // Adjust size as needed
            existingItem.appendChild(itemImage);
        } else {
            existingItem.innerHTML = `<strong>${type}:</strong> ${value}`;
        }
    } else {
        // Create and append new item
        const summaryItem = createSummaryItem(type, value, details);
        container.appendChild(summaryItem);
    }
}

function updateClassSummary(value) {
    const summaryContent = document.getElementById("summary-content");
    let classContainer = document.querySelector("#summary-class");
    if (!classContainer) {
        classContainer = document.createElement("ul");
        classContainer.id = "summary-class";
        summaryContent.appendChild(classContainer);
    }
    updateContainer(classContainer, "Class", value);
}

function updateSkillSummary(value) {
    const summaryContent = document.getElementById("summary-content");
    let skillContainer = document.querySelector("#summary-skill");
    if (!skillContainer) {
        skillContainer = document.createElement("ul");
        skillContainer.id = "summary-skill";
        summaryContent.appendChild(skillContainer);
    }
    updateContainer(skillContainer, "Skill", value);
}

function updateItemSummary(type, value, details) {
    const summaryContent = document.getElementById("summary-content");
    let itemsContainer = document.querySelector("#summary-items");
    if (!itemsContainer) {
        itemsContainer = document.createElement("ul");
        itemsContainer.id = "summary-items";
        summaryContent.appendChild(itemsContainer);
    }
    updateContainer(itemsContainer, type, value, details);
}

export function updateSummary(type, value, details = null) {
    switch (type.toLowerCase()) {
        case "class":
            updateClassSummary(value);
            break;
        case "skill":
            updateSkillSummary(value);
            break;
        case "helmet":
        case "chest":
        case "pant":
            if (details) {
                updateItemSummary(type, value, details);
            }
            break;
        default:
            console.error(`Unknown type: ${type}`);
    }
}

export function resetSummary() {
    const summaryContent = document.getElementById("summary-content");
    console.log("Resetting summary");
    summaryContent.innerHTML = "";
}

function syncSummaryWithState(state) {
    resetSummary();
    if (state.selectedClass) {
        updateSummary("class", state.selectedClass);
    }
    if (state.selectedSkill) {
        updateSummary("skill", state.selectedSkill.name);
    }
    Object.keys(state.selectedItems).forEach(itemType => {
        const item = state.selectedItems[itemType];
        updateSummary(itemType, item.name, item); // Pass the entire item object
    });
}

// Register the summary sync function as an observer
addObserver(syncSummaryWithState);
