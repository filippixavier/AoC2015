import Day from './genericDay.mjs';

class Day8 extends Day {
    getInput() {
        return super.getInput().then(input => {
            return input.trim().split('\n').map(line => line.trim());
        });
    }

    firstStar() {
        return this.input.reduce((acc, line) => {
            const codeLen = line.length;
            const pseudoParsedLen = line.replace(/\\"|\\x..|\\\\/g, '.').length;
            return acc + (codeLen - pseudoParsedLen + 2);
        }, 0);
    }

    secondStar() {
        return this.input.reduce((acc, line) => {
            const codeLen = line.length;
            const pseudoParsedLen = (`"${line.replace(/("|\\)/g, '\\$1')}"`).length;

            return acc + pseudoParsedLen - codeLen;
        }, 0);
    }
}

export default new Day8('./inputs/day8.input', 8);