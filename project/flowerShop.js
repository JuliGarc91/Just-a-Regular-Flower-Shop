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

const donatePlant = (plantInventory, plantName) => {
  // Convert plantName to lowercase for a case-insensitive comparison
  const lowerCasePlantName = plantName.toLowerCase();
  
  // Check if the plant with the given name already exists in the inventory
  const existingPlant = plantInventory.find(plant => plant.plantName.toLowerCase() === lowerCasePlantName);
  if (existingPlant) {
    const plantDonated = {
      plantName: plantName,
      color: faker.vehicle.color(),
      price: faker.commerce.price({ min: 3, max: 25, dec: 2, symbol: "$" }),
      inStock: true,
    };
    plantInventory.push(plantDonated);
    return plantInventory;
  } else {
    inform (lolcats.rainbow(`We prioritize the preservation of our local ecosystem; we kindly request that only locally-sourced plants be introduced.`));
    return plantInventory; // plant inventory w/o new item
  }
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
const bundle = () => {
    
}

let updatedPlants;
let writeToFile;

module.exports = {
    inventory, 
    donatePlant, 
    showItem, 
    newOrder, 
    update, 
    cancel, 
    bundle
};