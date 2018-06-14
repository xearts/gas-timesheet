import * as moment from 'moment';

import { Command } from '../interfaces';
import CommandDayTotal from './command-day-total';
import Request from '../request';
import Response from '../response';
import I18n from '../i18n';

export default class CommandRestHours implements Command {
  constructor(private commandDayTotal?: CommandDayTotal) {}

  execute(request: Request, i18n: I18n): Response {
    const user = request.user;
    const now = moment();

    const restHours = i18n.parseHours(request.body);
    if (!restHours) {
      return null;
    }

    const parsedDate = i18n.parseDate(request.body);

    const date = parsedDate || now;

    const row = user.timesheet.getRow(date);

    let message;
    if (!row.getSignIn()) {
      message = i18n.template('signInFirst', {
        username: user.username,
        date: date.format('YYYY/MM/DD')
      });
    }

    // if (!row.getSignOut()) {
    //   return new Response(i18n.template("signOutFirst", {
    //     username: user.username,
    //     date: date.format('YYYY/MM/DD')
    //   }));
    // }
    else {
      row.setRestTimeHours(restHours);
      message = i18n.template('restHours', {
        username: user.username,
        date: date.format('YYYY/MM/DD'),
        hours: restHours
      });

      if (row.getSignOut() && this.commandDayTotal) {
        const totalRes = this.commandDayTotal.execute(request, i18n);
        if (totalRes) {
          message += '\n' + totalRes.content;
        }
      }
    }

    return new Response(message);
  }
}
