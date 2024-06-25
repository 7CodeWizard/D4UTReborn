// public/js/calculateTotalAttributes.js
import { getState, updateState } from './state.js';

function applyDerivedStats(totalAttributes, selectedClass) {
    totalAttributes['Armor'] = (totalAttributes['Armor'] || 0) + (totalAttributes['Strength'] || 0);
    totalAttributes['Healing Received'] = (totalAttributes['Healing Received'] || 0) + (totalAttributes['Willpower'] || 0) * 0.1;
    totalAttributes['Overpower Damage'] = (totalAttributes['Overpower Damage'] || 0) + (totalAttributes['Willpower'] || 0) * 0.25;
    totalAttributes['All Resistances'] = (totalAttributes['All Resistances'] || 0) + (totalAttributes['Intelligence'] || 0) * 0.025;

    const resistanceTypes = ['Fire Resistance', 'Lightning Resistance', 'Cold Resistance', 'Poison Resistance', 'Shadow Resistance'];
    resistanceTypes.forEach(resistance => {
        totalAttributes[resistance] = (totalAttributes[resistance] || 0) + (totalAttributes['All Resistances'] || 0);
    });

    if (selectedClass === 'Barbarian') {
        totalAttributes['Skill Damage'] = (totalAttributes['Skill Damage'] || 0) + (totalAttributes['Strength'] || 0) * 0.1;
        totalAttributes['Resource Generation'] = (totalAttributes['Resource Generation'] || 0) + (totalAttributes['Willpower'] || 0) * 0.03;
        totalAttributes['Dodge Chance'] = (totalAttributes['Dodge Chance'] || 0) + (totalAttributes['Dexterity'] || 0) * 0.01;
        totalAttributes['Critical Strike Chance'] = (totalAttributes['Critical Strike Chance'] || 0) + (totalAttributes['Dexterity'] || 0) * 0.02;
    } else if (selectedClass === 'Rogue') {
        totalAttributes['Resource Generation'] = (totalAttributes['Resource Generation'] || 0) + (totalAttributes['Strength'] || 0) * 0.03;
        totalAttributes['Critical Strike Chance'] = (totalAttributes['Critical Strike Chance'] || 0) + (totalAttributes['Intelligence'] || 0) * 0.02;
        totalAttributes['Dodge Chance'] = (totalAttributes['Dodge Chance'] || 0) + (totalAttributes['Dexterity'] || 0) * 0.01;
        totalAttributes['Skill Damage'] = (totalAttributes['Skill Damage'] || 0) + (totalAttributes['Dexterity'] || 0) * 0.1;
    } else if (selectedClass === 'Necromancer' || selectedClass === 'Sorceress') {
        totalAttributes['Skill Damage'] = (totalAttributes['Skill Damage'] || 0) + (totalAttributes['Intelligence'] || 0) * 0.1;
        totalAttributes['Dodge Chance'] = (totalAttributes['Dodge Chance'] || 0) + (totalAttributes['Dexterity'] || 0) * 0.01;
        totalAttributes['Critical Strike Chance'] = (totalAttributes['Critical Strike Chance'] || 0) + (totalAttributes['Dexterity'] || 0) * 0.02;
        totalAttributes['Resource Generation'] = (totalAttributes['Resource Generation'] || 0) + (totalAttributes['Willpower'] || 0) * 0.03;
    } else if (selectedClass === 'Druid') {
        totalAttributes['Resource Generation'] = (totalAttributes['Resource Generation'] || 0) + (totalAttributes['Intelligence'] || 0) * 0.03;
        totalAttributes['Skill Damage'] = (totalAttributes['Skill Damage'] || 0) + (totalAttributes['Willpower'] || 0) * 0.1;
        totalAttributes['Dodge Chance'] = (totalAttributes['Dodge Chance'] || 0) + (totalAttributes['Dexterity'] || 0) * 0.01;
        totalAttributes['Critical Strike Chance'] = (totalAttributes['Critical Strike Chance'] || 0) + (totalAttributes['Dexterity'] || 0) * 0.02;
    }

    resistanceTypes.forEach(resistance => {
        totalAttributes[resistance] += totalAttributes['All Resistances'] || 0;
    });

    delete totalAttributes['All Resistances'];

    console.log('Derived stats applied:', totalAttributes);
}

export function calculateTotalAttributes() {
    const selectedItems = getState('selectedItems');
    const baseStats = getState('baseStats');
    const baseAttributes = getState('baseAttributes');
    const selectedClass = getState('selectedClass').name;
    const totalAttributes = {};

    console.log("Selected class:", selectedClass);
    console.log("Base stats:", baseStats);
    console.log("Base attributes:", baseAttributes);

    Object.keys(baseStats).forEach(attrName => {
        totalAttributes[attrName] = baseStats[attrName];
    });

    Object.keys(baseAttributes).forEach(attrName => {
        if (!(attrName in totalAttributes)) {
            totalAttributes[attrName] = baseAttributes[attrName];
        } else {
            totalAttributes[attrName] += baseAttributes[attrName];
        }
    });

    console.log('After merging base stats and base attributes:', totalAttributes);

    Object.values(selectedItems).forEach(item => {
        item.attributes.forEach(attribute => {
            const [attrName, attrValue] = attribute.split(": ").map(str => str.trim());
            const value = parseInt(attrValue) || 0;

            if (!totalAttributes[attrName]) {
                totalAttributes[attrName] = 0;
            }
            totalAttributes[attrName] += value;
        });
    });

    console.log('After adding item attributes:', totalAttributes);

    applyDerivedStats(totalAttributes, selectedClass);

    console.log('Total attributes calculated:', totalAttributes);

    // Store totalAttributes in the state
    updateState('totalAttributes', totalAttributes);

    return totalAttributes;
}

export function displayTotalAttributes() {
    const totalAttributes = calculateTotalAttributes();
    const totalAttributesList = document.getElementById('total-attribute-content');

    console.log('Displaying total attributes:', totalAttributes);

    totalAttributesList.innerHTML = Object.keys(totalAttributes)
        .filter(attr => totalAttributes[attr] > 0)
        .map(attr => `<li>${attr}: ${totalAttributes[attr]}</li>`)
        .join('');
}
