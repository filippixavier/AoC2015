import Day from './genericDay.mjs';

class Day13 extends Day {
    getInput() {
        const reg = /(\w+) would (gain|lose) (\d+) happiness units by sitting next to (\w+)\./g;
        return super.getInput().then(input => {
            const nodes = [];
            for (let i = reg.exec(input); i !== null; i = reg.exec(input)) {
                let score = Number(i[3]);
                nodes.push({
                    from: i[1],
                    to: i[4],
                    happiness: i[2] === 'gain' ? score : -score
                });
            }
            return nodes;
        });
    }

    placeGuests(input) {
        let total = 0;

        const guests = [...new Set(input.map(elem => [elem.from, elem.to]).flat(1))];

        const nodes = [{
            happiness: 0,
            remaining: guests.slice(1),
            current: guests[0]
        }];

        while (nodes.length > 0) {
            const node = nodes.shift();

            //Wrap with first guest
            if (node.remaining.length === 0) {
                const firstGuest = guests[0];
                const lastGuest = node.current;
                const {
                    happiness: happinessA
                } = input.find(elem => elem.from === firstGuest && elem.to === lastGuest);
                const {
                    happiness: happinessB
                } = input.find(elem => elem.to === firstGuest && elem.from === lastGuest);

                const happiness = node.happiness + happinessA + happinessB;
                total = Math.max(total, happiness);
                continue;
            }

            for (let candidate of node.remaining) {
                const {
                    happiness: happinessA
                } = input.find(elem => elem.from === node.current && elem.to === candidate);
                const {
                    happiness: happinessB
                } = input.find(elem => elem.to === node.current && elem.from === candidate);
                const remaining = node.remaining.slice();
                remaining.splice(remaining.indexOf(candidate), 1);

                const happiness = node.happiness + happinessA + happinessB;

                const next = {
                    happiness,
                    remaining,
                    current: candidate
                }

                nodes.push(next);
            }
        }

        return total;
    }

    firstStar() {
        return `Max happiness is : ${this.placeGuests(this.input)}`;
    }

    secondStar() {
        const myRelationWithGuests = [...new Set(this.input.map(elem => [elem.from, elem.to]).flat(1))].map(name => [{
            from: 'Me',
            to: name,
            happiness: 0
        }, {
            from: name,
            to: 'Me',
            happiness: 0
        }]).flat();

        return `Max happiness (myselft included) is ${this.placeGuest(this.input.concat(myRelationWithGuests))}`
    }
}

export default new Day13('./inputs/day13.input', 13);