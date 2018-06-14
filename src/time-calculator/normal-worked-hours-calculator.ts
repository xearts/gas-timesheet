import { Moment } from 'moment';

import { TimeCalculator } from '../interfaces';

export default class NormalWorkedHoursCalculator implements TimeCalculator {
  calculate(signIn: Moment, signOut: Moment, restTime: number): number {
    return Math.max(
      0,
      signOut
        .clone()
        .startOf('minutes')
        .diff(signIn.clone().startOf('minutes'), 'hours', true) - restTime
    );
  }
}
