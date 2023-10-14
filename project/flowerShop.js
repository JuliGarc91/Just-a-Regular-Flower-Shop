// ---  I M P O R T S ---
// --- mods ---
const { faker } = require("@faker-js/faker"); // generate data based on user input to Create or update JSON
const lolcats = require("lolcats"); // importing lolcats mod
// --- data ---
const  plantInventory  = require('../Data/plantInventory.json');
// --- cashier functions ---
const { selectPlant } = require('./cashier');


// --- BACKEND: U S E R   C O N T R O L L E R   F U N C T I O N S ---

// --- RUNNING Fx ---
// Type npm run <command> <input1> <input2><input3>
/// --- Commands: ---
// inventory
// donatePlant - node index.js donatePlant
// showItem - node index.js showItem
// purchasePlant - node index.js purchasePlant
// update - node index.js updateOrder
// cancel - node index.js cancelOrder
const inform = console.log; // GLOBAL SCOPE - used to print out info for User

// --- To RUN: ---
// npm run inventory
const inventory = (plantInventory) => { // returns an object of plantInventory objects with keys item1, item2 so on and so forth
    return plantInventory.reduce((result, obj, index) => {
        return { ...result, [`item${index + 1}`]: obj }; // .reduce() iterates through array to collect all properties in result obj using spread operator and labeling each obj "item" with it's index number plus 1
    }, {});
};

// --- TO RUN: ---
// npm run donatePlant <plantName> <color> must have 2 args after command
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
        inform (`------\nAbove is a list of the plant species we carry.\nWe prioritize the preservation of our local ecosystem,\nand we kindly request that only locally-sourced plants be introduced.\n${lolcats.rainbow("THANK YOU kindly for your contribution")}!\nPlease come again ${lolcats.rainbow("<(^_^)>")}\n------`);
    }
    return plantInventory; // updated inventory
  } else {
    inform (`Oopsie! Must include ${lolcats.rainbow("plant color")}.`); //otherwise user must input color
    return plantInventory; // inventory w/o changes
  } 
};

// --- TO RUN: --- 2nd arg after command is optional
// npm run showItem <plantName> Shows all plant items of given plant name if any
// npm run showItem <plantName> <false> Shows all plant items of given plant name that are in stock
// npm run showItem <plantName> <true> Shows all plant items of given plant name that are in stock
const showItem = (plantInventory, plantName, inStock) => {
  const lowerCasePlantName = plantName.toLowerCase(); // Convert the provided plantName to lowercase for case-insensitive matching
  if (inStock === "true") { // Interpret string values "true" and "false" as booleans so function works properly with customer inputs
    inStock = true;
  } else if (inStock === "false") {
    inStock = false;
  }

  if (typeof inStock === "boolean") {
    return plantInventory.filter(plant => plant.plantName.toLowerCase() === lowerCasePlantName && plant.inStock === inStock); 
  } else if (!inStock) { // if inStock has falsy value like undefined (bc customer didnt input anything)
    return plantInventory.filter(plant => plant.plantName.toLowerCase() === lowerCasePlantName);
  }
};
// --- for test cases ---
// fx should be able to return all items of specified plant name regardless of inStock property
// fx should be able to return all items of specified plant with property key value pair `inStock: false`
// fx should be able to return all items of specified plant with property key value pair `inStock: true`
// plantInventory and plantName are required parameters,  instock parameter is optional
// user should be able to return all items of specified plant name regardless of inStock property by inputting `npm run showItem "cork oak"` for example
// user should be able to return all items with property key value pair `inStock: false` of specified plant name by inputting `npm run showItem "cork oak" false`
// user should be able to return all items with property key value pair `inStock: true` of specified plant name by inputting `npm run showItem "cork oak" true`

// --- TO RUN: ---

// const purchasePlant = (plantName, color, quantity) => {
//   if (!plantName || typeof plantName !== 'string' || !color || typeof color !== 'string' || !quantity || typeof quantity !== 'number') {`Error: must enter plant name, color, and amount you would like to purchase.\n------\nTo select plants to purchase enter npm run purchasePlant <plantName> <color> <quantity>\nTo view our large selection of local plants enter: npm run inventory\n`}
  
//   const lowerCasePlantName = plantName.toLowerCase(); // Convert plantName to lowercase
//   color = color.toLowerCase(); // Convert color to lowercase

//   const matchingPlants = plantInventory.filter(plant => (
//     plant.plantName.toLowerCase() === lowerCasePlantName &&
//     plant.dominantColor.toLowerCase() === color
//   ));

//   if (matchingPlants.length === 0) {
//     if (plantInventory.find(plant => plant.plantName.toLowerCase() === lowerCasePlantName)) {
//       return `We appreciate your interest in this plant, and we want to emphasize that our commitment to preserving our local ecosystem and native plant species is at the core of our business. \nRegrettably, we cannot provide this item, as it may pose a risk to our local environment as an invasive species. \nWe hope you understand our dedication to environmental responsibility and conservation. \nWe appreciate and value your business, and hope to see you soon! \nPlease feel free to view our inventory by entering: npm run inventory`;
//     } else {
//       return `We apologize, the plant "${plantName}" in the color "${color}" is not available in our inventory.\nPlease view our wide selection of local plant varieties by entering npm run inventory`;
//     }
//   }

