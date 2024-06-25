// src/store.ts
import fs from 'fs';
import path from 'path';

class Store {
    private dataDir: string;

    constructor() {
        this.dataDir = path.join(__dirname, '../src/data');
    }

    public getItemsByClass(itemClass: string): any[] {
        const filePath = path.join(this.dataDir, `${itemClass.toLowerCase()}_items.json`);
        console.log(`Fetching items from: ${filePath}`);
        try {
            const data = fs.readFileSync(filePath, 'utf8');
            const items = JSON.parse(data);
            return Array.isArray(items) ? items : [];
        } catch (error) {
            console.error(`Error reading file for class ${itemClass}:`, error);
            return [];
        }
    }

    public getSkillsByClass(skillClass: string): any[] {
        const filePath = path.join(this.dataDir, `${skillClass.toLowerCase()}_skills.json`);
        console.log(`Fetching skills from: ${filePath}`);
        try {
            const data = fs.readFileSync(filePath, 'utf8');
            const skills = JSON.parse(data);
            return Array.isArray(skills) ? skills : [];
        } catch (error) {
            console.error(`Error reading file for class ${skillClass}:`, error);
            return [];
        }
    }
}

export default Store;
