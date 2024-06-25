import { fetchSkills, fetchUniqueItems } from "./dataFetchers.js";
import { updateSummary, resetSummary } from "./summary.js";
import { navigateToSection } from "./navigation.js";

export function saveBuild(selectedClass, selectedSkill, selectedItem, summaryContent) {
    const buildName = prompt("Enter a name for your build:");
    if (!buildName) return;

    const build = {
        class: selectedClass,
        skill: selectedSkill,
        items: selectedItem,
        summary: summaryContent.innerHTML,
    };

    let builds = JSON.parse(localStorage.getItem("builds")) || [];
    builds.push({ name: buildName, build });
    localStorage.setItem("builds", JSON.stringify(builds));

    loadBuilds();
}

export function loadBuilds() {
    console.log("Loading builds");
    const buildsContainer = document.getElementById("builds-container");
    buildsContainer.innerHTML = "";
    const builds = JSON.parse(localStorage.getItem("builds")) || [];

    builds.forEach(({ name, build }, index) => {
        const buildCard = document.createElement("div");
        buildCard.className = "build-card";
        buildCard.innerHTML = `
            <h3>${name}</h3>
            <button onclick="loadBuild(${index})">Load</button>
            <button onclick="deleteBuild(${index})">Delete</button>
        `;
        buildsContainer.appendChild(buildCard);
    });
}

export function loadBuild(index) {
    console.log(`Loading build at index ${index}`);
    const builds = JSON.parse(localStorage.getItem("builds"));
    const { build } = builds[index];

    const { class: selectedClass, skill: selectedSkill, items: selectedItems, summary } = build;

    resetSummary();
    updateSummary("Class", selectedClass);
    updateSummary("Skill", selectedSkill.name);
    Object.keys(selectedItems).forEach(itemType => {
        updateSummary(itemType, selectedItems[itemType].name, selectedItems[itemType].attributes);
    });

    document.getElementById("summary-content").innerHTML = summary;

    fetchSkills(selectedClass);
    Object.keys(selectedItems).forEach(itemType => {
        fetchUniqueItems(selectedClass, itemType, (items) => {
            const selectedItem = items.find(item => item.name === selectedItems[itemType].name);
            if (selectedItem) {
                updateSummary(itemType, selectedItem.name, selectedItem.attributes);
            }
        });
    });

    navigateToSection("Summary");
}

export function deleteBuild(index) {
    console.log(`Deleting build at index ${index}`);
    let builds = JSON.parse(localStorage.getItem("builds"));
    builds.splice(index, 1);
    localStorage.setItem("builds", JSON.stringify(builds));

    loadBuilds();
}
