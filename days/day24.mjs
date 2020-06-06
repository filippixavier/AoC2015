import Day from './genericDay.mjs';

class Day24 extends Day {
    getInput() {
        return super.getInput().then(input => input.trim().split('\n').map(Number))
    }

    getQuantumEntanglement(group = [], remaining = [], size = Infinity, weightGoal = 0) {
        let finalQuantumScore = Infinity;
        let finalSize = size;

        const groupQuantumScore = group.reduce((acc, elem) => acc * elem, 1);
        const groupWeight = group.reduce((acc, elem) => acc + elem, 0);

        if(group.length === size) {
            return [groupWeight === weightGoal ? groupQuantumScore : finalQuantumScore, size];
        }

        for (let i = 0; i < remaining.length; i++) {
            const weight = remaining[i];
            if (weight + groupWeight > weightGoal || weight * groupQuantumScore > finalQuantumScore) {
                continue;
            }

            if (weight + groupWeight === weightGoal) {
                return [groupQuantumScore * weight, group.length + 1];
            }

            let newGroup = group.concat(weight);

            const [tempQuantumScore, tempSize] = this.getQuantumEntanglement(newGroup, remaining.slice(i + 1), size, weightGoal);

            if (tempSize < finalSize) {
                finalQuantumScore = tempQuantumScore;
            } else {
                finalQuantumScore = Math.min(finalQuantumScore, tempQuantumScore);
            }

            finalSize = Math.min(finalSize, tempSize);
        }

        return [finalQuantumScore, finalSize];
    }

    firstStar() {
        const weightGoal = this.input.reduce((acc, elem) => acc + elem) / 3;

        this.input.reverse();

        const result = this.getQuantumEntanglement([], this.input, this.input.length, weightGoal);

        return `First group best configuration have a quantum entanglement of ${result[0]} for ${result[1]} gifts`;
    }

    secondStar() {
        const weightGoal = this.input.reduce((acc, elem) => acc + elem) / 4;

        this.input.reverse();

        const result = this.getQuantumEntanglement([], this.input, this.input.length, weightGoal);

        return `First group best configuration have a quantum entanglement of ${result[0]} for ${result[1]} gifts`;
    }
}

export default new Day24('./inputs/day24.input', 24);