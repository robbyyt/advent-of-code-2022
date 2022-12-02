const fs = require('node:fs');
const readline = require('node:readline');

function createReadStream () {
    const fileStream = fs.createReadStream('./input.txt');
    return readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
}

function mapActionToResult(playerAction) {
    switch(playerAction) {
        case 'X':
            return 0;
        case 'Y':
            return 3;
        case 'Z':
            return 6;
    }
}

function calculatePointsFromRound(opponentInput, desiredPlayerAction) {
    const opponentChoiceIndexes = {
        A: 0,
        B: 1,
        C: 2,
    };

    const resultMatrix = [
        [3, 6, 0],
        [0, 3, 6],
        [6, 0, 3]
    ];

    const resultLine = resultMatrix[opponentChoiceIndexes[opponentInput]];
    const desiredIndexByPlayer = resultLine.findIndex(el => el === mapActionToResult(desiredPlayerAction));

    return resultLine[desiredIndexByPlayer] + desiredIndexByPlayer + 1;
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