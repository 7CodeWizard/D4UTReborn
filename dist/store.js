"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/store.ts
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class Store {
    constructor() {
        this.dataDir = path_1.default.join(__dirname, '../src/data');
    }
    getItemsByClass(itemClass) {
        const filePath = path_1.default.join(this.dataDir, `${itemClass.toLowerCase()}_items.json`);
        console.log(`Fetching items from: ${filePath}`);
        try {
            const data = fs_1.default.readFileSync(filePath, 'utf8');
            const items = JSON.parse(data);
            return Array.isArray(items) ? items : [];
        }
        catch (error) {
            console.error(`Error reading file for class ${itemClass}:`, error);
            return [];
        }
    }
    getSkillsByClass(skillClass) {
        const filePath = path_1.default.join(this.dataDir, `${skillClass.toLowerCase()}_skills.json`);
        console.log(`Fetching skills from: ${filePath}`);
        try {
            const data = fs_1.default.readFileSync(filePath, 'utf8');
            const skills = JSON.parse(data);
            return Array.isArray(skills) ? skills : [];
        }
        catch (error) {
            console.error(`Error reading file for class ${skillClass}:`, error);
            return [];
        }
    }
}
exports.default = Store;
