// import QW from './util';
// jest.unmock('./util');
import * as moment from 'moment';

import QuoterHourTimeRounder from "../../time-calculator/quoter-hour-time-rounder";
import NormalLatetimeHoursCalculator from "../../time-calculator/normal-latetime-hours-calculator";


describe('NormalLatetimeHoursCalculator', () => {
    const sut = new NormalLatetimeHoursCalculator;
    describe('calculate()', () => {
        it('signtIn:12:00 signOut:23:30', () => {
            const signIn = moment().hour(12).minute(0);
            const signOut = moment().hour(23).minute(30);
            const restTime = 0;
            const actual = sut.calculate(signIn, signOut, restTime);
            expect(actual).toBe(1.5);
        });
        it('signtIn:22:30 signOut:24:15', () => {
            const signIn = moment().hour(22).minute(30);
            const signOut = moment().hour(24).minute(15);
            const restTime = 0;
            const actual = sut.calculate(signIn, signOut, restTime);
            expect(actual).toBe(1.75);
        });

    });
});
