// --- Importing helper functions ---
const { readJSONFile, writeJSONFile } = require('./project/helpers');

// Import the readJSONFile and writeJSONFile functions from the helpers.js file into index.js.

// --- Import Data ---
const plantInventory = readJSONFile('./data', 'plantInventory.json');
const customerTransactions = readJSONFile('./Data','customerTransactions.json') // for purchasePlant, update, and cancel fx

// console.log (plantInventory); // test if data imported successfully
const { inventory, donatePlant, showItem, purchasePlant, purchaseResultFX, update, cancel, selectPlant } = require('./project/flowerShop');

// Alias called inform to store the console.log function
// When providing user feedback in the terminal use `inform`
// When developing/debugging use `console.log`
const inform = console.log;


// --- R U N Function ---
function run() {
  let action = process.argv[2]; // Command stored in the first index
  let plantName = process.argv[3]; // Customer fx arg 1
  let color = process.argv[4];  // Customer fx arg 2
  let quantity = process.argv[5]; // Customer fx arg 3
  // let identifier = process.argv[6]
  // let customerFullName = process.argv[6]; // Customer fx arg 4

  let writeToPlantInventory = false;
  let updatedPlants = [];
  let writeToCustomerTransactions = false;
  let updatedCustomerTransaction = [];
  

  switch (action) {
    case 'inventory': // shows the entire store inventory
      const viewInventory = inventory(plantInventory);
      inform(viewInventory);
      inform(`Customer Input:\n------\nAction: ${action}`);
      console.log('error 1')
      break;

    case 'donatePlant': // adds a new plant donation to the store inventory (if species is local)
      updatedPlants = donatePlant(plantInventory, plantName, color);
      inform(`Customer Input:\n------\nAction: ${action} Plant: ${plantName} Color: ${color}`);
      writeToPlantInventory = true;
      console.log('error 2')
      break;

    case 'showItem': // shows an item based on name, if it doesn't exist, it should show it doesn't exist, create it while returning "Not available, check back later"
      const viewInventoryItem = showItem(plantInventory, plantName, process.argv[4]);
      inform(viewInventoryItem);
      inform(`\nCustomer Input:\n------\nAction: ${action} Plant: ${plantName} In Stock? ${process.argv[4]}`);
      console.log('error 3')
      break;

    case 'purchasePlant': // customer can purchase 1 or more plants of a type per transaction
      const receipt = purchasePlant(plantInventory, plantName, color, quantity, customerFullName);
      // Add the code to extract transaction details and populate customerTransactions
      customerTransaction = (purchaseResultFX(plantInventory, plantName, color, quantity, customerFullName));
      inform(receipt);
      inform(`Customer Input:\n------\nAction: ${action} Plant: ${plantName} Color: ${color} Quantity: ${quantity} Full Name: ${customerFullName}`);
      writeToCustomerTransactions = true;
      console.log('error 4')
      break;

    case 'update':
      updatedCustomerTransaction = update(customerTransactions, plantName,  color, quantity, process.argv[6], process.argv[7]) // process.argv[7] input is for editing or entering customer name
      inform(`Customer Input:\n------\nAction: ${action} Plant: ${plantName} Color: ${color} Quantity: ${quantity}, transactionId: ${process.argv[6]}, Full Name: ${process.argv[7]}`);
      writeToCustomerTransactions = true;
      console.log('error 5')
      break;





      
    // case 'update':
    // const updatedCustomerTransaction = update(customerTransactions, plantName,  color, quantity, identifier, process.argv[7]) // process.argv[7] input is for editing or entering customer name
    //   writeToCustomerTransactions = true;
    //   inform(`Customer Input:\n------\nAction: ${action} Plant: ${plantName}`);
    //   // Add logic to update customer transactions (not provided in the code)
    //   break;
    // case 'update':

    case 'cancel':
      inform(`Customer Input:\n------\nAction: ${action} Plant: ${plantName}`);
      console.log('error 6')
      break;

    default:
      inform('There was an error.'); // error input (invalid argument)
  }





// uses fx on helpers.js
//   if (writeToPlantInventory) {
//     writeJSONFile('./data', 'plantInventory.json', updatedPlants); // At the end of the function, we now need write logic to check the writeToPlantInventory variable. If the variable is true, we update the plantInventory.json file with the new plant data.
//   } 
//   if (writeToCustomerTransactions) { // for purchasePlants and purchasePlantsResultFX
//     let existingData = readJSONFile('./data', 'customerTransactions.json'); // Read the existing data from customerTransactions.json
//     if (!Array.isArray(existingData)) {     // Ensure that existingData is an array; if not, initialize it as an empty array
//       existingData = [];
//     } // for purchasePlants and purchasePlantsResultFX
//     if (typeof customerTransaction === "object" && Object.keys(customerTransaction).length !== 0) { // checks if variable contains object that is not empty:  Object.keys(updatedCustomerTransaction).length !== 0
//       existingData = existingData.concat(customerTransaction); // Merge the existing data with the new transactions
//       writeJSONFile('./data', 'customerTransactions.json', existingData); // Update customerTransactions.json with the merged data
//     }  // for update
//     // if (typeof updatedCustomerTransaction === "object" && updatedCustomerTransaction.transactionId === process.argv[6]) {
//     //   // Check if updatedCustomerTransaction is an object and has a transactionId matching the identifier.
//     //   if (existingData[process.argv[6]]) {
//     //     // Check if the identifier exists in the existing data.
//     //     existingData[process.argv[6]] = updatedCustomerTransaction; // Update the data at the identifier.  
//     //     writeJSONFile('./data', 'customerTransactions.json', existingData); // Update customerTransactions.json with the merged data. 
//     //     inform ("Data successfully updated.");
//     //   }
//     // }
//     existingData[process.argv[6]] = updatedCustomerTransaction;
// //    existingData = existingData.concat(customerTransaction); // Merge the existing data with the new transactions
//     writeJSONFile('./data', 'customerTransactions.json', existingData); // Update customerTransactions.json with the merged data
//   }
// };



// if (writeToCustomerTransactions) { // for purchasePlants and purchasePlantsResultFX
//   let existingData = readJSONFile('./data', 'customerTransactions.json'); // Read the existing data from customerTransactions.json
//   if (!Array.isArray(existingData)) {     // Ensure that existingData is an array; if not, initialize it as an empty array
//     existingData = [];
//   } 
// existingData[process.argv[6]] = updatedCustomerTransaction;
// //    existingData = existingData.concat(customerTransaction); // Merge the existing data with the new transactions
//     writeJSONFile('./data', 'customerTransactions.json', existingData); // Update customerTransactions.json with the merged data
//   }}

const customerTransactionIdToUpdate = process.argv[6];

if (writeToCustomerTransactions) {
  let existingData = readJSONFile('./data', 'customerTransactions.json');

  // Find the index of the transaction to update
  const indexToUpdate = existingData.findIndex(transaction => transaction.itemsPurchased === customerTransactionIdToUpdate);

  if (indexToUpdate !== -1) {
    // Update the object properties as needed
    existingData[indexToUpdate].plantName = plantName;
    existingData[indexToUpdate].dominantColor = color;
    existingData[indexToUpdate].quantity = selectPlant(plantInventory, plantName, color) * quantity;
    existingData[transaction].customerFullName = process.argv[7]; // Assuming it should be updated as well
    }
    // Write the modified array back to the JSON file
    writeJSONFile('./data', 'customerTransactions.json', existingData);
    inform("Data successfully updated.");
  } else {
    inform("Transaction not found for the provided transactionId.");
  }
}

  run();