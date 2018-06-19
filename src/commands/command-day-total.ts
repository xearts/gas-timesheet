import * as dayjs from 'dayjs';

import { Command } from '../interfaces';
import Request from '../request';
import Response from '../response';
import I18n from '../i18n';
import Calculator from '../calculator';

export default class CommandDayTotal implements Command {
  constructor(private calculator: Calculator) {}

  execute(request: Request, i18n: I18n): Response {
    const user = request.user;

    const now = dayjs();

    const parsedDate = i18n.parseDate(request.body);

    const date = parsedDate || now;

    const row = user.timesheet.getRow(date);

    if (!row.getSignIn() || !row.getSignOut()) {
      return null;
    }

    this.calculator.calculate(row);

    return new Response(
      i18n.template('dayTotal', {
        username: user.username,
        date: date.format('YYYY/MM/DD'),
        signIn: row.getSignIn().format('HH:mm'),
        signOut: row.getSignOut().format('HH:mm'),
        workedHours: row.getWorkedHours(),
        restTime: row.getRestTimeHours(),
        overtime: row.getOvertimeHours(),
        latetime: row.getLatetimeHours()
      })
    );
  }
}
