// --- Import NPM Packages ---
const lolcats = require("lolcats"); // importing lolcats mod (not supported after changing package.json line 6 to "type": "module")
//const chalkAnimation = require('chalk-animation'); // gives error message code 'ERR_REQUIRE_ESM' to fix add to package.json "type": "module"
const { faker } = require("@faker-js/faker");

//import chalkAnimation from 'chalk-animation'; // to import chalk-animation w/o error
//import lolcats from 'lolcats'; // to import lolcats w/o error after changing package.json
//import { faker } from '@faker-js/faker'; // to import faker w/o error after changing package.json
// --- Importing helper functions ---
const { readJSONFile } = require('./src/helpers')

// Use the imported functions in your code
 // Import the readJSONFile and writeJSONFilefunctions from the helpers.js file into index.js.

// --- Import Data ---
const flowerInventory = readJSONFile('./data', 'flowerInventory.json');
console.log (flowerInventory);

// --- Test if import of npm packages worked ---
//lolcats.print('Lorem ipsum dolor sit amet')
//chalkAnimation.rainbow('Lorem ipsum dolor sit amet');
const material = {
    material: faker.commerce.productMaterial(), // generates string
};
console.log (material); // generates object

const run = () => {};

run ();