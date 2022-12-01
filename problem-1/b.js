const fs = require('node:fs');
const readline = require('node:readline');

function createReadStream () {
    const fileStream = fs.createReadStream('./input.txt');
    return readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
}

function sumOfElements(arr) {
    return arr.reduce((acc, curr) => acc += curr, 0)
}


async function main() {
    const rl = createReadStream();

    let maxCalorieCounts = [];
    const topNumberOfElves = 3;
    let currentCalorieCount = 0;
    
    for await (const line of rl) {
        if(!line.trim()) {
            if(maxCalorieCounts.length < 3) {
                maxCalorieCounts.push(currentCalorieCount)
            } else {
                const minimum = Math.min(...maxCalorieCounts);
                if(currentCalorieCount > minimum) {
                    const toReplace = maxCalorieCounts.findIndex(el => el === minimum);
                    maxCalorieCounts[toReplace] = currentCalorieCount;
                }
            }
            currentCalorieCount = 0;
        } else {
            const calories = parseInt(line, 10);
            currentCalorieCount += calories;
        }
    }

    if(maxCalorieCounts.length < 3) {
        maxCalorieCounts.push(currentCalorieCount)
    } else {
        const minimum = Math.min(...maxCalorieCounts);
        if(currentCalorieCount > minimum) {
            const toReplace = maxCalorieCounts.findIndex(el => el === minimum);
            maxCalorieCounts[toReplace] = currentCalorieCount;
        }
    }

    console.log(`Maximum calorie count is ${sumOfElements(maxCalorieCounts)}`);
}

main();