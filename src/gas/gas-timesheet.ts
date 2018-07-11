import Spreadsheet = GoogleAppsScript.Spreadsheet.Spreadsheet;
import Sheet = GoogleAppsScript.Spreadsheet.Sheet;
import * as dayjs from 'dayjs';
import Dayjs = dayjs.Dayjs;

import { Row, Timesheet } from '../interfaces';
import Range = GoogleAppsScript.Spreadsheet.Range;
import { GASRow } from './gas-row';

export default class GASTimesheet implements Timesheet {
  private username: string;
  private locale: string;

  constructor(private sheet: Sheet) {
    this.username = this.sheet.getName();
    this.locale = this.sheet
      .getRange('B1')
      .getValue()
      .toString();
  }

  getUserName(): string {
    return this.username;
  }

  getLocale(): string {
    return this.locale;
  }

  setLocale(locale: string) {
    this.locale = locale;
    this.sheet.getRange('B1').setValue(locale);
  }

  getStartDate(): Dayjs {
    const date = this.sheet.getRange('A3').getValue();
    return dayjs(date.toString()).startOf('day');
  }

  setStartDate(startDate: Dayjs) {
    this.sheet.getRange('A3').setValue(
      startDate
        .clone()
        .startOf('day')
        .toDate()
    );
  }

  getRow(date: Dayjs): Row {
    const range = this.getRange(date);
    if (range) {
      return new GASRow(this.getUserName(), range);
    }
    return null;
  }

  private getRange(date: Dayjs): Range {
    const diff = date.startOf('day').diff(this.getStartDate(), 'day');

    if (diff >= 0) {
      return this.sheet.getRange(3 + diff, 1, 1, 8);
    }
    return null;
  }
}
