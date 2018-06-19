import * as dayjs from 'dayjs';
import Dayjs = dayjs.Dayjs;

import { TimeCalculator } from '../interfaces';

export default class NormalLatetimeHoursCalculator implements TimeCalculator {
  calculate(signIn: Dayjs, signOut: Dayjs, restTime: number): number {
    let time = signIn.set('hour', 22).startOf('hour');
    if (time.isBefore(signIn)) {
      time = signIn.startOf('minute');
    }

    return Math.max(0, signOut.startOf('minute').diff(time, 'hour', true));
  }
}
