// import QW from './util';
// jest.unmock('./util');
import * as dayjs from 'dayjs';

import QuoterHourTimeRounder from "../../time-calculator/quoter-hour-time-rounder";
import NormalLatetimeHoursCalculator from "../../time-calculator/normal-latetime-hours-calculator";


describe('NormalLatetimeHoursCalculator', () => {
    const sut = new NormalLatetimeHoursCalculator;
    describe('calculate()', () => {
        it('signtIn:12:00 signOut:23:30', () => {
            const signIn = dayjs().set('hour', 12).set('minute', 0);
            const signOut = dayjs().set('hour', 23).set('minute', 30);
            const restTime = 0;
            const actual = sut.calculate(signIn, signOut, restTime);
            expect(actual).toBe(1.5);
        });
        it('signtIn:22:30 signOut:24:15', () => {
            const signIn = dayjs().set('hour', 22).set('minute', 30);
            const signOut = dayjs().set('hour', 24).set('minute', 15);
            const restTime = 0;
            const actual = sut.calculate(signIn, signOut, restTime);
            expect(actual).toBe(1.75);
        });

    });
});
