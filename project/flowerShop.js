const { faker } = require("@faker-js/faker");
const { readJSONFile, writeJSONFile } = require('./helpers'); 
const plantInventory = readJSONFile('./Data', 'plantInventory.json');

const inventory = () => {
    return plantInventory.reduce((result, obj, index) => {
        return { ...result, [`item${index + 1}`]: obj }; // .reduce() iterates through array to collect all properties in result obj using spread operator and labeling each obj "item" with it's index number plus 1
    }, {});
}
inventory(); // returns an object of plantInventory objects with keys item1, item2 so on and so forth

const donatePlant = () => {

}

const showItem = () => {
    
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