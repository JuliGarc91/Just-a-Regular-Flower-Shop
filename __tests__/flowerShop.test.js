const { purchasePlant } = require('../project/flowerShop'); // Import the purchasePlant function from your module
// You need to replace './yourModule' with the actual path to the module containing the purchasePlant function.

describe('purchasePlant', () => {
  // Test case 1: Test valid input data types
  test('should handle valid input data types', () => {
    const plantInventory = [
      // Create a sample plant inventory for testing
      // (You can add relevant plant data)
    ];
    const plantName = 'SamplePlantName';
    const color = 'green';
    const quantity = 1;
    const customerFullName = 'John Doe';

    // Call the function and expect it not to return an error message
    const result = purchasePlant(plantInventory, plantName, color, quantity, customerFullName);
    expect(result).not.toMatch(/Invalid input data types/); // Ensure it doesn't return an error message
  });

  // Test case 2: Test invalid input data types
  test('should handle invalid input data types', () => {
    const plantInventory = [
      // Create a sample plant inventory for testing
      // (You can add relevant plant data)
    ];
    const plantName = 'SamplePlantName';
    const color = 'green';
    const quantity = 'invalid'; // Invalid quantity
    const customerFullName = 123; // Invalid customerFullName

    // Call the function and expect it to return an error message
    const result = purchasePlant(plantInventory, plantName, color, quantity, customerFullName);
    expect(result).toMatch(/Invalid input data types/); // Ensure it returns an error message
  });

  // Add more test cases for other scenarios like out of stock, not in inventory, etc.
});
