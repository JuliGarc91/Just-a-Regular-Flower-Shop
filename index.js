// --- Import NPM Packages ---
const lolcats = require("lolcats"); // importing lolcats mod 
const { faker } = require("@faker-js/faker"); // importing faker to generate data based on customer inputs

// --- Importing helper functions ---
const { readJSONFile } = require('./project/helpers');  // Import the readJSONFile and writeJSONFilefunctions from the helpers.js file into index.js.

// --- Import Data ---
const flowerInventory = readJSONFile('./data', 'plantInventory.json');
console.log (flowerInventory);

// --- Test if import of npm packages worked ---
//lolcats.print('Lorem ipsum dolor sit amet')
//chalkAnimation.rainbow('Lorem ipsum dolor sit amet');
const material = {
    material: faker.commerce.productMaterial(), // generates string
};
const { inspect } = require("node:util"); // prints out nested objects
lolcats.print(inspect(material)); // generates rainbow object

// --- R U N Function ---
// create an alias called inform to store the console.log function
// When providing user feedback in the terminal use `inform`
// When developing/debugging use `console.log`
const inform = console.log;

function run() {
  const action = process.argv[2];
  const plant = process.argv[3];
  switch (action) {
    case 'showInventory':
      inform(action);
      break;
    case 'donateNewItem':
      inform(action, plant);
      break;
    case 'showItem':
      inform(action, plant);
      break;
    case 'createOrder':
      inform(action, plant);
      break;
    case 'updateOrder':
      inform(action, plant);
      break;
    case 'deleteOrder':
      inform(action);
      break;
    default:
      inform('There was an error.');
  }
}

run();