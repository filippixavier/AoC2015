import Day from './genericDay.mjs';

// Too bad it's too long...

/*class Day20 extends Day {
    getInput() {
        return super.getInput().then(Number);
    }

    allMultiplesOf(arr = [], sets = new Set(arr), score = 1) {
        if (arr.length === 0) {
            return;
        }

        for (let i = 0; i < arr.length; i++) {
            let num = score * arr[i];
            let subArray = arr.slice(i + 1);

            sets.add(num);

            this.allMultiplesOf(subArray, sets, num);
        }

        return sets
    }

    *house() {
        const primes = [];
        let i = 1;

        while (true) {
            let j = i;
            const candidates = primes.filter(elem => i % elem === 0 && elem !== 1);

            if(i % 1000 === 0) {
                console.log(primes.length);
            }

            const decomposition = [1];

            if (candidates.length) {
                while (j > 1) {
                    if (primes.includes(j)) {
                        decomposition.push(j);
                        break;
                    }
                    for (let prime of candidates) {
                        if (j % prime === 0) {
                            decomposition.push(prime);
                            j /= prime;
                            break;
                        }
                    }
                }
            } else {
                primes.push(i);
                decomposition.push(i);
            }

            let sum = [...this.allMultiplesOf(decomposition)].reduce((acc, elem) => acc + elem);
            i++;


            yield sum * 10;
        }
    }

    firstStar() {
        let j = 0;
        for (let i of this.house()) {
            if (i >= this.input) {
                return j;
            }
            j++;
        }
    }
}*/

class Day20 extends Day {
    getInput() {
        return super.getInput().then(Number);
    }

    // "Heavily" inspired by the megathread, turns out it's just faster to go and fill the houses
    houses(max, gifts=10, limit=Infinity) {
        const giftsPerHouses = [0];

        let lastHouse = max / 10;

        for(let elf = 1; elf <= lastHouse; elf++) {
            for(let number = elf, count = 0; number <= lastHouse && count < limit; number += elf, count++) {
                giftsPerHouses[number] = (giftsPerHouses[number] || 0) + elf * gifts;
            }
        }

        return giftsPerHouses;
    }

    firstStar() {
        return this.houses(this.input).findIndex(elem => elem >= this.input);
    }

    secondStar() {
        return this.houses(this.input, 11, 50).findIndex(elem => elem >= this.input);
    }
}

export default new Day20('./inputs/day20.input', 20);