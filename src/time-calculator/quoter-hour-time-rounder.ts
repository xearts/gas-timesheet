import { Dayjs } from 'dayjs';

import { TimeRounder } from '../interfaces';

export default class QuoterHourTimeRounder implements TimeRounder {
  round(time: Dayjs): Dayjs {
    const rounded = time.startOf('minute');
    const minutes = rounded.minute();
    return rounded.subtract(minutes % 15 || 15, 'minute').add(15, 'minute');
  }
}
