import { Timesheet } from './interfaces';

export default class User {
  constructor(readonly username: string, readonly timesheet: Timesheet) {}

  getUsername(): string {
    return this.username;
  }

  getLocale(): string {
    return this.timesheet.getLocale();
  }
}
