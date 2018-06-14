import * as moment from 'moment';

import { Command } from '../interfaces';
import Request from '../request';
import Response from '../response';
import I18n from '../i18n';
import CommandDayTotal from './command-day-total';

export default class CommandSignOut implements Command {
  constructor(private commandDayTotal?: CommandDayTotal) {}

  execute(request: Request, i18n: I18n): Response {
    const now = moment();
    const user = request.user;
    const timesheet = user.timesheet;

    const parsedDate = i18n.parseDate(request.body);
    const parsedTime = i18n.parseTime(request.body);

    const date = parsedDate || now;
    const time = parsedTime || now;

    const row = timesheet.getRow(date);

    if (!row.getSignIn()) {
      return new Response(
        i18n.template('signInFirst', {
          username: user.username,
          date: date.format('YYYY/MM/DD')
        })
      );
    }

    if (row.getSignOut() && !parsedDate) {
      return new Response(
        i18n.template('alreadySignedOut', {
          username: user.username,
          date: date.format('YYYY/MM/DD')
        })
      );
    }

    let message = '';

    row.setSignOut(time);
    if (row.getSignOut()) {
      message = i18n.template('signOutUpdate', {
        username: user.username,
        datetime: time.format('YYYY/MM/DD HH:mm'),
        date: time.format('YYYY/MM/DD'),
        time: time.format('HH:mm')
      });
    } else {
      message = i18n.template('signOut', {
        username: user.username,
        datetime: time.format('YYYY/MM/DD HH:mm'),
        date: time.format('YYYY/MM/DD'),
        time: time.format('HH:mm')
      });
    }

    if (this.commandDayTotal) {
      const totalResponse = this.commandDayTotal.execute(request, i18n);
      if (totalResponse) {
        message += '\n' + totalResponse.content;
      }
    }

    return new Response(message);
  }
}
