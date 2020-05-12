import Day from './genericDay.mjs';

const BITMASK = 2 ** 16 - 1;

function alternate() {
    // This is an alternate, more complex solution using Proxy, has the advantage of only run through the input array once, but is a bit less readable, and use a bit more memory for the event system
    // I COULD also use a system with promises 
    const wires = {};
    const twoInputsReg = /(\w+|\d+) (AND|OR|LSHIFT|RSHIFT) (\w+|\d+)/;
    const notInputReg = /NOT (\w+|\d+)/;
    const oneInputReg = /(\w+|\d+)/;

    const trap = {
        set(obj, prop, value) {
            obj[prop] = value;
            events.emit(prop, value);
            return true;
        }
    };

    const events = {
        add(name, clb) {
            if (!this[name]) {
                this[name] = [];
            }
            this[name].push(clb);
        },
        emit(name, value) {
            if (this[name]) {
                for (let clb of this[name]) {
                    clb();
                }
            }
        }
    };

    const proxy = new Proxy(wires, trap);

    const twoInputsFn = (firstInput, operator, secondInput, wireName) => {
        let first = isNaN(firstInput) ? wires[firstInput] : Number(firstInput);
        let second = isNaN(secondInput) ? wires[secondInput] : Number(secondInput);


        if (first === void 0 || second === void 0) {
            return;
        }

        if (!first && !second) {
            console.log('NOPE', firstInput, wires[firstInput], secondInput, wireName);
        }

        switch (operator) {
            case 'AND':
                proxy[wireName] = first & second;
                break;
            case 'OR':
                proxy[wireName] = first | second;
                break;
            case 'LSHIFT':
                proxy[wireName] = (first << second) & BITMASK;
                break;
            case 'RSHIFT':
                proxy[wireName] = first >> second;
                break;
        }
    }

    for (let line of this.input) {
        let twoInputs = line[0].match(twoInputsReg);
        let notInput = line[0].match(notInputReg);
        let oneInput = line[0].match(oneInputReg);
        let wireName = line[1];

        if (twoInputs) {
            let [, firstInput, operator, secondInput] = twoInputs;

            if (isNaN(firstInput) && !wires.hasOwnProperty(firstInput) || isNaN(secondInput) && !wires.hasOwnProperty(secondInput)) {
                if (isNaN(firstInput) && !wires.hasOwnProperty(firstInput)) {
                    events.add(firstInput, () => twoInputsFn(firstInput, operator, secondInput, wireName));
                }
                if (isNaN(secondInput) && !wires.hasOwnProperty(secondInput)) {
                    events.add(secondInput, () => twoInputsFn(firstInput, operator, secondInput, wireName));
                }
                continue;
            }
            twoInputsFn(firstInput, operator, secondInput, wireName);

        } else if (notInput) {
            // Assuming that a NOT operation will always use a wire
            let input = notInput[1];
            if (!wires.hasOwnProperty(input)) {
                events.add(input, () => {
                    proxy[wireName] = (~wires[input]) & BITMASK;
                });
                continue;
            }
            proxy[wireName] = (~wires[input]) & BITMASK;
        } else {
            if (isNaN(oneInput[1]) && !wires.hasOwnProperty(oneInput[1])) {
                events.add(oneInput[1], () => {
                    proxy[wireName] = wires[oneInput[1]];
                });
                continue;
            }
            let value = isNaN(oneInput[1]) ? wires[oneInput[1]] : Number(oneInput[1]);
            proxy[wireName] = value;
        }
    }
    return wires.a;
}

class Day7 extends Day {
    getInput() {
        return super.getInput().then(input => input.trim().split('\n').map(line => line.trim().split(' -> ')));
    }

    runCircuit(starter = {}) {
        const wires = starter;
        const twoInputsReg = /(\w+|\d+) (AND|OR|LSHIFT|RSHIFT) (\w+|\d+)/;
        const notInputReg = /NOT (\w+|\d+)/;
        const oneInputReg = /(\w+|\d+)/;

        while (Object.keys(wires).length < this.input.length) {
            for (let line of this.input) {
                if (wires.hasOwnProperty(line[1])) {
                    continue;
                }
                let twoInputs = line[0].match(twoInputsReg);
                let notInput = line[0].match(notInputReg);
                let oneInput = line[0].match(oneInputReg);

                if (twoInputs) {
                    let [, firstInput, operator, secondInput] = twoInputs;

                    if (isNaN(firstInput) && !wires.hasOwnProperty(firstInput) || isNaN(secondInput) && !wires.hasOwnProperty(secondInput)) {
                        continue;
                    }
                    firstInput = isNaN(firstInput) ? wires[firstInput] : Number(firstInput);
                    secondInput = isNaN(secondInput) ? wires[secondInput] : Number(secondInput);

                    switch (operator) {
                        case 'AND':
                            wires[line[1]] = firstInput & secondInput;
                            break;
                        case 'OR':
                            wires[line[1]] = firstInput | secondInput;
                            break;
                        case 'LSHIFT':
                            wires[line[1]] = (firstInput << secondInput) & BITMASK;
                            break;
                        case 'RSHIFT':
                            wires[line[1]] = firstInput >> secondInput;
                            break;
                    }

                } else if (notInput) {
                    // Assuming that a NOT operation will always use a wire
                    let input = notInput[1];
                    if (!wires.hasOwnProperty(input)) {
                        continue;
                    }
                    wires[line[1]] = (~wires[input]) & BITMASK;
                } else {
                    if (isNaN(oneInput[1]) && !wires.hasOwnProperty(oneInput[1])) {
                        continue;
                    }
                    let value = isNaN(oneInput[1]) ? wires[oneInput[1]] : Number(oneInput[1]);
                    wires[line[1]] = value;
                }
            }
        }
        return wires.a;
    }

    firstStar() {
        return `Wire A have value: ${this.runCircuit()}`;
    }

    secondStar() {
        const wires = {
            b: this.runCircuit()
        }
        return `This time, wire A have value: ${this.runCircuit(wires)}`
    }
}

export default new Day7('./inputs/day7.input', 7);