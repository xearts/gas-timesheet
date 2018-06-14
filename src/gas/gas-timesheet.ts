import Spreadsheet = GoogleAppsScript.Spreadsheet.Spreadsheet;
import Sheet = GoogleAppsScript.Spreadsheet.Sheet;
import * as moment from 'moment';
import Moment = moment.Moment;

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

  getStartDate(): Moment {
    const date = this.sheet.getRange('A3').getValue();
    return moment(date).startOf('day');
  }

  setStartDate(startDate: Moment) {
    this.sheet.getRange('A3').setValue(
      startDate
        .clone()
        .startOf('day')
        .toDate()
    );
  }

  getRow(date: Moment): Row {
    const range = this.getRange(date);
    if (range) {
      return new GASRow(this.getUserName(), range);
    }
    return null;
  }

  private getRange(date: Moment): Range {
    const diff = date
      .clone()
      .startOf('day')
      .diff(this.getStartDate(), 'days');

    if (diff >= 0) {
      return this.sheet.getRange(3 + diff, 1, 1, 8);
    }
    return null;
  }
}
