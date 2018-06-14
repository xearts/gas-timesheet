import Spreadsheet = GoogleAppsScript.Spreadsheet.Spreadsheet;
import Range = GoogleAppsScript.Spreadsheet.Range;
import * as moment from 'moment';
import Moment = moment.Moment;
import { Row } from '../interfaces';

export class GASRow implements Row {
  constructor(private username: string, private cells: Range) {}

  getUsername(): string {
    return this.username;
  }

  getDate(): Moment {
    return moment(this.cells.getCell(1, 1).getValue()).startOf('day');
  }

  setDate(date: Moment) {
    this.cells.getCell(1, 1).setValue(
      date
        .clone()
        .startOf('day')
        .toDate()
    );
  }

  getSignIn(): Moment {
    const date = this.cells.getCell(1, 2).getValue();
    if (date) {
      return moment(date);
    }
    return null;
  }

  setSignIn(signIn: Moment) {
    this.cells.getCell(1, 2).setValue(signIn.toDate());
  }

  getSignOut(): Moment {
    const date = this.cells.getCell(1, 3).getValue();
    if (date) {
      return moment(date);
    }
    return null;
  }

  setSignOut(signIn: Moment) {
    this.cells.getCell(1, 3).setValue(signIn.toDate());
  }

  getNote(): string {
    return this.cells
      .getCell(1, 4)
      .getValue()
      .toString();
  }

  setNote(note: string) {
    this.cells.getCell(1, 4).setValue(note);
  }

  getRestTimeHours(): number {
    return Number(this.cells.getCell(1, 5).getValue()) || 0;
  }

  setRestTimeHours(restTimeHours: number) {
    this.cells.getCell(1, 5).setValue(restTimeHours);
  }

  getWorkedHours(): number {
    return Number(this.cells.getCell(1, 6).getValue()) || 0;
  }

  setWorkedHours(workedHours: number) {
    this.cells.getCell(1, 6).setValue(workedHours);
  }

  getOvertimeHours(): number {
    return Number(this.cells.getCell(1, 7).getValue()) || 0;
  }

  setOvertimeHours(overtimeHours: number) {
    this.cells.getCell(1, 7).setValue(overtimeHours);
  }

  getLatetimeHours(): number {
    return Number(this.cells.getCell(1, 8).getValue()) || 0;
  }

  setLatetimeHours(latetimeHours: number) {
    this.cells.getCell(1, 8).setValue(latetimeHours);
  }
}
