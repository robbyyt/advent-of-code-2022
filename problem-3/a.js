const fs = require('node:fs');
const readline = require('node:readline');

function createReadStream () {
    const fileStream = fs.createReadStream('./input.txt');
    return readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
}

function findFirstCommonItemInStrings(s1, s2) {
    const referrenceLetters = new Set(s1.split(''));

    for(const char of s2) {
        if(referrenceLetters.has(char)) return char;
    }
}

function isLowerCase(char) {
    return char.toLowerCase() === char;
}

function mapItemToPriority(item) {
    if(isLowerCase(item)) return item.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
    else return item.charCodeAt(0) - 'A'.charCodeAt(0) + 27;
} 

function getErrorItemPriority(backpackContent) {
    const [firstCompartment, secondCompartment] = [backpackContent.slice(0, backpackContent.length / 2), backpackContent.slice(backpackContent.length / 2, backpackContent.length)];
    const errorItem = findFirstCommonItemInStrings(firstCompartment, secondCompartment);

    return mapItemToPriority(errorItem);
}

async function main() {
    const rl = createReadStream();
    let sumOfErrors = 0;
    for await (const line of rl) {
        const priority = getErrorItemPriority(line);
        sumOfErrors += priority;
    }

    console.log(`Sum of errors is: ${sumOfErrors}`);
}

main();