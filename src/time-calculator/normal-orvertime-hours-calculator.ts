import { Dayjs } from 'dayjs';

import { TimeCalculator } from '../interfaces';
import NormalWorkedHoursCalculator from './normal-worked-hours-calculator';

export default class NormalOvertimeHoursCalculator implements TimeCalculator {
  constructor(private workedHoursCalculator: NormalWorkedHoursCalculator) {}

  calculate(signIn: Dayjs, signOut: Dayjs, restTime: number): number {
    return Math.max(0, this.workedHoursCalculator.calculate(signIn, signOut, restTime) - 8);
  }
}