//   const order = [];
//   for (let i = 0; i < quantity; i++) {
//     const addPlantToCart = selectPlant(plantInventory, plantName, color);
//     const inStockPlants = addPlantToCart.filter(plant => plant.inStock === true);
//     if (inStockPlants.length > 0) {
//       order.push(inStockPlants[0]);
//     } else {
//       return `We apologize we don't have this plant in stock at the moment.\nPlease view our wide selection of local plant varieties by entering npm run inventory`;
//     }
//   }

//   const totalCostInCents = order.reduce((total, plant) => total + plant.priceInCents, 0);
//   return `Total Cost: ${totalCostInCents}`;
// };

// const purchasePlant = (plantName, color, quantity) => {
//   if (!plantName || typeof plantName !== 'string' || !color || typeof color !== 'string' || !quantity || typeof quantity !== 'number') {
//     return `Error: Must enter plant name, color, and the amount you would like to purchase.\n------\nTo select plants to purchase, enter npm run purchasePlant <plantName> <color> <quantity>\nTo view our large selection of local plants, enter: npm run inventory\n`;
//   }

//   const lowerCasePlantName = plantName.toLowerCase(); // Convert plantName to lowercase
//   color = color.toLowerCase(); // Convert color to lowercase

//   const matchingPlants = plantInventory.filter(plant => (
//     plant.plantName.toLowerCase() === lowerCasePlantName &&
//     plant.dominantColor.toLowerCase() === color
//   ));

//   if (matchingPlants.length === 0) {
//     if (plantInventory.find(plant => plant.plantName.toLowerCase() === lowerCasePlantName)) {
//       return `We don't carry that plant, only local plants`;
//     } else {
//       return `We apologize, the plant "${plantName}" in the color "${color}" is not available in our inventory.\nPlease view our wide selection of local plant varieties by entering npm run inventory`;
//     }
//   }

//   const order = [];
//   for (let i = 0; i < quantity; i++) {
//     const addPlantToCart = selectPlant(plantInventory, plantName, color);
//     const inStockPlants = addPlantToCart.filter(plant => plant.inStock === true);
//     if (inStockPlants.length > 0) {
//       order.push(inStockPlants[0]);
//     } else {
//       return `We apologize we don't have this plant in stock at the moment.\nPlease view our wide selection of local plant varieties by entering npm run inventory`;
//     }
//   }

//   const totalCostInCents = order.reduce((total, plant) => total + plant.priceInCents, 0);
//   return `Total Cost: ${totalCostInCents}`;
// };

const purchasePlant = (plantName, color, quantity) => {
  console.log('Received input:', plantName, color, quantity); // Debug statement

  if (!plantName || typeof plantName !== 'string' || !color || typeof color !== 'string' || !quantity || typeof quantity !== 'number') {
    console.log('Invalid input detected.'); // Debug statement
    return `Error: Must enter plant name, color, and the amount you would like to purchase.\n------\nTo select plants to purchase, enter npm run purchasePlant <plantName> <color> <quantity>\nTo view our large selection of local plants, enter: npm run inventory\n`;
  }

  const lowerCasePlantName = plantName.toLowerCase();
  color = color.toLowerCase();

  console.log('Lowercased inputs:', lowerCasePlantName, color); // Debug statement

  const matchingPlants = plantInventory.filter(plant => (
    plant.plantName.toLowerCase() === lowerCasePlantName &&
    plant.dominantColor.toLowerCase() === color
  ));

  console.log('Matching plants:', matchingPlants); // Debug statement

  if (matchingPlants.length === 0) {
    if (plantInventory.find(plant => plant.plantName.toLowerCase() === lowerCasePlantName)) {
      console.log('Plant not in inventory but matching name found.'); // Debug statement
      return `We don't carry that plant, only local plants that are compatible with our ecosystem.`;
    } else {
      console.log('Plant not in inventory.'); // Debug statement
      return `We apologize, the plant "${plantName}" in the color "${color}" is not available in our inventory.\nPlease view our wide selection of local plant varieties by entering npm run inventory`;
    }
  }

  const order = [];
  for (let i = 0; i < quantity; i++) {
    const addPlantToCart = selectPlant(plantInventory, plantName, color);
    const inStockPlants = addPlantToCart.filter(plant => plant.inStock === true);
    if (inStockPlants.length > 0) {
      order.push(inStockPlants[0]);
    } else {
      console.log('Plant not in stock.'); // Debug statement
      return `We apologize we don't have this plant in stock at the moment.\nPlease view our wide selection of local plant varieties by entering npm run inventory`;
    }
  }

  const totalCostInCents = order.reduce((total, plant) => total + plant.priceInCents, 0);
  return `Total Cost: ${totalCostInCents}`;
};

purchasePlant("orchid", "black", 5);





const update = () => {
    
}
const cancel = () => {
    
}

let updatedPlants;
let writeToFile;

module.exports = {
    inventory, 
    donatePlant, 
    showItem, 
    purchasePlant, 
    update, 
    cancel
};