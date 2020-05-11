import Day from './genericDay.mjs';
import * as crypto from 'crypto';

class Day4 extends Day {
    firstStar() {
        let sekret = 1;
        while(true) {
            const pass = this.input + sekret;

            const hash = crypto.createHash('md5');
            hash.update(pass);

            const result = hash.digest('hex');
            if(result.slice(0, 5) === '00000') {
                return `Response is: ${sekret}`;
            }
            sekret++;
        }
    }

    secondStar() {
        let sekret = 1;
        while(true) {
            const pass = this.input + sekret;

            const hash = crypto.createHash('md5');
            hash.update(pass);

            const result = hash.digest('hex');
            if(result.slice(0, 6) === '000000') {
                return `Response is: ${sekret}`;
            }
            sekret++;
        }
    }
}

export default new Day4('./inputs/day4.input', 4);