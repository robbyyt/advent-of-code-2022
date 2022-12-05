"use strict";
const fs = require('fs');

function getFileLines() {
    const data = fs.readFileSync('./input.txt', {encoding:'utf8'});
    return data.split('\r\n')
}

function processStacks(stacks) {
    stacks.reverse();
    const len = stacks[0].length;
    const stackDictionary = {}
    for(let i = 1; i< len - 1; i += 4) {
        const stackIdentifier = stacks[0][i];
        const currentStack = [];
        for(let j = 1; j < stacks.length; j++) {
            if(stacks[j][i].trim()) {
                currentStack.push(stacks[j][i]);
            }
        }
        stackDictionary[stackIdentifier] = currentStack;
    }

    return stackDictionary;
}

function processCommands(stackDictionary, commandInput, shouldReverse = true) {
    for(const command of commandInput) {
        const [crateNumber, moveFrom, moveTo] = command.match(/(\d+)/g);
        applyCommand(stackDictionary, parseInt(crateNumber, 10), moveFrom, moveTo, shouldReverse);
    }
}

function applyCommand(stackDictionary, crateNumber, moveFrom, moveTo, shouldReverse = true) {
    const elements = stackDictionary[moveFrom].splice(stackDictionary[moveFrom].length - crateNumber, crateNumber);
    if(shouldReverse) {
        elements.reverse();
    }
    stackDictionary[moveTo].push(...elements);
}

function getPrintableSolution(stackDictionary) {
    return Object.values(stackDictionary).map(stack => stack[stack.length - 1]).join('');
}

function main() {
    const lines = getFileLines();
    const separatorLineIndex = lines.findIndex(line => !line.length);
    const stacksInput = lines.slice(0, separatorLineIndex);
    const commandsInput = lines.slice(separatorLineIndex + 1);
    const stackDictionary1 = processStacks(stacksInput);
    const stackDictionary2 = JSON.parse(JSON.stringify(stackDictionary1));
    processCommands(stackDictionary1, commandsInput);
    processCommands(stackDictionary2, commandsInput, false);
    console.log(getPrintableSolution(stackDictionary1));
    console.log(getPrintableSolution(stackDictionary2));
}

main();