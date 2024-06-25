// public/js/buildManager.js

import { fetchSkills, fetchUniqueItems } from "./dataFetchers.js";
import { updateSummary } from "./summary.js";

export function saveBuild(selectedClass, selectedSkill, selectedItem, summaryContent) {
  const buildName = prompt("Enter a name for your build:");
  if (!buildName) return;

  const build = {
    class: selectedClass,
    skill: selectedSkill,
    item: selectedItem,
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

  const selectedClass = build.class;
  const selectedSkill = build.skill;
  const selectedItem = build.item;
  const summaryContent = document.getElementById("summary-content");
  
  summaryContent.innerHTML = build.summary;

  // Fetch items and skills again to ensure the selections are updated
  fetchSkills(selectedClass);
  fetchUniqueItems(selectedClass);

  navigateToSection("Information");

  // Add event listeners for the summary items
  document.querySelectorAll("#summary-content li").forEach((item) => {
    item.addEventListener("click", () => {
      const sectionType = item.getAttribute("data-type");
      console.log(`Navigating to section: ${sectionType}`);
      navigateToSection(sectionType);
    });
  });
}

export function deleteBuild(index) {
  console.log(`Deleting build at index ${index}`);
  let builds = JSON.parse(localStorage.getItem("builds"));
  builds.splice(index, 1);
  localStorage.setItem("builds", JSON.stringify(builds));

  loadBuilds();
}
