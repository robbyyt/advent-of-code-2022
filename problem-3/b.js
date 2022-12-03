const fs = require('fs');

function getFileLines() {
    const data = fs.readFileSync('./input.txt', {encoding:'utf8'});
    return data.split('\r\n')
}

function findCommonItemsInTwoStrings(s1, s2) {
    const referrenceLetters = new Set(s1.split(''));
    const resultSet = new Set();
    for(const char of s2) {
        if(referrenceLetters.has(char)) resultSet.add(char);
    }

    return resultSet;
}

function isLowerCase(char) {
    return char.toLowerCase() === char;
}

function findFirstCommonItemInThreeStrings(s1, s2, s3) {
    const referrenceLetters = findCommonItemsInTwoStrings(s1, s2);
    for(const char of s3) {
        if(referrenceLetters.has(char)) return char;
    }
}

function mapItemToPriority(item) {
    if(isLowerCase(item)) return item.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
    else return item.charCodeAt(0) - 'A'.charCodeAt(0) + 27;
}

function main() {
    const lines = getFileLines();
    let badgeSum = 0;

    for(let i = 0; i < lines.length - 2; i+= 3) {
        const badge = findFirstCommonItemInThreeStrings(lines[i], lines[i+1], lines[i+2]);
        badgeSum += mapItemToPriority(badge);
    }

    console.log(`Sum of priorities for the badges is ${badgeSum}`);
}

main();