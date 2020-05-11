import Day from './genericDay.mjs';

class Day2 extends Day {
    getInput() {
        return super.getInput().then(input => {
            return input.trim()
            .split('\n')
            .map(line => line.split('x').map(Number));
        });
    }
    firstStar() {
        let result = this.input.reduce((acc, giftSize) => {
            let areas = [giftSize[0] * giftSize[1], giftSize[0] * giftSize[2], giftSize[1] * giftSize[2]];
            let lineVal = 2 * (areas[0] + areas[1] + areas[2]) + Math.min(...areas);
            return acc + lineVal;
        }, 0);

        return `Elves should order ${result} square feet of wrapping paper`;
    }

    secondStar() {
        let result = this.input.reduce((acc, giftSize) => {
            let result = 2 * (giftSize[0] + giftSize[1] + giftSize[2] - Math.max(...giftSize));
            result += giftSize[0] * giftSize[1] * giftSize[2];
            return acc + result;
        }, 0);

        return `Elves should order ${result} feet of ribbon`;
    }
}

export default new Day2('./inputs/day2.input', 2);