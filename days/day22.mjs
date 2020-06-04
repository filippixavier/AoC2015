import Day from './genericDay.mjs';

const spells = [{
    name: 'magic missile',
    cost: 53,
    dmg: 4
}, {
    name: 'drain',
    cost: 73,
    dmg: 2,
    heal: 2
}, {
    name: 'shield',
    cost: 113,
    effect: 6,
    armor: 7
}, {
    name: 'poison',
    cost: 173,
    effect: 6,
    edmg: 3
}, {
    name: 'recharge',
    cost: 229,
    effect: 5,
    mana: 101
}];

class GameState {
    constructor(bHp = 100, spent = 0, hp = 50, mana = 500, isBossTurn) {
        this.playerHP = hp;
        this.playerMana = mana;

        this.manaSpent = spent;

        this.bossHp = bHp;

        this.spellsStatus = {
            shield: 0,
            poison: 0,
            recharge: 0
        };

        this.isBossTurn = isBossTurn;
    }
}

class Day22 extends Day {
    getInput() {
        return super.getInput().then(input => {
            return [...input.matchAll(/(\d+)/g)].map(elem => Number(elem[0]));
        });
    }

    firstStar(hardmode = false) {
        const [bHp, bAtk] = this.input;
        const stack = [new GameState(bHp)];

        let manaSpent = Infinity;

        while(stack.length) {
            // Basically shortest path to boss's death
            stack.sort((a, b) => {
                if(a.bossHp === b.bossHp) {
                    return a.manaSpent - b.manaSpent;
                }
                return a.bossHp - b.bossHp;
            });

            const turn = stack.shift();

            if(turn.manaSpent > manaSpent) {
                continue;
            }

            const nextTurnGeneric = new GameState(turn.bossHp, turn.manaSpent, turn.playerHP, turn.playerMana, !turn.isBossTurn);

            if(!turn.isBossTurn && hardmode) {
                nextTurnGeneric.playerHP--;
                if(nextTurnGeneric.playerHP <= 0) {
                    continue;
                }
            }

            if(turn.spellsStatus.poison > 0) {
                nextTurnGeneric.bossHp -= spells.find(elem => elem.name === 'poison').edmg;
                nextTurnGeneric.spellsStatus.poison = turn.spellsStatus.poison - 1;
            }

            if(turn.spellsStatus.recharge > 0) {
                nextTurnGeneric.playerMana += spells.find(elem => elem.name === 'recharge').mana;
                nextTurnGeneric.spellsStatus.recharge = turn.spellsStatus.recharge - 1;
            }

            if(turn.spellsStatus.shield > 0) {
                nextTurnGeneric.spellsStatus.shield = turn.spellsStatus.shield - 1;
            }

            nextTurnGeneric.isBossTurn != turn.isBossTurn;

            if(nextTurnGeneric.bossHp <= 0) {
                manaSpent = Math.min(manaSpent, nextTurnGeneric.manaSpent);
                continue;
            }

            if(turn.isBossTurn) {
                nextTurnGeneric.playerHP = turn.playerHP - (turn.spellsStatus.shield > 0 ? Math.max(1, bAtk - spells.find(elem => elem.name === 'shield').armor) : bAtk);
                if(nextTurnGeneric.playerHP <= 0) {
                    continue;
                }
                stack.unshift(nextTurnGeneric);
            } else {
                const availableSpells = spells.filter(elem => elem.cost <= nextTurnGeneric.playerMana && !nextTurnGeneric.spellsStatus[elem.name]);

                if(availableSpells.length === 0) {
                    continue;
                }

                for(let spell of availableSpells) {
                    const nextTurnSpell = new GameState(nextTurnGeneric.bossHp, nextTurnGeneric.manaSpent + spell.cost, nextTurnGeneric.playerHP, nextTurnGeneric.playerMana - spell.cost, nextTurnGeneric.isBossTurn);

                    Object.assign(nextTurnSpell.spellsStatus, nextTurnGeneric.spellsStatus);

                    if(spell.effect) {
                        nextTurnSpell.spellsStatus[spell.name] = spell.effect;
                    }

                    if(spell.heal) {
                        nextTurnSpell.playerHP += spell.heal;
                    }

                    if(spell.dmg) {
                        nextTurnSpell.bossHp -= spell.dmg;
                    }

                    if(nextTurnSpell.bossHp <= 0) {
                        manaSpent = Math.min(manaSpent, nextTurnSpell.manaSpent);
                        continue;
                    }
                    stack.unshift(nextTurnSpell);
                }
            }
        }
        return `Require a minimum of ${manaSpent} mana to defeat the BBEG`;
    }

    secondStar() {
        return this.firstStar(true);
    }
    // 1269 too low
}

export default new Day22('./inputs/day22.input', 22);