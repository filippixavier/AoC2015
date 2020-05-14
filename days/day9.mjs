import Day from './genericDay.mjs';

class Day9 extends Day {
    getInput() {
        const reg = /(\w+) to (\w+) = (\d+)/;
        return super.getInput().then(input => {
            return input.trim().split('\n').map(line => {
                const [, from, to, dist] = line.trim().match(reg);

                return {
                    from,
                    to,
                    dist: Number(dist)
                }
            });
        });
    }

    bfs(filter, initializer) {
        const starters = new Set(this.input.map((elem) => [elem.from, elem.to]).reduce((acc, elem) => acc.concat(elem)), []);

        const nodes = [...starters].map(city => {
            return {
                city,
                dist: 0,
                visited: new Set([city])
            };
        });

        let value = initializer;

        while (nodes.length > 0) {
            let node = nodes.shift();

            let candidates = this.input.filter(path => {
                return (path.from === node.city && !node.visited.has(path.to)) || (path.to === node.city && !node.visited.has(path.from));
            }).map(elem => {
                return {
                    city: elem.from === node.city ? elem.to : elem.from,
                    dist: node.dist + elem.dist,
                    visited: new Set([...node.visited, elem.from === node.city ? elem.to : elem.from])
                }
            });

            if (candidates.length === 0) {
                value = filter(value, node.dist);
            }

            nodes.push(...candidates);
        }

        return value;
    }

    firstStar() {
        return `Shortest path is ${this.bfs(Math.min, Infinity)}`;
    }

    secondStar() {
        return `Longest path is ${this.bfs(Math.max, 0)}`;
    }
}

export default new Day9('./inputs/day9.input', 9);