import * as moment from 'moment';

import { Command } from '../interfaces';
import Request from '../request';
import Response from '../response';
import I18n from '../i18n';

export default class CommandSignIn implements Command {
  execute(request: Request, i18n: I18n): Response {
    const user = request.user;

    const now = moment();

    const parsedDate = i18n.parseDate(request.body);
    const parsedTime = i18n.parseTime(request.body);

    const date = parsedDate || now;
    const time = parsedTime || now;
    const row = user.timesheet.getRow(date);

    if (row) {
      if (row.getSignIn()) {
        if (!parsedDate) {
          // already registerd
          return new Response(
            i18n.template('alreadySignedIn', {
              username: user.username,
              date: date.format('YYYY/MM/DD')
            })
          );
        } else {
          // update
          row.setDate(date);
          row.setSignIn(time);
          return new Response(
            i18n.template('signInUpdate', {
              username: user.username,
              datetime: time.format('YYYY/MM/DD HH:mm'),
              date: time.format('YYYY/MM/DD'),
              time: time.format('HH:mm')
            })
          );
        }
      } else {
        row.setDate(date);
        row.setSignIn(time);
        row.setRestTimeHours(1);
        // Hello
        return new Response(
          i18n.template('signIn', {
            username: user.username,
            datetime: time.format('YYYY/MM/DD HH:mm'),
            date: time.format('YYYY/MM/DD'),
            time: time.format('HH:mm')
          })
        );
      }
    }

    return new Response(
      'ivalid date:' +
        date.format('YYYY/MM/DD') +
        ' your start date is:' +
        user.timesheet.getStartDate().format('YYYY/MM/DD')
    );
  }
}
