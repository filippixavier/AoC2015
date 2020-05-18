import Day from './genericDay.mjs';

function* runningDeer(speed, activeTime, restTime) {
    let elapsedTime = 0;
    let distance = 0;
    let isActive = true;
    let chrono = activeTime;

    while (true) {
        elapsedTime++;
        if (chrono-- === 0) {
            isActive = !isActive;
            chrono = isActive ? activeTime - 1 : restTime - 1;
        }
        if (isActive) {
            distance += speed;
        }

        yield distance;
    }
}

class Day14 extends Day {
    getInput() {
        const reg = /(\w+).*?(\d+).*?(\d+).*?(\d+)/g;
        return super.getInput().then(input => {
            return [...input.matchAll(reg)].map(match => ({
                name: match[1],
                speed: Number(match[2]),
                activeTime: Number(match[3]),
                restTime: Number(match[4])
            }));
        });
    }

    firstStar() {
        const deers = this.input.map(deer => ({
            name: deer.name,
            run: runningDeer(deer.speed, deer.activeTime, deer.restTime)
        }));
        let results = []

        for (let i = 0; i < 2503; i++) {
            results = deers.map(deer => ({
                name: deer.name,
                distance: deer.run.next().value
            }));
        }

        const first = results.sort((a, b) => b.distance - a.distance)[0];

        return `${first.name} is first, having covered ${first.distance} kms in 2503 seconds`;
    }

    secondStar() {
        const deers = this.input.map(deer => ({
            name: deer.name,
            run: runningDeer(deer.speed, deer.activeTime, deer.restTime)
        }));

        const score = this.input.reduce((acc, deer) => {
            acc[deer.name] = 0;
            return acc
        }, {});

        for (let i = 0; i < 2503; i++) {
            const results = deers.map(deer => ({
                name: deer.name,
                distance: deer.run.next().value
            })).sort((a, b) => b.distance - a.distance);

            const currentMax = results[0].distance;
            for (let deer of results) {
                if (deer.distance !== currentMax) {
                    break;
                }
                score[deer.name]++;
            }
        }

        const first = [...Object.entries(score)].sort((a, b) => b[1] - a[1])[0];

        return `${first[0]} is first, having scored ${first[1]} points in 2503 seconds`;
    }
}
export default new Day14('./inputs/day14.input', 14);