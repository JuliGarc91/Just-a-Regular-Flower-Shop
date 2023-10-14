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
// ------ Thank you, come again! ------

module.exports = {
  selectPlant,
}