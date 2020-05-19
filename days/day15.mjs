import Day from './genericDay.mjs';

class Day15 extends Day {
    getInput() {
        const reg = /(\w+).*?(-?\d+).*?(-?\d+).*?(-?\d+).*?(-?\d+).*?(-?\d+)/g;
        return super.getInput().then(input => {
            return [...input.matchAll(reg)].reduce((acc, elem) => {
                acc.push(elem.slice(2).map(Number));
                return acc;
            }, []);
        });
    }

    getIngredientsScore(repartition) {
        const numOfProperties = this.input[0].length - 1; // ignoring calories for calculations

        const mixing = repartition.map((curr, id) => {
            return this.input[id].map(elem => elem * curr);
        });

        const calories = mixing.reduce((acc, elem) => acc + elem[elem.length - 1], 0);

        if(this.requiredCalories && calories !== this.requiredCalories) {
            return 0;
        }

        const propertiesScores = Array(numOfProperties).fill(0);

        for(let i = numOfProperties - 1; i >= 0; i--) {
            propertiesScores[i] = Math.max(0, mixing.reduce((acc, elem) => acc + elem[i], 0));
        }

        return propertiesScores.reduce((acc, elem) => acc * elem, 1);
    }

    findMax(arr, index, remaining, score = 0) {
        let total = score;

        if (remaining === 0) {
            return this.getIngredientsScore(arr);
        }

        if (index === arr.length - 1) {
            arr[arr.length - 1] = remaining;
            return this.getIngredientsScore(arr);
        }

        for (let i = remaining; i >= 0; i--) {
            let copy = arr.slice();
            copy[index] = i;
            total = Math.max(total, this.findMax(copy, index + 1, remaining - i, total));
        }

        return total;
    }

    firstStar() {
        return `Max score is: ${this.findMax(Array(this.input.length).fill(0), 0, 100)}`; // We can get reparition information by returning repartition along with matching score
    }

    secondStar() {
        this.requiredCalories = 500;
        return `Max score is: ${this.findMax(Array(this.input.length).fill(0), 0, 100)} for a 500 calories cookie`;
    }
}

export default new Day15('./inputs/day15.input', 15);