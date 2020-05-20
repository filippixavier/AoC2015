import Day from './genericDay.mjs';

class Day17 extends Day {
    constructor(path, number) {
        super(path, number);
        this.count = 0;
        this.target = 150;

        this.minComb = Infinity;
    }

    getInput() {
        return super.getInput().then(input => input.trim().split('\n').map(Number));
    }

    combinatory(arr, total = 0, depth = 0) {
        if (total > this.target) {
            return;
        }

        for (let i = 0; i < arr.length; i++) {
            let currentScore = total + arr[i];
            
            if (currentScore === this.target) {
                if(this.useMin) {
                    if(depth < this.minComb) {
                        this.minComb = depth;
                        this.count = 1;
                    } else if (depth === this.minComb) {
                        this.count++;
                    }
                } else {
                    this.count++;
                }
            }

            let remaining = arr.slice(i + 1);

            this.combinatory(remaining, currentScore, depth + 1);
        }
    }

    firstStar() {
        this.combinatory(this.input);
        return `There is ${this.count} combinations possible`;
    }

    secondStar() {
        this.count = 0;
        this.useMin = true;

        this.combinatory(this.input);

        return `There is ${this.count} ways to use the minimum of ${this.minComb} containers`;
    }
}

export default new Day17('./inputs/day17.input', 17);