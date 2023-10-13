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
  const bundle = process.argv[4];
  switch (action) {
    case 'Inventory': // shows entire store inventory
      inform(action);
      break;
    case 'donatePlant': // adds new plant donation to store inventory
      inform(action, plant);
      break;
    case 'showItem': // shows item based on name, if it doesn't exist it should show it doesn't exist, create it while returning "Not available, check back later"
      inform(action, plant);
      break;
    case 'newOrder':
      inform(action, plant);
      break;
    case 'update':
      inform(action, plant);
      break;
    case 'delete':
      inform(action);
      break;
    case 'bundle':
      inform(action, bundle); // customer can request an order of 3 plants for a discounted price
      break;
    default:
      inform('There was an error.'); // error input (invalid argument)
  }
}

run();