// --- Importing helper functions ---
const { readJSONFile, writeJSONFile } = require('./project/helpers');  // Import the readJSONFile and writeJSONFilefunctions from the helpers.js file into index.js.
// --- Import Data ---
const plantInventory = readJSONFile('./data', 'plantInventory.json');
// console.log (plantInventory); // test if data imported successfully
const { inventory, donatePlant, showItem, purchasePlant, update, cancel } = require('./project/flowerShop');
const { selectPlant } = require('./project/cashier');


// --- R U N Function ---
// create an alias called inform to store the console.log function
// When providing user feedback in the terminal use `inform`
// When developing/debugging use `console.log`

const inform = console.log;

function run() {
  const action = process.argv[2]; // Command stored in first index
  const plant = process.argv[3]; //Customer fx arg 1
  const color = process.argv[4]; //Customer fx arg 2 
  const inStock = process.argv[4]; //Customer fx arg 2
  const quantity = process.argv[5]; // Customer fx arg 3
  const customer = process.argv[6]; // Customer fx arg 4

//writToFile, will hold a boolean value that acts as a toggle. The other variable,updateAnimals, will hold an array of the updated or created animals
let writeToPlantInventory = false;
let updatedPlants = [];
let writeToCustomerTransactions = false;
let customerTransactions = [];



  switch (action) {
    case 'inventory': // shows entire store inventory
      const viewInventory = inventory(plantInventory)
      inform(viewInventory)
      inform(`Customer Input:\n------\nAction: ${viewInventory}`);
      break;

    case 'donatePlant': // adds new plant donation to store inventory (if species is local)
    updatedPlants = donatePlant(plantInventory, plant, color);
    inform(`Customer Input:\n------\nAction: ${action} Plant: ${plant} Color: ${color}`);
    writeToPlantInventory = true;
    break;

    case 'showItem': // shows item based on name, if it doesn't exist it should show it doesn't exist, create it while returning "Not available, check back later"
    const viewInventoryItem = showItem(plantInventory, plant, inStock);
    inform(viewInventoryItem);  
    inform(`\nCustomer Input:\n------\nAction: ${action} Plant: ${plant} In Stock? ${inStock}`);
    break;

    case 'purchasePlant':
        const totalCost = purchasePlant(plantInventory, plant, color, quantity, customer);
        inform(totalCost);
        inform(`Customer Input:\n------\nAction: ${action} Plant: ${plant} Color: ${color} Quantity: ${quantity} Full Name: ${customer}`);
      break; 
      // in progress - write fx for this in flowerShop.js
    case 'update':
      writeToCustomerTransactions = true;
        inform(`Customer Input:\n------\nAction: ${action} Plant: ${plant}`);
        // Add logic to update customer transactions (not provided in the code)
      break;
    case 'cancel':
        inform(`Customer Input:\n------\nAction: ${action} Plant: ${plant}`);
      break;
     default:
      inform('There was an error.'); // error input (invalid argument)
  }
  if (writeToPlantInventory) { // At the end of the function, we now need write logic to check the writeToFile variable. If the variable is true, we update the animals.json file with the new animal.
    writeJSONFile('./data', 'plantInventory.json', updatedPlants);
  } else if (writeToCustomerTransactions) {
    writeJSONFile('./data', 'customerTransactions.js', customerTransactions);
  }
};

run();