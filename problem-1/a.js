const fs = require('node:fs');
const readline = require('node:readline');

function createReadStream () {
    const fileStream = fs.createReadStream('./input.txt');
    return readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
}


async function main() {
    const rl = createReadStream();

    let maxCalorieCount = 0;
    let currentCalorieCount = 0;
    
    for await (const line of rl) {
        if(!line.trim()) {
            if(currentCalorieCount > maxCalorieCount) {
                maxCalorieCount = currentCalorieCount;
            }
            currentCalorieCount = 0;
        } else {
            const calories = parseInt(line, 10);
            currentCalorieCount += calories;
        }
    }

    if(currentCalorieCount > maxCalorieCount) {
        maxCalorieCount = currentCalorieCount;
    }

    console.log(`Maximum calorie count is ${maxCalorieCount}`);
}

main();