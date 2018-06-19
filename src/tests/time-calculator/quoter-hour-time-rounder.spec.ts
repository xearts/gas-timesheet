// import QW from './util';
// jest.unmock('./util');
import * as dayjs from 'dayjs';

import QuoterHourTimeRounder from "../../time-calculator/quoter-hour-time-rounder";


describe('QuoterHourTimeRounder', () => {
    const sut = new QuoterHourTimeRounder;
    describe('round()', () => {
        it('10:00', () => {
            const time = dayjs().set('hour', 10).set('minute', 0);
            const actual = sut.round(time);
            expect(actual.format('HH:mm')).toBe('10:00');
        });
        it('10:05', () => {
            const time = dayjs().set('hour', 10).set('minute', 5);
            const actual = sut.round(time);
            expect(actual.format('HH:mm')).toBe('10:15');
        });
        it('11:15', () => {
            const time = dayjs().set('hour', 11).set('minute', 15);
            const actual = sut.round(time);
            expect(actual.format('HH:mm')).toBe('11:15');
        });
        it('11:44', () => {
            const time = dayjs().set('hour', 11).set('minute', 44);
            const actual = sut.round(time);
            expect(actual.format('HH:mm')).toBe('11:45');
        });
        it('11:46', () => {
            const time = dayjs().set('hour', 11).set('minute', 46);
            const actual = sut.round(time);
            expect(actual.format('HH:mm')).toBe('12:00');
        });
    });
});
