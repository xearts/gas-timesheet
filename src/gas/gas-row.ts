import Spreadsheet = GoogleAppsScript.Spreadsheet.Spreadsheet;
import Range = GoogleAppsScript.Spreadsheet.Range;
import * as dayjs from 'dayjs';
import Dayjs = dayjs.Dayjs;
import { Row } from '../interfaces';

export class GASRow implements Row {
  constructor(private username: string, private cells: Range) {}

  getUsername(): string {
    return this.username;
  }

  getDate(): Dayjs {
    return dayjs(
      this.cells
        .getCell(1, 1)
        .getValue()
        .toString()
    ).startOf('day');
  }

  setDate(date: Dayjs) {
    this.cells.getCell(1, 1).setValue(date.startOf('day').toDate());
  }

  getSignIn(): Dayjs {
    const date = this.cells.getCell(1, 2).getValue();
    if (date) {
      return dayjs(date.toString());
    }
    return null;
  }

  setSignIn(signIn: Dayjs) {
    this.cells.getCell(1, 2).setValue(signIn.toDate());
  }

  getSignOut(): Dayjs {
    const date = this.cells.getCell(1, 3).getValue();
    if (date) {
      return dayjs(date.toString());
    }
    return null;
  }

  setSignOut(signIn: Dayjs) {
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
