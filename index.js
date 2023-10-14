// --- Importing helper functions ---
const { readJSONFile, writeJSONFile } = require('./project/helpers');  // Import the readJSONFile and writeJSONFilefunctions from the helpers.js file into index.js.
// --- Import Data ---
const plantInventory = readJSONFile('./data', 'plantInventory.json');
// console.log (plantInventory); // test if data imported successfully
const { inventory, donatePlant, showItem, newOrder, update, cancel, bundle } = require('./project/flowerShop');

// --- R U N Function ---
// create an alias called inform to store the console.log function
// When providing user feedback in the terminal use `inform`
// When developing/debugging use `console.log`

const inform = console.log;

function run() {
  const action = process.argv[2];
  const plant = process.argv[3];
  const bundle = process.argv[4];

//writToFile, will hold a boolean value that acts as a toggle. The other variable,updateAnimals, will hold an array of the updated or created animals
let writeToFile = false;
let updatedPlants = [];


  switch (action) {
    case 'inventory': // shows entire store inventory
      const viewInventory = inventory(plantInventory)
      inform(`User Input\n------\nAction: ${viewInventory}`);
      break;
    case 'donatePlant': // adds new plant donation to store inventory (if species is local)
    updatedPlants = donatePlant(plantInventory, plant);
    writeToFile = true;
    case 'showItem': // shows item based on name, if it doesn't exist it should show it doesn't exist, create it while returning "Not available, check back later"
      inform(`User Input\n------\nAction: ${action} Plant: ${plant}`);
      break;
    case 'newOrder':
        inform(`User Input\n------\nAction: ${action} Plant: ${plant}`);
      break;
    case 'update':
        writeToFile = true;
        inform(`User Input\n------\nAction: ${action} Plant: ${plant}`);
      break;
    case 'cancel':
        inform(`User Input\n------\nAction: ${action} Plant: ${plant}`);
      break;
    case 'bundle':
      inform(action, bundle); // customer can request an order of 3 plants for a discounted price
      break;
    default:
      inform('There was an error.'); // error input (invalid argument)
  }
  if (writeToFile) { // At the end of the function, we now need write logic to check the writeToFile variable. If the variable is true, we update the animals.json file with the new animal.
    writeJSONFile('./data', 'plantInventory.json', updatedPlants);
  }
}

run();