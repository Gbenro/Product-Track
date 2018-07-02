const path = require('path');
const fs = require('fs');
const solc = require('solc');

const foodtrackPath = path.resolve(__dirname, 'contracts', 'FoodTrack.sol');
const source = fs.readFileSync(foodtrackPath, 'utf8');

module.exports= solc.compile(source,1).contracts[':FoodTrack'];
