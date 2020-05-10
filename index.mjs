import * as fs from 'fs';
import * as readline from 'readline';

console.clear();

function displayTree() {
    return new Promise((resolve, reject) => {
        fs.readFile('./xmastree.ascii', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data.toString());
            }
        });
    });
}

async function askDay() {
    return new Promise(async function (resolve, reject) {
        const rl = readline.createInterface({input: process.stdin, output: process.stdout, terminal: true});
        
        let tree = await displayTree();

        rl.write(`${tree}\n`);
        rl.write('\x1b[38;2;0;128;0mWelcome to \x1b[4mAdventOfCode 2015\x1b[0;38;2;0;128;0m!\x1b[0m\n');
        rl.write('Please enter day number\n');
        rl.prompt();

        rl.on('line', (input) => {
            if (isNaN(input)) {
                reject('Please enter a valid day');
            } else {
                resolve(parseInt(input));
            }
            rl.close();
        });
    });
}

async function init() {
    process.title = 'Advent Of Code 2015';
    let day;
    try {
        day = await askDay();
    } catch (e) {
        console.error(e);
        return;
    }

    console.log(`Attempting to launch day ${day}`);

    try {
        console.log(`./days/day${day}.mjs`);
        const {default: module} = await import(`./days/day${day}.mjs`);
        module.solve();
    } catch (e) {
        console.error(`Error while attempting to solve day ${day}: ${e}`);
    }
}

init();