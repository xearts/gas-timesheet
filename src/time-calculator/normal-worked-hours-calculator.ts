import { Dayjs } from 'dayjs';

import { TimeCalculator } from '../interfaces';

export default class NormalWorkedHoursCalculator implements TimeCalculator {
  calculate(signIn: Dayjs, signOut: Dayjs, restTime: number): number {
    return Math.max(
      0,
      signOut.startOf('minute').diff(signIn.startOf('minute'), 'hour', true) - restTime
    );
  }
}
