import { updateState } from './state.js'; // Add this line

export function fetchSkills(selectedClass, populateSkillDropdowns, displaySkillDetails, addSkillSelectionListeners) {
    console.log("fetchSkills function called");
    console.log(`Fetching skills for class: ${selectedClass}`);

    fetch(`/api/skills/${selectedClass}`)
        .then((response) => {
            console.log("Fetch response received");
            if (!response.ok) {
                console.error("Network response was not ok");
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((skills) => {
            console.log(`Skills loaded for ${selectedClass}:`, skills);
            populateSkillDropdowns(skills);
            displaySkillDetails(skills, selectedClass);
            addSkillSelectionListeners(skills);
        })
        .catch((error) => {
            console.error("Error fetching skills:", error);
        });
}

export function fetchUniqueItems(selectedClass, itemType, populateUniqueItems) {
    try {
        console.log("fetchUniqueItems function called");

        fetch(`/api/unique-items`)
            .then((response) => {
                console.log("Fetch response received");
                if (!response.ok) {
                    console.error("Network response was not ok");
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((items) => {
                console.log(`Unique items loaded:`, items);
                const filteredItems = items.filter(
                    (item) =>
                        item.type.toLowerCase().includes(itemType) &&
                        (!item.class || item.class.toLowerCase() === selectedClass.toLowerCase())
                );
                populateUniqueItems(filteredItems);
            })
            .catch((error) => {
                handleError(error, `fetchUniqueItems(${selectedClass}, ${itemType})`);
            });
    } catch (error) {
        handleError(error, `fetchUniqueItems(${selectedClass}, ${itemType})`);
    }
}

export function fetchAffixes(selectedClass, gearType, populateAffixSelection) {
    console.log("fetchAffixes function called");
    console.log(`Fetching affixes for class: ${selectedClass}, gear type: ${gearType}`);

    fetch(`/api/affixes/${selectedClass}/${gearType}`)
        .then((response) => {
            console.log("Fetch response received");
            if (!response.ok) {
                console.error("Network response was not ok");
                alert("Failed to fetch affixes. Please try again later.");
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            console.log(`Affixes loaded:`, data);
            populateAffixSelection(data.affixes);
        })
        .catch((error) => {
            console.error("Error fetching affixes:", error);
            alert("An error occurred while fetching affixes. Please try again.");
        });
}

export function fetchBaseStats(className) {
    console.log("fetchBaseStats function called");
    console.log(`Fetching base stats for class: ${className}`);
    return fetch(`/api/base-stats/${className}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(`Base stats loaded for ${className}:`, data);
            updateState('baseStats', data);
            return data;
        })
        .catch(error => {
            console.error('Error fetching base stats:', error);
            throw error;
        });
}

export function fetchBaseAttributes() {
    console.log("fetchBaseAttributes function called");
    return fetch('/api/base-attributes')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Base attributes loaded:', data);
            updateState('baseAttributes', data);
            return data;
        })
        .catch(error => {
            console.error('Error fetching base attributes:', error);
            throw error;
        });
}
