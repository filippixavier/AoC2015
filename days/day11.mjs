import Day from './genericDay.mjs';

class Day11 extends Day {
    nextPw(previous) {
        const chars = previous.map(char => char.charCodeAt(0));
        const nonValid = /[iol]/g;
        const repeating = /(\w)\1/g;
        while(true) {
            let isValid = [false, false, false];
            for(let i = chars.length - 1; i >= 0; i--) {
                chars[i] += 1;
                if(chars[i] === 123) {
                    chars[i] = 97;
                } else {
                    break;
                }
            }
            for(let i = 0; i < chars.length - 3; i++) {
                if (chars[i + 1] - chars[i] === 1 && chars[i + 2] - chars[i + 1] === 1) {
                    isValid[0] = true;
                    break;
                }
            }
            let nextPw = chars.reduce((acc, char) => acc + String.fromCharCode(char), '');
            isValid[1] = !nonValid.test(nextPw);
            isValid[2] = nextPw.match(repeating)?.length >= 2;
            if(isValid[0] && isValid[1] && isValid[2]) {
                break;
            }
        }
        return chars.reduce((acc, char) => acc + String.fromCharCode(char), '');
    }

    firstStar() {
        console.log(`Next password is: ${this.nextPw(this.input.split(''))}`);
    }

    secondStar() {
        console.log(`Next password is: ${this.nextPw(this.nextPw(this.input.split('')).split(''))}`);
    }
}

export default new Day11('./inputs/day11.input', 11);