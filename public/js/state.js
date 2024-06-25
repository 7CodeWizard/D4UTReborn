export const state = {
    selectedClass: {
        name: '',
        image: ''
    },
    baseStats: {},
    baseAttributes: {},
    selectedSkill: {
        name: '',
        image: ''
    },
    selectedItems: {},
    summary: '',
    selectedItem: null,
    totalAttributes: {}
};

const observers = [];

export function updateState(key, value) {
    if (key === 'selectedItem') {
        console.log(`Updating state: ${key} = ${value.name}`);
        const itemType = value.type.split(' ')[1].toLowerCase();
        state.selectedItems[itemType] = value;
        state.selectedItem = value;
    } else {
        state[key] = value;
    }
    notifyObservers();
}

export function getState(key) {
    return state[key];
}

export function addObserver(callback) {
    observers.push(callback);
}

function notifyObservers() {
    console.log("Current state:", JSON.stringify(state, null, 2));
    observers.forEach(callback => callback(state));
}
