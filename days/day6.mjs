import Day from './genericDay.mjs';

class Day6 extends Day {
    getInput() {
        return super.getInput().then(input => {
            return input.trim().split('\n').map(line => {
                const digits = /(\d+),(\d+)/g;
                const lights = {act: '', from: 0, to: 0};
                if (line.indexOf('turn on') !== -1) {
                    lights.act = '+'
                } else if(line.indexOf('turn off') !== -1) {
                    lights.act = '-';
                } else {
                    lights.act = '!';
                }

                let match = digits.exec(line);
                lights.from = [Number(match[1]), Number(match[2])];
                match = digits.exec(line);
                lights.to = [Number(match[1]), Number(match[2])];

                return lights 
            });
        });
    }

    firstStar() {
        let lights = (Array(1_000_000)).fill(false);

        for (let action of this.input) {
            switch(action.act) {
                case '+':
                    for(let i = action.from[0]; i <= action.to[0]; i++) {
                        for(let j = action.from[1]; j <= action.to[1]; j++) {
                            lights[i * 1000 + j] = true;
                        }
                    }
                    break;
                case '-':
                    for(let i = action.from[0]; i <= action.to[0]; i++) {
                        for(let j = action.from[1]; j <= action.to[1]; j++) {
                            lights[i * 1000 + j] = false;
                        }
                    }
                    break;
                case '!':
                    for(let i = action.from[0]; i <= action.to[0]; i++) {
                        for(let j = action.from[1]; j <= action.to[1]; j++) {
                            lights[i * 1000 + j] = !lights[i * 1000 + j];
                        }
                    }
                    break;
            }
        }
        return `There is ${lights.reduce((acc, value) => acc + value, 0)} lights on`;
    }

    secondStar() {
        let lights = (Array(1_000_000)).fill(0);

        for (let action of this.input) {
            switch(action.act) {
                case '+':
                    for(let i = action.from[0]; i <= action.to[0]; i++) {
                        for(let j = action.from[1]; j <= action.to[1]; j++) {
                            lights[i * 1000 + j]++;
                        }
                    }
                    break;
                case '-':
                    for(let i = action.from[0]; i <= action.to[0]; i++) {
                        for(let j = action.from[1]; j <= action.to[1]; j++) {
                            lights[i * 1000 + j] = Math.max(0, lights[i * 1000 + j] - 1);
                        }
                    }
                    break;
                case '!':
                    for(let i = action.from[0]; i <= action.to[0]; i++) {
                        for(let j = action.from[1]; j <= action.to[1]; j++) {
                            lights[i * 1000 + j] += 2;
                        }
                    }
                    break;
            }
        }
        return `Total brightness value is ${lights.reduce((acc, value) => acc + value, 0)}`;
    }
}

export default new Day6('./inputs/day6.input', 6);