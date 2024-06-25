D4UTReborn Project: Function Deep Dive
=======================================

1. File: package.json

- Contains project metadata, dependencies, and scripts.
- Scripts for building (`npm run start-dev`, `fetch-structure`)
-----------------------

2. File: tsconfig.json

- TypeScript compiler configuration.
- Specifies target JavaScript version, module system, output directory, and other compiler options.
---------------------------

3. File: public/index.html

- Main HTML structure of the web application.
- Links to CSS (styles.css) and JavaScript (main.js, navigation.js) files.
-----------------------------

4. File: public/welcome.html

- Contains the welcome message displayed to the user when they first load the application.
-------------------------------

5. File: public/css/styles.css

- Defines styles for the web application, including animations, layout, colors, fonts, and responsive design.
-------------------------------------

6. File: public/js/affixSelection.js

- Function: populateAffixSelection(affixes)
  - Populates the affix selection UI with checkboxes for each affix.
  - Clears previous affix elements and creates new ones based on the provided affixes.
-----------------------------------

7. File: public/js/buildManager.js

- Function: saveBuild(selectedClass, selectedSkill, selectedItem, summaryContent)
  - Prompts the user to enter a name for the build.
  - Saves the build to local storage.
  - Calls loadBuilds() to refresh the list of saved builds.

- Function: loadBuilds()
  - Loads builds from local storage and displays them in the UI.

- Function: loadBuild(index)
  - Loads a specific build from local storage.
  - Fetches skills and unique items to ensure the selections are updated.
  - Adds event listeners for summary items.

- Function: deleteBuild(index)
  - Deletes a specific build from local storage.
  - Calls loadBuilds() to refresh the list of saved builds.
-------------------------------------

8. File: public/js/classSelection.js

- Function: initClassSelection(selectClassCallback, currentClass)
  - Initializes the class selection process.
  - Creates class cards and updates the summary when a class is selected.
-----------------------------------

9. File: public/js/dataFetchers.js

- Function: fetchSkills(selectedClass, populateSkillDropdowns, displaySkillDetails, addSkillSelectionListeners)
  - Fetches skills for the selected class from the server.
  - Calls provided callbacks to populate skill dropdowns, display skill details, and add skill selection listeners.

- Function: fetchUniqueItems(selectedClass, populateUniqueItems)
  - Fetches unique items from the server.
  - Filters items based on the selected class and calls populateUniqueItems().

- Function: fetchAffixes(selectedClass, gearType, populateAffixSelection)
  - Fetches affixes for the selected class and gear type from the server.
  - Calls populateAffixSelection() with the fetched affixes.

--------------------------------------
10. File: public/js/eventListeners.js

- Function: initializeEventListeners()
  - Fetches the welcome message and sets up event listeners for various UI elements.

------------------------------
11. File: public/js/helper.js

- Function: calculateTotalAttributes(selectedItems)
  - Calculates total attributes based on selected items.
  - Updates the UI with the calculated total attributes.
-----------------------------------

12. File: public/js/itemDetails.js

- Function: displayItemDetails(selectedItems)
  - Displays details of the selected items in the UI.
  - Adds input event listeners to recalculate total attributes.

- Function: displaySelectedItemDetails(item)
  - Displays detailed information about a selected item in the UI.
-------------------------------------

13. File: public/js/itemSelection.js

- Function: initItemSelection(displayItemDetails, calculateTotalAttributes)
  - Initializes the item selection process.
  - Function: populateItemDropdowns(items)
    - Populates item dropdowns based on the provided items.
    - Calls displayItemDetails() and calculateTotalAttributes() when an item is selected.
----------------------------

14. File: public/js/main.js

- Manages the main functionality and initializes various components.
- Functions: navigateToSection(type), event listeners for buttons, etc.
- Calls functions from other modules to handle class, skill, and item selection.
----------------------------------

15. File: public/js/navigation.js

- Function: navigateToSection(type, fetchUniqueItems, selectedClass)
  - Handles navigation logic between different sections.
  - Hides all sections and shows the specified section.
------------------------------------

16. File: public/js/skillDetails.js

- Function: displaySkillDetails(skills, skillClass)
  - Displays details of the provided skills in the UI.
--------------------------------------

17. File: public/js/skillSelection.js

- Function: initSkillSelection(selectSkillCallback)
  - Initializes the skill selection process.
  - Function: populateSkillDropdowns(skills)
    - Populates skill dropdowns with the provided skills.
    - Calls selectSkillCallback() when a skill is selected.
-------------------------------

18. File: public/js/summary.js

- Function: updateSummary(type, value, details = null)
  - Updates the summary section with the provided type, value, and details.

- Function: resetSummary()
  - Resets the summary section.
-------------------------------------------

19. File: public/js/uniqueItemSelection.js

- Function: initUniqueItemSelection(onItemSelected)
  - Initializes the unique item selection process.
  - Function: populateUniqueItems(items)
    - Populates unique items in the UI and sets up click event listeners.
------------------------

20. File: src/server.ts

- Sets up an Express server to serve static files and API endpoints.
- API Endpoints: 
  - `/api/items/:class`: Get items by class.
  - `/api/skills/:class`: Get skills by class.
  - `/api/unique-items`: Get unique items.
  - `/api/affixes/:class/:gearType`: Get gear affixes for a specific class and gear type.
-----------------------

21. File: src/store.ts

- Class: Store
  - Methods:
    - getItemsByClass(itemClass): Fetches items for the specified class.
    - getSkillsByClass(skillClass): Fetches skills for the specified class.
-------------------------------------

22. File: src/data/unique_items.json

- Contains a list of unique items with their names, types, attributes, effects, lore, class, and images.
