// src/server.ts
import express from 'express';
import path from 'path';
import fs from 'fs';
import Store from './store';

const app = express();
const port = 3000;
const store = new Store();

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, '../public')));
console.log('Serving static files from the public directory');

// Serve class icons from the "src/assets/classes" directory
app.use('/assets/classes', express.static(path.join(__dirname, '../src/assets/classes')));
console.log('Serving class icons from the assets/classes directory');

// Serve skill icons from the "src/assets/barbarian" directory
app.use('/assets/barbarian', express.static(path.join(__dirname, '../src/assets/barbarian')));
console.log('Serving barbarian icons from the assets/barbarian directory');

// Serve skill icons from the "src/assets/necromancer" directory
app.use('/assets/necromancer', express.static(path.join(__dirname, '../src/assets/necromancer')));
console.log('Serving necro icons from the assets/necromancer directory');

// Serve skill icons from the "src/assets/druid" directory
app.use('/assets/druid', express.static(path.join(__dirname, '../src/assets/druid')));
console.log('Serving druid icons from the assets/druid directory');

// Serve skill icons from the "src/assets/rogue" directory
app.use('/assets/rogue', express.static(path.join(__dirname, '../src/assets/rogue')));
console.log('Serving rogue icons from the assets/rogue directory');

// Serve skill icons from the "src/assets/sorceress" directory
app.use('/assets/sorceress', express.static(path.join(__dirname, '../src/assets/sorceress')));
console.log('Serving sorceress icons from the assets/sorceress directory');

// Serve unique helmet icons from the "src/assets/uniques/helmet" directory
app.use('/assets/uniques/helmet', express.static(path.join(__dirname, '../src/assets/uniques/helmet')));
console.log('Serving unique helmet icons from the assets/uniques/helmet directory');

// Serve unique chest icons from the "src/assets/uniques/chest" directory
app.use('/assets/uniques/chest', express.static(path.join(__dirname, '../src/assets/uniques/chest')));
console.log('Serving unique chest icons from the assets/uniques/chest directory');

// Serve unique pant icons from the "src/assets/uniques/pant" directory
app.use('/assets/uniques/pant', express.static(path.join(__dirname, '../src/assets/uniques/pant'))); // New Route
console.log('Serving unique pant icons from the assets/uniques/pant directory');

// Serve background images from the "src/assets" directory
app.use('/assets', express.static(path.join(__dirname, '../src/assets')));

// Serve the main page
app.get('/', (req, res) => {
    console.log('Received request for /');
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
    console.log('Sent index.html');
});

// API endpoint to get items by class
app.get('/api/items/:class', (req, res) => {
    const itemClass = req.params.class;
    console.log(`Request received for class: ${itemClass}`);
    const items = store.getItemsByClass(itemClass) as any[];
    if (items && items.length > 0) {
        console.log(`Number of items found for class ${itemClass}: ${items.length}`);
        res.json(items);
    } else {
        console.error(`No items found for class ${itemClass}`);
        res.status(404).json({ error: `No items found for class ${itemClass}` });
    }
});

// API endpoint to get skills by class
app.get('/api/skills/:class', (req, res) => {
    const skillClass = req.params.class;
    console.log(`Request received for skills of class: ${skillClass}`);
    const skillsPath = path.join(__dirname, `../src/data/${skillClass.toLowerCase()}/${skillClass.toLowerCase()}_skills.json`);
    try {
        const data = fs.readFileSync(skillsPath, 'utf8');
        const skills = JSON.parse(data);
        console.log(`Number of skills found for class ${skillClass}: ${skills.length}`);
        res.json(skills);
    } catch (error) {
        console.error(`Error reading skills file for class ${skillClass}:`, error);
        res.status(500).json({ error: 'Failed to load skills' });
    }
});

// Serve unique items
app.get('/api/unique-items', (req, res) => {
    const uniqueItemsPath = path.join(__dirname, '../src/data/unique_items.json');
    fs.readFile(uniqueItemsPath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading unique items file');
            return;
        }
        res.json(JSON.parse(data));
    });
});

// Serve affixes based on class and gear type
app.get('/api/affixes/:class/:gearType', (req, res) => {
    const { class: className, gearType } = req.params;
    const filePath = path.join(__dirname, '../src/data', className.toLowerCase(), `${className.toLowerCase()}_gear_affixes.json`);

    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf8');
        const affixes = JSON.parse(data);

        // Check if the gearType exists in the affixes data
        if (affixes[gearType]) {
            res.json(affixes[gearType]);
        } else {
            res.status(404).send(`No affixes found for ${gearType} of class ${className}`);
        }
    } else {
        res.status(404).send('Affixes file not found');
    }
});

app.get('/api/base-stats/:class', (req, res) => {
    const className = req.params.class.toLowerCase();
    const baseStatsFilePath = path.join(__dirname, `../src/data/${className}/${className}_base_stats.json`);

    console.log(`Looking for file: ${baseStatsFilePath}`);

    if (fs.existsSync(baseStatsFilePath)) {
        try {
            const data = fs.readFileSync(baseStatsFilePath, 'utf8');
            const baseStats = JSON.parse(data);
            res.json(baseStats);
        } catch (err) {
            console.error('Error parsing JSON:', err);
            res.status(500).send('Error parsing JSON');
        }
    } else {
        res.status(404).send('Base stats not found');
    }
});

app.get('/api/base-attributes', (req, res) => {
    const baseAttributesPath = path.join(__dirname, '../src/data/base_attributes.json');
    if (fs.existsSync(baseAttributesPath)) {
        res.sendFile(baseAttributesPath);
    } else {
        res.status(404).send('Base attributes file not found');
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
