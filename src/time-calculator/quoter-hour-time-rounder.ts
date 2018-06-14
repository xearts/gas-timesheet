import { Moment } from 'moment';

import { TimeRounder } from '../interfaces';

export default class QuoterHourTimeRounder implements TimeRounder {
  round(time: Moment): Moment {
    const rounded = time.clone().startOf('minutes');
    const minutes = rounded.minutes();
    return rounded.subtract(minutes % 15 || 15, 'minutes').add(15, 'minutes');
  }
}
