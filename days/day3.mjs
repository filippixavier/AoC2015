import Day from './genericDay.mjs';

class Day3 extends Day {
    getInput() {
        return super.getInput().then(input => input.trim().split(''));
    }

    firstStar() {
        const santaCoordinate = [0, 0];
        const houses = new Set(['0_0']);

        for(let movement of this.input) {
            switch (movement) {
                case '^':
                    santaCoordinate[0] += 1;
                    break;
                case '>':
                    santaCoordinate[1] += 1;
                    break;
                case 'v':
                    santaCoordinate[0] -= 1;
                    break;
                case '<':
                    santaCoordinate[1] -= 1;
                    break;
            }

            houses.add(santaCoordinate[0] + '_' + santaCoordinate[1]);
        }

        return `${houses.size} houses received a gift that year`;
    }

    secondStar() {
        const deliverersCoordinates = [[0, 0], [0, 0]];
        let delivererIndex = 0;
        const houses = new Set(['0_0']);

        for(let movement of this.input) {
            const deliverer = deliverersCoordinates[delivererIndex];
            delivererIndex = (delivererIndex + 1) % 2;
            switch (movement) {
                case '^':
                    deliverer[0] += 1;
                    break;
                case '>':
                    deliverer[1] += 1;
                    break;
                case 'v':
                    deliverer[0] -= 1;
                    break;
                case '<':
                    deliverer[1] -= 1;
                    break;
            }

            houses.add(deliverer[0] + '_' + deliverer[1]);
        }

        return `${houses.size} houses received a gift that year`;
    }
}

export default new Day3('./inputs/day3.input', 3);