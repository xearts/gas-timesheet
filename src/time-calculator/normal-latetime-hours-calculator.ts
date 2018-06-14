import * as moment from 'moment';
import Moment = moment.Moment;

import { TimeCalculator } from '../interfaces';

export default class NormalLatetimeHoursCalculator implements TimeCalculator {
  calculate(signIn: Moment, signOut: Moment, restTime: number): number {
    return Math.max(
      0,
      signOut
        .clone()
        .startOf('minutes')
        .diff(
          moment.max(
            signIn
              .clone()
              .hour(22)
              .startOf('hours'),
            signIn.clone().startOf('minutes')
          ),
          'hours',
          true
        )
    );
  }
}
