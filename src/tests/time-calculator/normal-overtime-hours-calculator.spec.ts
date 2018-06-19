// import QW from './util';
// jest.unmock('./util');
import * as dayjs from 'dayjs';

import NormalWorkedHoursCalculator from "../../time-calculator/normal-worked-hours-calculator";
import NormalOvertimeHoursCalculator from "../../time-calculator/normal-orvertime-hours-calculator";

describe('NormalOvertimeHoursCalculator', () => {
    const sut = new NormalOvertimeHoursCalculator(new NormalWorkedHoursCalculator);
    describe('calculate()', () => {
        it('signIn:10:00 signOut:19:30 restTime:1', () => {
            const signIn = dayjs().set('hour', 10).set('minute', 0).set('second', 0);
            const signOut = dayjs().set('hour', 19).set('minute', 30).set('second', 0);
            const restTime = 1;
            const actual = sut.calculate(signIn, signOut, restTime);
            expect(actual).toBe(0.5);
        });
        it('signIn:22:30 signOut:24:15', () => {
            const signIn = dayjs().set('hour', 22).set('minute', 30);
            const signOut = dayjs().set('hour', 24).set('minute', 15);
            const restTime = 0;
            const actual = sut.calculate(signIn, signOut, restTime);
            expect(actual).toBe(0);
        });

    });
});
