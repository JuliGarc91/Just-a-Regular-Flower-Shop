// --- Use to write receipts
const { readJSONFile, writeJSONFile } = require('../project/helpers');  // Import the readJSONFile and writeJSONFilefunctions from the helpers.js file into index.js.
// import
const { purchasePlant, update, cancel } = require('../project/flowerShop');

// ------ C A S H I E R ------

function selectPlant(plantInventory, plantName, color) {
  const lowerCasePlantName = plantName.toLowerCase();
  const lowerCaseColor = color.toLowerCase();
  const matchingPlants = plantInventory.filter(plant => (
    plant.plantName.toLowerCase() === lowerCasePlantName &&
    plant.dominantColor.toLowerCase() === lowerCaseColor &&
    plant.inStock === true
  ));
  
  if (matchingPlants.length > 0) {
    const plant = {
      plantName: matchingPlants[0].plantName,
      dominantColor: matchingPlants[0].dominantColor,
      priceInCents: matchingPlants[0].priceInCents,
      inStock: matchingPlants[0].inStock,
    };
    return [plant];
  } else {
    return [];
  }
};
let writeToCustomerTransactions = false
const receipt = () => {
  writeToCustomerTransactions = true;
  // use total from other purchasePlant fx
  // use selectPlant fx
  // export should have transaction id, name, priceInCents
  // generate transaction id
  if (writeToCustomerTransactions) { // At the end of the function, we now need write logic to check the writeToFile variable. If the variable is true, we update the animals.json file with the new animal.
    writeJSONFile('./data', 'customerTransactions.js', customerTransactions); // using writesync export to customerTransaction.JSON to store so fx update and fx cancel can use data stored here using readsync

  }
}

// ------ Thank you, come again! ------




module.exports = {
  selectPlant,
  receipt
}