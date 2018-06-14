// import QW from './util';
// jest.unmock('./util');
import * as moment from 'moment';

import NormalWorkedHoursCalculator from "../../time-calculator/normal-worked-hours-calculator";

describe('NormalWorkedHoursCalculator', () => {
    const sut = new NormalWorkedHoursCalculator;
    describe('calculate()', () => {
        it('signIn:10:00 signOut:19:30 restTime:1', () => {
            const signIn = moment().hour(10).minute(0).second(0);
            const signOut = moment().hour(19).minute(30).second(0);
            const restTime = 1;
            const actual = sut.calculate(signIn, signOut, restTime);
            expect(actual).toBe(8.5);
        });
        it('signIn:22:30 signOut:24:15', () => {
            const signIn = moment().hour(22).minute(30);
            const signOut = moment().hour(24).minute(15);
            const restTime = 0;
            const actual = sut.calculate(signIn, signOut, restTime);
            expect(actual).toBe(1.75);
        });

    });
});
