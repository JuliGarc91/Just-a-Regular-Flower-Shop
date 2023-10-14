// to copy paste and test stuff


// --- Import NPM Packages ---
const lolcats = require("lolcats"); // importing lolcats mod 
const { faker } = require("@faker-js/faker"); // importing faker to generate data based on customer inputs
// -- data --
const { readJSONFile, writeJSONFile } = require('./project/helpers'); 
const plantInventory = readJSONFile('./Data', 'plantInventory.json');
//console.log(plantInventory)


// --- Test if import of npm packages worked ---
//lolcats.print('Lorem ipsum dolor sit amet')
//chalkAnimation.rainbow('Lorem ipsum dolor sit amet');
// const material = {
//     material: faker.commerce.productMaterial(), // generates string
// };
// const { inspect } = require("node:util"); // prints out nested objects
// lolcats.print(inspect(material)); // generates rainbow object

// --- faker stuff ---
