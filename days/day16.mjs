import * as fs from 'fs';
import Day from './genericDay.mjs';

class Day16 extends Day {
    constructor(pathA, pathB) {
        super('', 16);
        this.pathA = pathA;
        this.pathB = pathB;
    }

    getInput() {
        const reg = /(\w+): (\d+)/g;
        return Promise.all([new Promise((resolve, reject) => {
            fs.readFile(this.pathA, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data.toString());
                }
            });
        }), new Promise((resolve, reject) => {
            fs.readFile(this.pathB, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data.toString());
                }
            });
        })]).then(inputs => {
            this.filters = inputs[0].trim().split('\n').map(line => line.trim().split(':')).reduce((acc, elem) => {
                acc[elem[0]] = Number(elem[1]);
                return acc;
            }, {});
            return inputs[1].trim().split('\n').map((line, index) => {
                const result = {number: index + 1};
                for (let i = reg.exec(line); i !== null; i = reg.exec(line)) {
                    result[i[1]] = Number(i[2]);
                }
                return result;
            });
        });
    }

    firstStar() {
        let aunts = this.input;
        for(let filters of Object.entries(this.filters)) {
            aunts = aunts.filter(elem => {
                if(elem.hasOwnProperty(filters[0])) {
                    return elem[filters[0]] === filters[1];
                }
                return true;
            });
        }

        return `Aunt Sue#${aunts[0].number} sent you the gift!`;
    }

    secondStar() {
        let aunts = this.input;
        for(let filters of Object.entries(this.filters)) {
            aunts = aunts.filter(elem => {
                if(elem.hasOwnProperty(filters[0])) {
                    if(filters[0] === 'cats' || filters[0] === 'trees')
                        return elem[filters[0]] > filters[1];
                    if(filters[0] === 'pomeranian' || filters[0] === 'goldfish')
                        return elem[filters[0]] < filters[1];
                    return elem[filters[0]] === filters[1];
                }
                return true;
            });
        }

        return `Actually, aunt Sue#${aunts[0].number} sent you the gift!`;
    }
}

export default new Day16('./inputs/day16-1.input', './inputs/day16-2.input');