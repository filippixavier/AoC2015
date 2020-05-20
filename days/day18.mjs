import Day from './genericDay.mjs';

class Day18 extends Day {
    getInput() {
        return super.getInput().then(input => input.trim().split('\n').map(line => line.trim().split('').map(character => character === '#')));
    }

    nextStep(lights) {
        const nextLights = [];
        const length = 100;
        for (let line = 0; line < length; line++) {
            nextLights[line] = [];
            for (let column = 0; column < length; column++) {
                nextLights[line][column] = false;
                let current = lights[line][column];
                let numOfAdjacents = 0;

                // Call that utter laziness
                numOfAdjacents += Number(!!lights?.[line - 1]?.[column - 1]);
                numOfAdjacents += Number(!!lights?.[line - 1]?.[column]);
                numOfAdjacents += Number(!!lights?.[line - 1]?.[column + 1]);
                numOfAdjacents += Number(!!lights?.[line]?.[column - 1]);
                numOfAdjacents += Number(!!lights?.[line]?.[column + 1]);
                numOfAdjacents += Number(!!lights?.[line + 1]?.[column - 1]);
                numOfAdjacents += Number(!!lights?.[line + 1]?.[column]);
                numOfAdjacents += Number(!!lights?.[line + 1]?.[column + 1]);

                if ((current && (numOfAdjacents === 2 || numOfAdjacents === 3)) || !current && numOfAdjacents === 3) {
                    nextLights[line][column] = true;
                }
            }
        }

        return nextLights;
    }

    firstStar() {
        let lights = this.input;
        for (let i = 0; i < 100; i++) {
            lights = this.nextStep(lights);
        }

        return `After 100 steps, there is ${lights.reduce((acc, elem) => acc + elem.reduce((subAcc, subElem) => subAcc + subElem, 0), 0)}`
    }

    secondStar() {
        let lights = this.input;
        lights[0][0] = lights[0][99] = lights[99][0] = lights[99][99] =true;

        for (let i = 0; i < 100; i++) {
            lights = this.nextStep(lights);
            lights[0][0] = lights[0][99] = lights[99][0] = lights[99][99] =true;
        }

        return `After 100 steps, there is ${lights.reduce((acc, elem) => acc + elem.reduce((subAcc, subElem) => subAcc + subElem, 0), 0)}`
    }
}

export default new Day18('./inputs/day18.input', 18);