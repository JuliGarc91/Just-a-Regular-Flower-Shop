// I M P O R T S
const { faker } = require("@faker-js/faker"); // Generate data based on user input to Create or update JSON
const lolcats = require("lolcats"); // Importing lolcats mod

// Data
const plantInventory = require('../Data/plantInventory.json');

// Cashier functions
const { selectPlant } = require('./cashier');

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

// inventory function
const inventory = (plantInventory) => {
  return plantInventory.reduce((result, obj, index) => {
    return { ...result, [`id: item${index + 1}`]: obj };
  }, {});
};

// donatePlant function
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
                if (plant.inStock === false) 
                {plant.inStock = true; // Change inStock to true
                inform(`------\nThe plant "${plantName}" with color "${color}" is now back in stock.\n${lolcats.rainbow("THANK YOU kindly for your contribution")}!\nPlease come again ${lolcats.rainbow("<(^_^)>")}\n------`) // plant of the given color was not in stock but is now instock after contribution
            } else inform(`------\nThe plant "${plantName}" with color "${color}" is in stock.\n${lolcats.rainbow("THANK YOU kindly for your contribution")}!\nPlease come again ${lolcats.rainbow("<(^_^)>")}\n------`) // plant of given color is in stock and still in stock after contribution
        });
    } else if (plantInventory.find(plant => (plant.plantName.toLowerCase() === lowerCasePlantName && plant.dominantColor.toLowerCase() !== lowerCaseColor))) { // If the plant name matches but color doesn't match any plant in stock then add it to inventory (plant species of new color, so cool!)
        const plantDonated = {
            plantName: plantName.charAt(0).toUpperCase() + plantName.slice(1),
            dominantColor: color.charAt(0).toUpperCase() + color.slice(1), // Set the color property as provided (capitalize first letter)
            priceInCents: faker.number.int({ min: 100, max: 4500 }),
            inStock: true
        };
        plantInventory.push(plantDonated);
        inform(`------\nThe plant "${plantName}" with color "${color}" has been added to the inventory!\n${lolcats.rainbow("THANK YOU kindly for your contribution")}!\nPlease come again ${lolcats.rainbow("<(^_^)>")}\n------`);
    } else { // if it doesn't match plant name already in inventory we don't take it as a donation
        inform (`------\nEnter "npm run inventory" to see a list of the plant species we carry.\nWe prioritize the preservation of our local ecosystem,\nand we kindly request that only locally-sourced plants be introduced.\n${lolcats.rainbow("THANK YOU kindly for your contribution")}!\nPlease come again ${lolcats.rainbow("<(^_^)>")}\n------`);
    }
    return plantInventory; // updated inventory
  } else {
    inform (`Oopsie! Must include ${lolcats.rainbow("plant color")}.`); //otherwise user must input color
    return plantInventory; // inventory w/o changes
  } 
};

// showItem function
const showItem = (plantInventory, plantName, inStock) => {
  const lowerCasePlantName = plantName.toLowerCase();

  if (inStock.toLowerCase() === "true" || inStock.toLowerCase() === "in stock") {
    inStock = true;
  } else if (inStock === "false" || inStock === "not in stock") {
    inStock = false;
  }
  return plantInventory.filter(plant => plant.plantName.toLowerCase() === lowerCasePlantName && (inStock === undefined || plant.inStock === inStock));
};

// purchasePlant function
const purchasePlant = (plantInventory, plantName, color, quantity, customerFullName) => {
  const lowerCasePlantName = plantName.toLowerCase();
  color = color.toLowerCase();
  
  const matchingPlants = plantInventory.filter(plant => (
    plant.plantName.toLowerCase() === lowerCasePlantName &&
    plant.dominantColor.toLowerCase() === color
  ));

  if (matchingPlants.length === 0) {
    if (plantInventory.some(plant => plant.plantName.toLowerCase() === lowerCasePlantName && !plant.inStock)) {
      return `We apologize we don't have this plant in stock at the moment.\nPlease view our wide selection of local plant varieties by entering npm run inventory`;
    } else if (plantInventory.find(plant => plant.plantName.toLowerCase() === lowerCasePlantName && plant.inStock === true)) {
      return `We apologize, the plant "${plantName}" in the color "${color}" is not available in our inventory.\nPlease view our wide selection of local plant varieties by entering npm run inventory`;
    } else {
      return `We don't carry that plant, only local plants that are compatible with our ecosystem.`;
    }
  }

  const order = [];
  let addPlantToCart = null;
  for (let i = 0; i < quantity; i++) {
    addPlantToCart = selectPlant(plantInventory, plantName, color);
    const inStockPlants = addPlantToCart.filter(plant => plant.inStock === true);
    if (inStockPlants.length > 0) {
      order.push(inStockPlants[0]);
    } else {
      return `We apologize we don't have this plant in stock at the moment.\nPlease view our wide selection of local plant varieties by entering npm run inventory`;
    }
  }

  const totalCostInCents = order.reduce((total, plant) => total + plant.priceInCents, 0);
  return `\n${new Date()}\n------\n\n${lolcats.rainbow("WELCOME To Our Botanic Shop!")}\nFind a variety of local plant species that enrich our ecosystem :-)\n\n------\nTransactionID: ${generateRandomId(5)}\nCustomer Full Name: ${customerFullName}\nTotal Cost USD: $${(totalCostInCents/100).toFixed(2)}\n---\nItem(s) Purchased\n---\n${order.map((plant) => {
    return `Plant Name: '${plant.plantName}' Dominant Color: '${plant.dominantColor}' Price In USD: $${(plant.priceInCents / 100).toFixed(2)}\n`;
  }).join('')}\n------\nRefunds or exchanges for same day purchases only\n\n${lolcats.rainbow("THANK YOU FOR YOUR PURCHASE! Have a wonderful day!")}`;
};

const update = () => {};
const cancel = () => {};

// Exporting functions
module.exports = {
  generateRandomId,
  inventory,
  donatePlant,
  showItem,
  purchasePlant,
  update,
  cancel
};
