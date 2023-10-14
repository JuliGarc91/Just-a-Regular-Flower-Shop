// ---  I M P O R T S ---
// --- mods ---
const { faker } = require("@faker-js/faker"); // generate data based on user input to Create or update JSON
const lolcats = require("lolcats"); // importing lolcats mod
// --- data ---
const  plantInventory  = require('../Data/plantInventory.json');
console.log (plantInventory);
// --- BACKEND: U S E R   C O N T R O L L E R   F U N C T I O N S ---

const inform = console.log; // GLOBAL SCOPE - used to print out stylized info for User

const inventory = (plantInventory) => { // returns an object of plantInventory objects with keys item1, item2 so on and so forth
    return plantInventory.reduce((result, obj, index) => {
        return { ...result, [`item${index + 1}`]: obj }; // .reduce() iterates through array to collect all properties in result obj using spread operator and labeling each obj "item" with it's index number plus 1
    }, {});
};

// const donatePlant = (plantInventory, plantName) => {
//   // Convert plantName to lowercase for a case-insensitive comparison
//   const lowerCasePlantName = plantName.toLowerCase();
  
//   // Check if the plant with the given name already exists in the inventory
//   const existingPlant = plantInventory.find(plant => plant.plantName.toLowerCase() === lowerCasePlantName);
//   if (existingPlant) {
//     const plantDonated = {
//       plantName: plantName,
//       color: faker.vehicle.color(),
//       priceInCents: faker.number.int({ min: 100, max: 4500 }),
//       inStock: true,
//     };
//     plantInventory.push(plantDonated);
//     return plantInventory;
//   } else {
//     inform (`------\nAbove is a list of the plant species we carry.\nWe prioritize the preservation of our local ecosystem,\nand we kindly request that only locally-sourced plants be introduced.\n${lolcats.rainbow("THANK YOU kindly for your contribution")}!\nPlease come again ${lolcats.rainbow("<(^_^)>")}\n------`);
//     return plantInventory; // plant inventory w/o new item
//   }
// };

const donatePlant = (plantInventory, plantName, color) => {
    // Convert user input to lowercase to match case-insensitively
    const lowerCasePlantName = plantName.toLowerCase();
    const lowerCaseColor = color.toLowerCase();
  
    // Check if any plant in the inventory matches the given plantName and color
    const matchingPlants = plantInventory.filter(plant => (
      plant.plantName.toLowerCase() === lowerCasePlantName &&
      plant.dominantColor.toLowerCase() === lowerCaseColor
    ));
  
    if (matchingPlants.length > 0) { // Matching plant(s) found
      matchingPlants.forEach(plant => {
        if (plant.inStock === false) {
          plant.inStock = true; // Change inStock to true
        }
      });
      inform(`The plant "${plantName}" with color "${color}" is back in stock. Thank you for your contribution!`);
    } else if (plantInventory.find(plant => (
      plant.plantName.toLowerCase() === lowerCasePlantName && 
      plant.dominantColor.toLowerCase() !== lowerCaseColor
    ))) {
      // If the plant name matches but color doesn't match any plant in stock then add it to inventory (plant species of new color, so cool!)
      const plantDonated = {
        plantName: plantName.charAt(0).toUpperCase() + plantName.slice(1),
        dominantColor: color.charAt(0).toUpperCase() + color.slice(1), // Set the color property as provided (capitalize first letter)
        priceInCents: faker.number.int({ min: 100, max: 4500 }),
        inStock: true,
      };
      plantInventory.push(plantDonated);
      inform(`The plant "${plantName}" with color "${color}" has been added to the inventory. Thank you for your contribution!`);
    } else { // if it doesn't match plant name already in inventory we don't take it as a donation
        inform (`------\nAbove is a list of the plant species we carry.\nWe prioritize the preservation of our local ecosystem,\nand we kindly request that only locally-sourced plants be introduced.\n${lolcats.rainbow("THANK YOU kindly for your contribution")}!\nPlease come again ${lolcats.rainbow("<(^_^)>")}\n------`);
    }
    return plantInventory; // updated inventory
  };  
  

const showItem = (plantInventory, plantName) => {
    const lowerCasePlantName = plantName.toLowerCase();
    return plantInventory.find(plant => plant.plantName.toLowerCase() === lowerCasePlantName);
}
const newOrder = () => {

}
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
    newOrder, 
    update, 
    cancel
};