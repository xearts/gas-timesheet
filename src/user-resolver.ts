import User from './user';
import { Configure, Sheets } from './interfaces';

export default class UserResolver {
  constructor(private sheets: Sheets, private configure: Configure) {}

  resolve(username: string): User {
    const ignoreUsers = this.configure
      .getIgnoreUsers()
      .split(',')
      .map(val => {
        return val.toLowerCase().trim();
      });

    if (ignoreUsers.indexOf(username) >= 0) {
      return null;
    }

    const timesheet = this.sheets.getTimesheet(username);

    return new User(username, timesheet);
  }
}
