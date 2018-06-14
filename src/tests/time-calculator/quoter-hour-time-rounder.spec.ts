// import QW from './util';
// jest.unmock('./util');
import * as moment from 'moment';

import QuoterHourTimeRounder from "../../time-calculator/quoter-hour-time-rounder";


describe('QuoterHourTimeRounder', () => {
    const sut = new QuoterHourTimeRounder;
    describe('round()', () => {
        it('10:00', () => {
            const time = moment().hour(10).minute(0);
            const actual = sut.round(time);
            expect(actual.format('HH:mm')).toBe('10:00');
        });
        it('10:05', () => {
            const time = moment().hour(10).minute(5);
            const actual = sut.round(time);
            expect(actual.format('HH:mm')).toBe('10:15');
        });
        it('11:15', () => {
            const time = moment().hour(11).minute(15);
            const actual = sut.round(time);
            expect(actual.format('HH:mm')).toBe('11:15');
        });
        it('11:44', () => {
            const time = moment().hour(11).minute(44);
            const actual = sut.round(time);
            expect(actual.format('HH:mm')).toBe('11:45');
        });
        it('11:46', () => {
            const time = moment().hour(11).minute(46);
            const actual = sut.round(time);
            expect(actual.format('HH:mm')).toBe('12:00');
        });
    });
});
