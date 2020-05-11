import Day from './genericDay.mjs';

class Day5 extends Day {
    getInput() {
        return super.getInput().then(input => input.trim().split('\n'));
    }

    firstStar() {
        const vowels = /[aeiou]/g;
        const repeter = /(\w)\1/g;
        const naughty = /ab|cd|pq|xy/g;

        const niceStringsCount = this.input.filter(line => {
            const vowelsCount = line.match(vowels)?.length;
            const repeterCount = line.match(repeter)?.length;
            const naughtyCount = line.match(naughty)?.length;

            return vowelsCount >= 3 && repeterCount && !naughtyCount;
        });

        return `There are ${niceStringsCount.length} nice strings`;
    }

    secondStar() {
        const repeter = /(\w\w)\w*\1/g;
        const sandwich = /(\w)\w\1/g;

        const niceStringsCount = this.input.filter(line => {
            const repeterCount = line.match(repeter)?.length;
            const sandwichCount = line.match(sandwich)?.length;

            return repeterCount && sandwichCount;
        });

        return `There are ${niceStringsCount.length} nice strings`;
    }
}

export default new Day5('./inputs/day5.input', 5);