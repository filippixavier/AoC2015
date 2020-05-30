import * as fs from 'fs';

import Day from './genericDay.mjs';

class Day21 extends Day {
    constructor(inventory, boss, day) {
        super(inventory, day);
        this.bossPath = boss;
    }

    async getInput() {
        const inventoryReg = /(.+)\s+(\d+)\s+(\d+)\s+(\d+)/g;
        const bossStats = /(\d+)/g;
        
        const inventory = await new Promise((resolve, reject) => {
            fs.readFile(this.path, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data.toString());
                }
            });
        });

        const boss = await new Promise((resolve, reject) => {
            fs.readFile(this.bossPath, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data.toString());
                }
            });
        });


        const inventoryPerCategories = inventory.split(/\w+:\s+Cost  Damage  Armor/g);
        inventoryPerCategories.shift();

        const stock = [];

        for (let categories of inventoryPerCategories) {
            const items = [];
            for (let item of categories.matchAll(inventoryReg)) {
                items.push({
                    name: item[1].trim(),
                    cost: parseInt(item[2], 10),
                    dmg: parseInt(item[3], 10),
                    armor: parseInt(item[4], 10)
                });
            }
            stock.push(items);
        }


        this.boss = [...boss.matchAll(bossStats)].map(elem => parseInt(elem[1], 10));

        return stock;
    }

    firstStar() {
        let minSum = Infinity;

        const [bHp, bAtk, bDef] = this.boss;
        const [weapons, armors, rings] = this.input;
        const pHp = 100;

        for (let weapon of weapons) {
            for (let armor of armors) {
                const atk = weapon.dmg;
                const def = armor.armor;
                const cost = armor.cost + weapon.cost;

                const numOfTurn = Math.ceil(pHp / Math.min(1, bAtk - def));
                const effectiveAtk = Math.min(1, atk - bDef);

                if (numOfTurn * effectiveAtk >= bHp) {
                    minSum = Math.min(minSum, cost);
                }

                for (let i = 0; i < rings.length - 1; i++) {
                    const ring1 = rings[i];
                    const otherRings = rings.slice(i + 1);

                    const atk1 = atk + ring1.dmg;

                    const def1 = def + ring1.armor;
                    const def1Armorless = ring1.armor;

                    const cost1 = cost + ring1.cost;
                    const cost1Armorless = cost1 - armor.cost;

                    const numOfTurn = Math.ceil(pHp / Math.max(1, bAtk - def1));
                    const effectiveAtk = Math.max(1, atk1 - bDef);

                    if (numOfTurn * effectiveAtk >= bHp) {
                        minSum = Math.min(minSum, cost1);
                    }

                    const numOfTurnA = Math.ceil(pHp / Math.max(1, bAtk - def1Armorless));

                    if (numOfTurnA * effectiveAtk >= bHp) {
                        minSum = Math.min(minSum, cost1Armorless);
                    }


                    for (let ring2 of otherRings) {
                        const atk2 = atk1 + ring2.dmg;

                        const def2 = def1 + ring2.armor;
                        const def2Armorless = def1Armorless + ring2.armor;

                        const cost2 = cost1 + ring2.cost;
                        const cost2Armorless = cost1Armorless + ring2.cost;

                        const numOfTurn = Math.ceil(pHp / Math.max(1, bAtk - def2));
                        const effectiveAtk = Math.max(1, atk2 - bDef);

                        if (numOfTurn * effectiveAtk >= bHp) {
                            minSum = Math.min(minSum, cost2);
                        }

                        const numOfTurnA = Math.ceil(pHp / Math.max(1, bAtk - def2Armorless));

                        if (numOfTurnA * effectiveAtk >= bHp) {
                            minSum = Math.min(minSum, cost2Armorless);
                        }
                    }
                }
            }
        }

        return `Can win by spending a minimum of ${minSum} Golds`;
    }

    secondStar() {
        let maxSum = -Infinity;
        
        const [bHp, bAtk, bDef] = this.boss;
        const [weapons, armors, rings] = this.input;
        const pHp = 100;

        for (let weapon of weapons) {
            for (let armor of armors) {
                const atk = weapon.dmg;
                const def = armor.armor;
                const cost = armor.cost + weapon.cost;

                const numOfTurn = Math.ceil(pHp / Math.min(1, bAtk - def));
                const effectiveAtk = Math.min(1, atk - bDef);

                if (numOfTurn * effectiveAtk < bHp) {
                    maxSum = Math.max(maxSum, cost);
                }

                for (let i = 0; i < rings.length - 1; i++) {
                    const ring1 = rings[i];
                    const otherRings = rings.slice(i + 1);

                    const atk1 = atk + ring1.dmg;

                    const def1 = def + ring1.armor;
                    const def1Armorless = ring1.armor;

                    const cost1 = cost + ring1.cost;
                    const cost1Armorless = cost1 - armor.cost;

                    const numOfTurn = Math.ceil(pHp / Math.max(1, bAtk - def1));
                    const effectiveAtk = Math.max(1, atk1 - bDef);

                    if (numOfTurn * effectiveAtk < bHp) {
                        maxSum = Math.max(maxSum, cost1);
                    }

                    const numOfTurnA = Math.ceil(pHp / Math.max(1, bAtk - def1Armorless));

                    if (numOfTurnA * effectiveAtk < bHp) {
                        maxSum = Math.max(maxSum, cost1Armorless);
                    }


                    for (let ring2 of otherRings) {
                        const atk2 = atk1 + ring2.dmg;

                        const def2 = def1 + ring2.armor;
                        const def2Armorless = def1Armorless + ring2.armor;

                        const cost2 = cost1 + ring2.cost;
                        const cost2Armorless = cost1Armorless + ring2.cost;

                        const numOfTurn = Math.ceil(pHp / Math.max(1, bAtk - def2));
                        const effectiveAtk = Math.max(1, atk2 - bDef);

                        if (numOfTurn * effectiveAtk < bHp) {
                            maxSum = Math.max(maxSum, cost2);
                        }

                        const numOfTurnA = Math.ceil(pHp / Math.max(1, bAtk - def2Armorless));

                        if (numOfTurnA * effectiveAtk < bHp) {
                            maxSum = Math.max(maxSum, cost2Armorless);
                        }
                    }
                }
            }
        }

        return `Can spend up to ${maxSum} golds and still lose`;
    }
}

export default new Day21('./inputs/day21-1.input', './inputs/day21-2.input', 21);