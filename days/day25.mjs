import Day from './genericDay.mjs';

class Day25 extends Day {
    getInput() {
        const digits = /.*?(\d+).*?(\d+)/;
        return super.getInput().then(input => input.match(digits).slice(1).map(Number));
    }

    firstStar() {
        const diagTarget = this.input[0] + this.input[1] - 1;
        let numOfCalculations = diagTarget * (diagTarget + 1) /2;

        numOfCalculations = numOfCalculations - (this.input[0] - 1);

        let code = 20151125;
        const mul = 252533;
        const mod = 33554393;

        for(let i = 2; i <= numOfCalculations; i++) { //The first calculation is the initial value
            code = (code * mul) % mod;
        }

        return `Please enter ${code} to start the weather machine`;
    }

    secondStar() {
        return 'Not needed, thank you for playing ;)'
    }
}

export default new Day25('./inputs/day25.input', 25);