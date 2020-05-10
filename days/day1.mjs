import Day from './genericDay.mjs';

class Day1 extends Day {
    firstStar() {
        let finalFloor = this.input.replace(/\)/g, '').length - this.input.replace(/\(/g, '').length;
        return `Final floor is ${finalFloor}`;
    }

    secondStar() {
        let floor = 0;
        for(let [index, char] of this.input.split('').entries()) {
            floor = char === '(' ? floor + 1 : floor - 1;

            if (floor === -1) {
                return `Index of first character at floor -1: ${index + 1}`;
            }
        }
    }
}

export default new Day1('./inputs/day1.input', 1);