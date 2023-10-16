// --- Importing helper functions ---
const { readJSONFile, writeJSONFile } = require('./project/helpers');

// Import the readJSONFile and writeJSONFile functions from the helpers.js file into index.js.

// --- Import Data ---
const plantInventory = readJSONFile('./data', 'plantInventory.json');
const customerTransactions = readJSONFile('./data', 'plantInventory.json');

// console.log (plantInventory); // test if data imported successfully
const { generateRandomId ,inventory, donatePlant, showItem, selectPlant, purchasePlant, purchaseResultFX, update, cancel } = require('./project/flowerShop');

// --- R U N Function ---
// create an alias called inform to store the console.log function
// When providing user feedback in the terminal use `inform`
// When developing/debugging use `console.log`

const inform = console.log;


// let updatedCustomerTransactions = [];
// const purchaseResultFX = (plantInventory, plantName, color, quantity, customerFullName) => {
//   const lowerCasePlantName = plantName.toLowerCase();
//   color = color.toLowerCase();

//   const matchingPlants = plantInventory.filter(plant => (
//     plant.plantName.toLowerCase() === lowerCasePlantName &&
//     plant.dominantColor.toLowerCase() === color
//   ));

//   if (matchingPlants.length === 0) {
//     if (plantInventory.some(plant => plant.plantName.toLowerCase() === lowerCasePlantName && !plant.inStock)) {
//       return {
//         "transactionId": generateRandomId(5),
//         "customerFullName": customerFullName,
//         "totalCostUSD": "$0.00",
//         "itemsPurchased": []
//       };
//     } else if (plantInventory.find(plant => plant.plantName.toLowerCase() === lowerCasePlantName && plant.inStock === true)) {
//       return {
//         "transactionId": generateRandomId(5),
//         "customerFullName": customerFullName,
//         "totalCostUSD": "$0.00",
//         "itemsPurchased": []
//       };
//     } else {
//       return {
//         "transactionId": generateRandomId(5),
//         "customerFullName": customerFullName,
//         "totalCostUSD": "$0.00",
//         "itemsPurchased": []
//       };
//     }
//   }

//   const order = [];
//   for (let i = 0; i < quantity; i++) {
//     const addPlantToCart = selectPlant(plantInventory, plantName, color);
//     const inStockPlants = addPlantToCart.filter(plant => plant.inStock === true);
//     if (inStockPlants.length > 0) {
//       order.push(inStockPlants[0]);
//     } else {
//       return {
//         "transactionId": generateRandomId(5),
//         "customerFullName": customerFullName,
//         "totalCostUSD": "$0.00",
//         "itemsPurchased": []
//       };
//     }
//   }

//   const totalCostInCents = order.reduce((total, plant) => total + plant.priceInCents, 0);

//   const itemsPurchased = order.map(plant => ({
//     "plantName": plant.plantName,
//     "dominantColor": plant.dominantColor,
//     "priceInUSD": `$${(plant.priceInCents / 100).toFixed(2)}`
//   }));

//   updatedCustomerTransactions.push({
//     "transactionId": generateRandomId(5),
//     "customerFullName": customerFullName,
//     "totalCostUSD": `$${(totalCostInCents / 100).toFixed(2)}`,
//     "itemsPurchased": itemsPurchased
//   });
//   return updatedCustomerTransactions;
// };

function run() {
  let action = process.argv[2]; // Command stored in the first index
  let plantName = process.argv[3]; // Customer fx arg 1
  let color = process.argv[4]; // Customer fx arg 2
  let inStock = process.argv[4]; // Customer fx arg 2
  let quantity = process.argv[5]; // Customer fx arg 3
  let customerFullName = process.argv[6]; // Customer fx arg 4

  let writeToPlantInventory = false;
  let updatedPlants = [];
  let writeToCustomerTransactions = false;
  

  switch (action) {
    case 'inventory': // shows the entire store inventory
      const viewInventory = inventory(plantInventory);
      inform(viewInventory);
      inform(`Customer Input:\n------\nAction: ${action}`);
      break;

    case 'donatePlant': // adds a new plant donation to the store inventory (if species is local)
      updatedPlants = donatePlant(plantInventory, plantName, color);
      inform(`Customer Input:\n------\nAction: ${action} Plant: ${plantName} Color: ${color}`);
      writeToPlantInventory = true;
      break;

    case 'showItem': // shows an item based on name, if it doesn't exist, it should show it doesn't exist, create it while returning "Not available, check back later"
      const viewInventoryItem = showItem(plantInventory, plantName, inStock);
      inform(viewInventoryItem);
      inform(`\nCustomer Input:\n------\nAction: ${action} Plant: ${plantName} In Stock? ${inStock}`);
      break;

    case 'purchasePlant': // customer can purchase 1 or more plants of a type per transaction
      const receipt = purchasePlant(plantInventory, plantName, color, quantity, customerFullName);
      // Add the code to extract transaction details and populate customerTransactions
      updatedCustomerTransactions = (purchaseResultFX(plantInventory, plantName, color, quantity, customerFullName));
      inform(receipt);
      inform(`Customer Input:\n------\nAction: ${action} Plant: ${plantName} Color: ${color} Quantity: ${quantity} Full Name: ${customerFullName}`);
      writeToCustomerTransactions = true;
      break;

    case 'update':
      writeToCustomerTransactions = true;
      inform(`Customer Input:\n------\nAction: ${action} Plant: ${plantName}`);
      // Add logic to update customer transactions (not provided in the code)
      break;

    case 'cancel':
      inform(`Customer Input:\n------\nAction: ${action} Plant: ${plantName}`);
      break;

    default:
      inform('There was an error.'); // error input (invalid argument)
  }

// fix so it's not overwriting data in customerTransactions.json
  if (writeToPlantInventory) {
    writeJSONFile('./data', 'plantInventory.json', updatedPlants); // At the end of the function, we now need write logic to check the writeToPlantInventory variable. If the variable is true, we update the plantInventory.json file with the new plant data.
  } 
  if (writeToCustomerTransactions) {
    let existingData = readJSONFile('./data', 'customerTransactions.json'); // Read the existing data from customerTransactions.json
    if (!Array.isArray(existingData)) {     // Ensure that existingData is an array; if not, initialize it as an empty array
      existingData = [];
    }
    existingData = existingData.concat(updatedCustomerTransactions);     // Merge the existing data with the new transactions
    writeJSONFile('./data', 'customerTransactions.json', existingData);     // Update customerTransactions.json with the merged data
  }
};

run();