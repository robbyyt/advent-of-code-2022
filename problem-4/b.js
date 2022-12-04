const fs = require('node:fs');
const readline = require('node:readline');

function createReadStream () {
    const fileStream = fs.createReadStream('./input.txt');
    return readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
}

function getValuesFromInterval(interval) {
    const [min, max] = interval.split('-');
    return [min, max].map((el) => parseInt(el, 10));
}

function areIntervalsOverlapping(min1, max1, min2, max2) {

    return Math.max(min1, min2) <= Math.min(max1, max2);
}

async function main() {
    const rl = createReadStream();
    let overlappingIntervals = 0;

    for await (const line of rl) {
        const [interval1, interval2] = line.split(',');
        const [min1, max1] = getValuesFromInterval(interval1);
        const [min2, max2] = getValuesFromInterval(interval2);
        if(areIntervalsOverlapping(min1, max1, min2, max2)) {
            overlappingIntervals += 1;
        }
    }

    console.log(`Overlapping intervals: ${overlappingIntervals}`);
}

main();