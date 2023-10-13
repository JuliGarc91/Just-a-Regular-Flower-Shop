const { faker } = require("@faker-js/faker");
const { readJSONFile, writeJSONFile } = require('./helpers'); 
const plantInventory = readJSONFile('./Data', 'plantInventory.json');

const inventory = () => {
    return plantInventory;
}
inventory();

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