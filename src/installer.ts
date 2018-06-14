import SpreadsheetApp = GoogleAppsScript.Spreadsheet.SpreadsheetApp;
import {Configure} from "./interfaces";
import {I18nFactory} from "./i18n";
import GASSheets from "./gas/gas-sheets";


export default class Installer {
  constructor(private configure:Configure) {}

  install() {
    const sheetID = this.configure.getSheetID();
    let spreadsheet;
    if (sheetID) {
      spreadsheet = SpreadsheetApp.openById(sheetID);
    }
    if (!spreadsheet) {
      spreadsheet = SpreadsheetApp.create("Gas Timesheets");
      this.configure.setSheetID(spreadsheet.getId());

      const sheets = spreadsheet.getSheets();
      const i18nFactory = new I18nFactory(process.env.LOCALE);
      const i18n = i18nFactory.factory(process.env.LOCALE);

      const gasSheets = new GASSheets(spreadsheet, i18n);
      gasSheets.getTimesheet('_sample');

      spreadsheet.deleteSheet(sheets[0]);
    }

    this.configure.setResponseURL(this.configure.getResponseURL() || "");
    this.configure.setIgnoreUsers(this.configure.getIgnoreUsers());



  }
}
