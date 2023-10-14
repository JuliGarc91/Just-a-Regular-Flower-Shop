// to copy paste and test stuff


// --- Import NPM Packages ---
const lolcats = require("lolcats"); // importing lolcats mod 
const { faker } = require("@faker-js/faker"); // importing faker to generate data based on customer inputs
// -- data --
const { readJSONFile, writeJSONFile } = require('./project/helpers'); 
const plantInventory = readJSONFile('./Data', 'plantInventory.json');
//console.log(plantInventory)


// --- Test if import of npm packages worked ---
const showItem = (plantInventory, plantName, color = null, inStock = true) => {
    // Convert the provided plantName to lowercase for case-insensitive matching
    const lowerCasePlantName = plantName.toLowerCase();
  
    if (color) {
      // If a color is provided, filter by both plant name, color, and inStock
      const lowerCaseColor = color.toLowerCase();
      const filteredPlants = plantInventory.filter(plant => (
        // Check if the lowercase plant name matches and the lowercase color matches
        plant.plantName.toLowerCase() === lowerCasePlantName &&
        plant.dominantColor.toLowerCase() === lowerCaseColor &&
        // Only include plants in stock if inStock is true, otherwise include all
        (inStock ? plant.inStock : true)
      ));
  
      if (filteredPlants.length > 0) {
        return filteredPlants;
      } else {
        // If no matching plant is found, create a placeholder and return it
        const placeholderPlant = {
          plantName: plantName,
          dominantColor: color,
          priceInCents: 0, // Set the price as needed
          inStock: false,
        };
        // Add the placeholder plant to the inventory
        plantInventory.push(placeholderPlant);
        return [placeholderPlant];
      }
    } else {
      // If no color is provided, filter only by plant name and inStock
      const filteredPlants = plantInventory.filter(plant => (
        // Check if the lowercase plant name matches
        plant.plantName.toLowerCase() === lowerCasePlantName &&
        // Only include plants in stock if inStock is true, otherwise include all
        (inStock ? plant.inStock : true)
      ));
  
      if (filteredPlants.length > 0) {
        return filteredPlants;
      } else {
        // If no matching plant is found, create a placeholder and return it
        const placeholderPlant = {
          plantName: plantName,
          dominantColor: "Unknown", // You can set a default color
          priceInCents: 0, // Set the price as needed
          inStock: false,
        };
        // Add the placeholder plant to the inventory
        plantInventory.push(placeholderPlant);
        return [placeholderPlant];
      }
    }
  };
  