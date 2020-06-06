import Day from './genericDay.mjs';

class Computer {
    #instructions = [];
    #pointer = 0;

    a = 0;
    b = 0;

    constructor(instructions) {
        this.#instructions = instructions;
    }

    hlf(reg) {
        this[reg] /= 2;
        this.#pointer++;
    }

    tpl(reg) {
        this[reg] *= 3;
        this.#pointer++;
    }

    inc(reg) {
        this[reg]++;
        this.#pointer++;
    }

    jmp(reg= 'a', offset) {
        this.#pointer += offset;
    }

    jie(reg, offset) {
        if(this[reg] % 2 === 0) {
           this.#pointer += offset; 
        } else {
            this.#pointer++;
        }
    }

    jio(reg, offset) {
        if(this[reg] === 1) {
            this.#pointer += offset;
        } else {
            this.#pointer++;
        }
    }

    step() {
        const inst = this.#instructions[this.#pointer];
        if(inst) {
            this[inst.name](inst.reg, inst.val);
            return true;
        }
        return false;
    }

    run() {
        while(this.step());
    }
}

class Day23 extends Day {
    getInput() {
        const lineReg = /(\w+) (\w)?(?:, )?([+-]\d+)?/g;
        return super.getInput().then(input => {
            return [...input.matchAll(lineReg)].map(result => {
                return {
                    name: result[1],
                    reg: result[2],
                    val: Number(result[3]) || 0
                }
            })
        });
    }

    firstStar() {
        const machine = new Computer(this.input);
        machine.run();
        return machine.b;
    }

    secondStar() {
        const machine = new Computer(this.input);
        machine.a = 1;
        machine.run();
        return machine.b;
    }
}

export default new Day23('./inputs/day23.input', 23);