import Day from './genericDay.mjs';

class Day12 extends Day {
    firstStar() {
        const reg = /-?\d+/g;
        return this.input.match(reg).reduce((acc, item) => acc + Number(item), 0);
    }

    secondStar() {
        const parsed = JSON.parse(this.input);
        const nodes = [parsed];
        let current = 0;

        while (nodes.length > 0) {
            let node = nodes.pop();
            if (!Array.isArray(node) && Object.values(node).includes('red')) continue;
            for (let i of Object.keys(node)) {
                if (typeof node[i] === 'object') {
                    nodes.push(node[i]);
                } else if (typeof node[i] === 'number') {
                    current += node[i];
                }
            }
        }
        return current;
    }
}

export default new Day12('./inputs/day12.input', 12);