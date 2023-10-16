// I M P O R T S
const { faker } = require("@faker-js/faker"); // Generate data based on user input to Create or update JSON
const lolcats = require("lolcats"); // Importing lolcats mod

// Data
const plantInventory = require('../Data/plantInventory.json');
const customerTransactions = require('../Data/customerTransactions.json')

// ID generator
const inform = console.log; // GLOBAL SCOPE - used to print out info for User
function generateRandomId(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let id = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    id += characters.charAt(randomIndex);
  }
  return id;
};
generateRandomId(5); // to use for purchase fx

// ------ C A S H I E R ------

// WORKS as a callback fx WITH purchasePlant fx and purchasePlantResultFX
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

// purchasePlant function - allows customer to make a purchase. Calculates total and makes a reciept to print in console. Customer can only purchase one plant species per transaction
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
  return `\n${new Date()}\n------\n\n${lolcats.rainbow("WELCOME To Our Botanic Shop!")}\nFind a variety of local plant species that enrich our ecosystem :-)\n\n------\nTransactionID: ${generateRandomId(5)}\nCustomer Full Name: ${customerFullName}\nTotal Cost USD: $${(totalCostInCents/100).toFixed(2)}\n---\nItem(s) Purchased\n---\n${order.map((plant) => {
    return `Plant Name: '${plant.plantName}' Dominant Color: '${plant.dominantColor}' Price In USD: $${(plant.priceInCents / 100).toFixed(2)}\n`;
  }).join('')}\n------\nRefunds or exchanges for same day purchases only\n\n${lolcats.rainbow("THANK YOU FOR YOUR PURCHASE! Have a wonderful day!")}`;
};

//fx that stores customer transactions in customerTransaction.json 
let updatedCustomerTransactions = [];
const purchaseResultFX = (plantInventory, plantName, color, quantity, customerFullName) => {

  if (
    typeof plantName !== 'string' ||
    typeof color !== 'string' ||
    typeof quantity !== 'number' ||
    typeof customerFullName !== 'string'
  ) {
    return; // Return an empty object for invalid input
  } else {

  const lowerCasePlantName = plantName.toLowerCase();
  color = color.toLowerCase();
  const matchingPlants = plantInventory.filter(plant => (
    plant.plantName.toLowerCase() === lowerCasePlantName &&
    plant.dominantColor.toLowerCase() === color
  ));
  if (matchingPlants.length === 0) {
    if (plantInventory.some(plant => plant.plantName.toLowerCase() === lowerCasePlantName && !plant.inStock)) {
      return {
        "transactionId": generateRandomId(5),
        "customerFullName": customerFullName,
        "totalCostUSD": "$0.00",
        "itemsPurchased": []
      };
    } else if (plantInventory.find(plant => plant.plantName.toLowerCase() === lowerCasePlantName && plant.inStock === true)) {
      return {
        "transactionId": generateRandomId(5),
        "customerFullName": customerFullName,
        "totalCostUSD": "$0.00",
        "itemsPurchased": []
      };
    } else {
      return {
        "transactionId": generateRandomId(5),
        "customerFullName": customerFullName,
        "totalCostUSD": "$0.00",
        "itemsPurchased": []
      };
    }
  }
  const order = [];
  for (let i = 0; i < quantity; i++) {
    const addPlantToCart = selectPlant(plantInventory, plantName, color);
    const inStockPlants = addPlantToCart.filter(plant => plant.inStock === true);
    if (inStockPlants.length > 0) {
      order.push(inStockPlants[0]);
    } else {
      return {
        "transactionId": generateRandomId(5),
        "customerFullName": customerFullName,
        "totalCostUSD": "$0.00",
        "itemsPurchased": []
      };
    }
  }
  const totalCostInCents = order.reduce((total, plant) => total + plant.priceInCents, 0);
  const itemsPurchased = order.map(plant => ({
    "plantName": plant.plantName,
    "dominantColor": plant.dominantColor,
    "priceInUSD": `$${(plant.priceInCents / 100).toFixed(2)}`
  }));

  updatedCustomerTransactions.push({
    "transactionId": generateRandomId(5),
    "customerFullName": customerFullName,
    "totalCostUSD": `$${(totalCostInCents / 100).toFixed(2)}`,
    "itemsPurchased": itemsPurchased
  });
  return updatedCustomerTransactions;
}
};

//--- I N V E N T O R Y FX ---
// npm run inventory
const inventory = (plantInventory) => {
  return plantInventory.reduce((result, obj, index) => {
    return { ...result, [`id: item${index + 1}`]: obj };
  }, {});
};

// donatePlant function
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

// showItem function
// npm run showItem <plantName> <inStock>
const showItem = (plantInventory, plantName, inStock) => {
  const lowerCasePlantName = plantName.toLowerCase();

  if (inStock.toLowerCase() === "true" || inStock.toLowerCase() === "in stock") { // input for 3rd parameter can be "true" or "in stock" to view plantName input that's in stock
    inStock = true; // interprets user input as boolean
  } else if (inStock === "false" || inStock === "not in stock") { // input for 3rd parameter can be "false" or "not in stock" to view plantName input that's not in stock
    inStock = false;
  }
  return plantInventory.filter(plant => plant.plantName.toLowerCase() === lowerCasePlantName && (inStock === undefined || plant.inStock === inStock));
};



const update = () => {};
const cancel = () => {};

// Exporting functions
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
