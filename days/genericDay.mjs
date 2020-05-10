import * as fs from 'fs';

export default class Day {
    constructor(path, number) {
        this.path = path;
        this.dayNumber = number;
    }
    getInput() {
        return new Promise((resolve, reject) => {
            fs.readFile(this.path, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data.toString());
                }
            });
        });
    }

    firstStar() {
        return 'Not solved yet';
    }

    secondStar() {
        return 'Not solved yet';
    }

    async solve() {
        this.input = await this.getInput();
        console.log(`Solving day${this.dayNumber}`);
        console.log(`First Star: ${this.firstStar()}`);
        console.log(`Second Star: ${this.secondStar()}`);
    }
}