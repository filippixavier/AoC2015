import Day from './genericDay.mjs';

class Day10 extends Day {
    looknsay(times) {
        const reg = /((\d)\2*)/g;
        let current = this.input;

        for (let i = 0; i < times; i++) {
            let next = '';
            for (let num = reg.exec(current); num !== null; num = reg.exec(current)) {
                next += `${num[0].length}${num[2]}`;
            }
            current = next;
        }
        return current.length;
    }
    firstStar() {
        return `result len is: ${this.looknsay(40)}`
    }
    secondStar() {
        return `result len is: ${this.looknsay(50)}`
    }
}

export default new Day10('./inputs/day10.input', 10);