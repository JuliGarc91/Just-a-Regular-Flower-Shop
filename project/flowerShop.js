// I M P O R T S
const { faker } = require("@faker-js/faker"); // Generate data based on user input to Create or update JSON
const lolcats = require("lolcats"); // Importing lolcats mod

// Data
const plantInventory = require('../Data/plantInventory.json');
const customerTransactions = require('../Data/customerTransactions.json') // to use for update and cancel fx

// Alias for console.log to differentiate between debugging code and what's for the user
const inform = console.log; // GLOBAL SCOPE - used to print out info for User

// ID Generator
function generateRandomId(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let id = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    id += characters.charAt(randomIndex);
  }
  return id;
};
generateRandomId(5); // to use for purchase, update and cancel fx - transactionIds are case sensitive

// -------------------------------------------------------- C A S H I E R --------------------------------------------------------

// WORKS as a callback fx WITH purchasePlant fx and purchasePlantResultFX. Works with index.js to read data of plantInventory.json file
function selectPlant(plantInventory, plantName, color) {
  if (
    Array.isArray(plantInventory) &&
    typeof plantName === 'string' &&
    typeof color === 'string'
  ) {
    // All data types are valid, you can proceed with the function.
    // Your code for purchasing the plant can go here.
  } else {
    // Data types are not valid. Return an error message or handle the invalid input as needed.
    inform ('Invalid input data types. Please provide valid data types for all parameters.');
  }

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

// purchasePlant function - allows customer to make a purchase. Calculates total and makes a reciept to print in console. Customer can only purchase one plant species per transaction. Works with index.js to read data of plantInventory.json file and uses selectPlant fx as call back fx.
// ------ Requires user input ------
// all 4 fields are required
// npm run purchasePlant <plantName> <color> <quantity> <customerFullName>
const purchasePlant = (plantInventory, plantName, color, quantity, customerFullName) => {
  if (
    typeof Number(quantity) === 'number' &&
    typeof customerFullName === 'string'
  ) {
    // All data types are valid, you can proceed with the function.
    // Your code for purchasing the plant can go here.
  } else {
    // Data types are not valid. Return an error message or handle the invalid input as needed.
    return 'Invalid input data types. Please provide valid data types for all parameters.';
  }
  const lowerCasePlantName = plantName.toLowerCase(); // makes inputs case insensitive
  color = color.toLowerCase();
  const matchingPlants = plantInventory.filter(plant => ( // can only buy plants in inventory so filters them out
    plant.plantName.toLowerCase() === lowerCasePlantName &&
    plant.dominantColor.toLowerCase() === color
  ));
  if (matchingPlants.length === 0) { // if matchingPlants array from .filter is empty
    if (plantInventory.some(plant => plant.plantName.toLowerCase() === lowerCasePlantName && !plant.inStock)) { // If customer tries to input plant not in stock (inStock value is false):  
      // If no matching plants were found, check if there's any plant in the inventory
      // with a name that matches the lowercased version of the input (lowerCasePlantName),
      // and also ensure that the plant is not in stock (inStock is false).
      return `We apologize we don't have this plant in stock at the moment.\nPlease view our wide selection of local plant varieties by entering npm run inventory`; // If such a plant is found, return this message to user indicating that the plant is not in stock.
       } else if (plantInventory.find(plant => plant.plantName.toLowerCase() === lowerCasePlantName && plant.inStock === true)) { // If customer tries to input plant not in inventory (plantName input doesn't match plantName values in inventory) this if statement 
      // If no matching plants were found in the previous condition, check if there's any plant
      // in the inventory with a name that matches the lowercased input (lowerCasePlantName),
      // and ensure that the plant is in stock (inStock is true).
      return `We apologize, the plant "${plantName}" in the color "${color}" is not available in our inventory.\nPlease view our wide selection of local plant varieties by entering npm run inventory`; // If such a plant is found, return this message indicating that the plant is not in the inventory.
    } else {
      return `We don't carry that plant, only local plants that are compatible with our ecosystem.`; // If no matching or suitable plants are found in the inventory, return this generic message.
    }
  }
  const order = [];
  let addPlantToCart = null;
  for (let i = 0; i < quantity; i++) { // uses quantity input to push this quantity of elements into order array
    addPlantToCart = selectPlant(plantInventory, plantName, color); // call back function where customer selects plant from plantInventory to add to cart that matches plantName and color checked by this code above: const matchingPlants = plantInventory.filter(plant => (plant.plantName.toLowerCase() === lowerCasePlantName && plant.dominantColor.toLowerCase() === color));
    const inStockPlants = addPlantToCart.filter(plant => plant.inStock === true); // makes sure that these plants are inStock (inStock value is true)
    if (inStockPlants.length > 0) {
      order.push(inStockPlants[0]); // If there are in-stock plants, add the first one to the 'order' array.
    } else { // otherwise
      return `We apologize we don't have this plant in stock at the moment.\nPlease view our wide selection of local plant varieties by entering npm run inventory`;
    }
  }
  const totalCostInCents = order.reduce((total, plant) => total + plant.priceInCents, 0); // calculates total to later format a receipt for the user to see in terminal as an output
  return `\n${new Date()}\n------\n\n${lolcats.rainbow("WELCOME To BOTANIC HAVEN!")}\nFind a variety of local plant species that enrich our ecosystem :-)\n\n------\nTransactionID: ${generateRandomId(5)}\nCustomer Full Name: ${customerFullName}\nTotal Cost USD: $${(totalCostInCents/100).toFixed(2)}\n---\nItem(s) Purchased\n---\n${order.map((plant) => {
    return `Plant Name: '${plant.plantName}' Dominant Color: '${plant.dominantColor}' Price In USD: $${(plant.priceInCents / 100).toFixed(2)}\n`;
  }).join('')}\n------\nRefunds or exchanges for same day purchases only\n\n${lolcats.rainbow("THANK YOU FOR YOUR PURCHASE! Have a wonderful day!")}`;
};

//fx that stores customer transactions in customerTransactions.json. Works with index.js to write data onto customerTransactions.json file
let customerTransaction = [];
const purchaseResultFX = (plantInventory, plantName, color, quantity, customerFullName) => {

    // Check for invalid input data types
    if (
      typeof quantity !== 'number' &&
      typeof customerFullName !== 'string'
    ) {
      return {}; // Return an empty object for invalid input (fx run in index.js will not add empty object to customerTransactions.js)
    };
  const lowerCasePlantName = plantName.toLowerCase();
  color = color.toLowerCase();
  const matchingPlants = plantInventory.filter(plant => (
    plant.plantName.toLowerCase() === lowerCasePlantName &&
    plant.dominantColor.toLowerCase() === color
  ));
  if (matchingPlants.length === 0) {
    if (plantInventory.some(plant => plant.plantName.toLowerCase() === lowerCasePlantName && !plant.inStock)) {
      inform ("Error: Out of stock item.");
      return {};
    } else if (plantInventory.find(plant => plant.plantName.toLowerCase() === lowerCasePlantName && plant.inStock === true)) {
      inform ("Error: We do not have that item in the color specified.")
      return {};
    } else {
      inform ("Error: We do not carry item.")
      return {};
    }
  }
  const order = [];
  for (let i = 0; i < quantity; i++) {
    const addPlantToCart = selectPlant(plantInventory, plantName, color); // uses selectPlant as call back to select plant based on customer's input in terminal for purchasePlant fx (the run fx in index.js connects this purchasePlant which takes input from terminal and prints to the console for the user then purchasePlant fx's result get used for purchasePlantResultFX function to write to customerTransactions.json)
    const inStockPlants = addPlantToCart.filter(plant => plant.inStock === true);
    if (inStockPlants.length > 0) {
      order.push(inStockPlants[0]);
    } else {
      inform ('Error: Out of stock item.')
      return {};
    }
  }
  const totalCostInCents = order.reduce((total, plant) => total + plant.priceInCents, 0);
  const itemsPurchased = order.map(plant => ({
    "plantName": plant.plantName,
    "dominantColor": plant.dominantColor,
    "priceInUSD": `$${(plant.priceInCents / 100).toFixed(2)}`
  }));
  customerTransaction.push({
    "transactionId": generateRandomId(5), // uses id geerator as call back
    "customerFullName": customerFullName,
    "totalCostUSD": `$${(totalCostInCents / 100).toFixed(2)}`,
    "itemsPurchased": itemsPurchased
  });
  return customerTransaction;
};

// update FX - allows user to edit a past transaction
// ------ Requires user input ------
// identifier is case sensitive
// to remove your name leave 5th input blank
// npm run update <newPlantName> <newColor> <newQuantity> <identifier> <editCustomerFullName>
const update = (customerTransactions, newPlantName,  newColor, newQuantity, identifier, editCustomerFullName) => {
  const index = customerTransactions.findIndex((transaction) => transaction.transactionId.toLowerCase() === identifier.toLowerCase());

  if (index > -1) {
    customerTransactions[index].transactionId = identifier; // Use customerTransactions[index] instead of transaction[index]
    customerTransactions[index].customerFullName = editCustomerFullName; // Use customerTransactions[index] instead of transaction[index]
    customerTransactions[index].itemsPurchased = customerTransactions[index].itemsPurchased.filter((plant) => plant.plantName.toLowerCase() === newPlantName.toLowerCase());
    
    for (let i = 0; i < newQuantity; i++) {
      const addPlantToCart = selectPlant(plantInventory, newPlantName, newColor);
      const inStockPlants = addPlantToCart.filter(plant => plant.inStock === true);
      if (inStockPlants.length > 0) {
        customerTransactions[index].itemsPurchased.push(inStockPlants[0]);
      } else {
        return `We apologize we don't have this plant in stock at the moment.\nPlease view our wide selection of local plant varieties by entering npm run inventory`;
      }
    }
    
    inform('Transaction Found');
    return customerTransactions[index];
  } else {
    inform('Existing order not found. No action taken');
    return {};
  }
};

// cancel FX - uses case sensitive transaction Id to delete transaction and receive refund
// ------ Requires user input ------
// npm run cancel <transactionId>
const cancel = (customerTransactions, transactionId) => {
  const indexToDelete = customerTransactions.findIndex(transaction => transaction.transactionId === transactionId);

  if (indexToDelete !== -1) {
    customerTransactions.splice(indexToDelete, 1);
    return true; // Indicate success
  }
  return false; // Indicate transaction not found
};


//-------------------------------------------------------- I N V E N T O R Y --------------------------------------------------------
// inventory FX - Shows Shop inventory. Works with index.js to read data of plantInventory.json file
// ------ Requires user input ------
// all fields are required - user must enter an action
// npm run inventory
const inventory = (plantInventory) => {
  return plantInventory.reduce((result, obj, index) => {
    return { ...result, [`id: item${index + 1}`]: obj };
  }, {});
};

// donatePlant FX - Allows user to add a plant of a different color to plantInventory.json or update value of inStock key to true if plant of same color exists in inventory but is out of stock. Works with index.js to write data onto plantInventory.json file
// ------ Requires user input ------
// all fields are required
// npm run donatePlant <plantName> <color>
const donatePlant = (plantInventory, plantName, color) => {
  if (color) { // if user input color proceed with fx
    const lowerCasePlantName = plantName.toLowerCase(); // Convert user input to lowercase to match case-insensitively
    const lowerCaseColor = color.toLowerCase();
    const matchingPlants = plantInventory.filter(plant => ( // Check if any plant in the inventory matches the given plantName and color
        plant.plantName.toLowerCase() === lowerCasePlantName &&
        plant.dominantColor.toLowerCase() === lowerCaseColor
        ));        
        if (matchingPlants.length > 0) { // Matching plant(s) found
            matchingPlants.forEach(plant => {
                if (plant.inStock === false) // but it is not in stock (inStock value is false)
                {plant.inStock = true; // Change inStock to true
                inform(`------\nThe plant "${plantName}" with color "${color}" is now back in stock.\n${lolcats.rainbow("THANK YOU kindly for your contribution")}!\nPlease come again ${lolcats.rainbow("<(^_^)>")}\n------`) // plant of the given color was not in stock but is now instock after contribution
            } else inform(`------\nThe plant "${plantName}" with color "${color}" is in stock.\n${lolcats.rainbow("THANK YOU kindly for your contribution")}!\nPlease come again ${lolcats.rainbow("<(^_^)>")}\n------`) // plant of given color is in stock and still in stock after contribution
        });
    } else if (plantInventory.find(plant => (plant.plantName.toLowerCase() === lowerCasePlantName && plant.dominantColor.toLowerCase() !== lowerCaseColor))) { // If the plant name matches but color doesn't match any plant in stock then add it to inventory (plant species of new color, so cool!)
        const plantDonated = {
            plantName: plantName.charAt(0).toUpperCase() + plantName.slice(1),
            dominantColor: color.charAt(0).toUpperCase() + color.slice(1), // Set the color property as provided (capitalize first letter)
            priceInCents: faker.number.int({ min: 100, max: 4500 }), // generates price of dontated plant
            inStock: true
        };
        plantInventory.push(plantDonated); // adds it to inventory
        inform(`------\nThe plant "${plantName}" with color "${color}" has been added to the inventory!\n${lolcats.rainbow("THANK YOU kindly for your contribution")}!\nPlease come again ${lolcats.rainbow("<(^_^)>")}\n------`);
    } else { // if it doesn't match plant name already in inventory we don't take it as a donation
        inform (`We prioritize the preservation of our local ecosystem;\nwe kindly request that only locally-sourced plants be introduced.\n------\nEnter "npm run inventory" to see a list of the plant species we carry.\n${lolcats.rainbow("THANK YOU kindly for your contribution")}!\nPlease come again ${lolcats.rainbow("<(^_^)>")}\n------`);
    }
    return plantInventory; // updated inventory
  } else {
    inform (`Oopsie! Must include ${lolcats.rainbow("plant color")}.`); //otherwise user must input color
    return plantInventory; // inventory w/o changes
  } 
};

// showItem FX - shows items of given plantName. Works with index.js to read data of plantInventory.json file
// ------ Requires user input ------
// npm run showItem <plantName> <inStock> (inStock input is optional and allows user to view if item is in stock or not instock by inputting true or false)
const showItem = (plantInventory, plantName, inStock) => {
  const lowerCasePlantName = plantName.toLowerCase(); // Makes user input case insensitive
  if (inStock === undefined) { // If the user didn't make an input
    return plantInventory.filter(plant => plant.plantName.toLowerCase() === lowerCasePlantName);
  } else {
    if (inStock.toLowerCase() === "true") {
      inStock = true; // Interpret user input as a boolean
    } else if (inStock.toLowerCase() === "false") {
      inStock = false; // Interpret user input as a boolean
    }
    let filteredItems = plantInventory.filter(plant => plant.plantName.toLowerCase() === lowerCasePlantName && plant.inStock === inStock).length !== 0 ? 
      plantInventory.filter(plant => plant.plantName.toLowerCase() === lowerCasePlantName && plant.inStock === inStock) : "There are no items with the given criteria to display. Please try searching again with valid inputs: npm run showItem <plantName> <inStock>";

    return filteredItems;
  }
};


// Exporting functions to index.js so user can input and run fx from terminal
// also exporting to test file
module.exports = {
  generateRandomId,
  inventory,
  donatePlant,
  showItem,
  selectPlant,
  purchasePlant,
  purchaseResultFX,
  update,
  cancel
};
