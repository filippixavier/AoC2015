import Day from './genericDay.mjs';

class Day19 extends Day {
    getInput() {
        return super.getInput().then(input => {
            let lines = input.trim().split('\n');
            this.result = lines.pop();
            lines.pop();
            return lines.map(line => {
                let split = line.trim().split(' => ');
                split[0] = new RegExp(split[0], 'g');

                return split;
            });
        });
    }

    firstStar() {
        const molecules = new Set();
        for (let transform of this.input) {
            for (let i = transform[0].exec(this.result); i !== null; i = transform[0].exec(this.result)) {
                let tr = this.result.substr(0, i.index) + transform[1] + this.result.substr(transform[0].lastIndex);
                molecules.add(tr);
            }
        }

        return `There is ${molecules.size} possible permutations`;
    }

    // I don't remember HOW I solved this one the first time, not a CYK for sure, probably using a greedy algorithm I guess
    // Anyway, answer explained here: https://www.reddit.com/r/adventofcode/comments/3xflz8/day_19_solutions/
    secondStar() {
        const parentheses = ['Ar', 'Rn'];
        const coma = 'Y';

        let count = 0;
        let parenthesesCount = 0;
        let comaCount = 0;

        for (let ch of this.result.split(/(?=[A-Z])/)) {
            count++;
            if(parentheses.includes(ch)) {
                parenthesesCount++;
            }
            if(ch === coma ) {
                comaCount++;
            }
        }

        return count - parenthesesCount - 2 * comaCount - 1;
    }
}

export default new Day19('./inputs/day19.input', 19);