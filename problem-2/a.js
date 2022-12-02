const fs = require('node:fs');
const readline = require('node:readline');

function createReadStream () {
    const fileStream = fs.createReadStream('./input.txt');
    return readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
}

function calculatePointsFromRound(opponentInput, playerInput) {
    const opponentChoiceIndexes = {
        A: 0,
        B: 1,
        C: 2,
    };

    const userChoiceIndexes = {
        X: 0,
        Y: 1,
        Z: 2,
    };

    const resultMatrix = [
        [3, 6, 0],
        [0, 3, 6],
        [6, 0, 3]
    ];

    return resultMatrix[opponentChoiceIndexes[opponentInput]][userChoiceIndexes[playerInput]] + userChoiceIndexes[playerInput] + 1;
}


async function main() {
    const rl = createReadStream();
    let currentScore = 0;

    for await (const line of rl) {
        const [opponentInput, playerInput] = line.split(' ');
        currentScore += calculatePointsFromRound(opponentInput, playerInput);
    }

    console.log(`Score is ${currentScore}`);
}

main();