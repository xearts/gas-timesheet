import _ from 'lodash';
import * as dayjs from 'dayjs';
import Spreadsheet = GoogleAppsScript.Spreadsheet.Spreadsheet;
import Sheet = GoogleAppsScript.Spreadsheet.Sheet;

import I18n from '../i18n';
import GASTimesheet from './gas-timesheet';
import { Sheets, Timesheet } from '../interfaces';

export default class GASSheets implements Sheets {
  private sheets: { [username: string]: Timesheet } = {};

  constructor(private spreadsheet: Spreadsheet, private i18n: I18n) {}

  private createSheet(username: string): Sheet {
    const sheet = this.spreadsheet.insertSheet(username);
    if (!sheet) {
      throw 'Error: Could not create sheet for ' + username;
    }

    this.i18n.getColumns().forEach(function(value, index) {
      sheet.getRange(String.fromCharCode(65 + index) + '2').setValue(value);
    });

    sheet.getRange('A1:B1').setValues([['locale', this.i18n.locale()]]);

    sheet.getRange('A2:A').setNumberFormat('YYYY-MM-DD');
    sheet.getRange('B2:B').setNumberFormat('hh:mm');
    sheet.getRange('C2:C').setNumberFormat('hh:mm');

    sheet.getRange('A3').setValue(dayjs().toDate());
    return sheet;
  }

  getTimesheet(username: string): Timesheet {
    if (!this.sheets[username]) {
      let sheet = this.spreadsheet.getSheetByName(username);
      if (!sheet) {
        sheet = this.createSheet(username);
      }

      this.sheets[username] = new GASTimesheet(sheet);
    }

    return this.sheets[username];
  }

  getUsernames(): string[] {
    return _.compact(
      _.map(this.spreadsheet.getSheets(), function(s) {
        const name = s.getName();
        return String(name).substr(0, 1) == '_' ? undefined : name;
      })
    );
  }
}
