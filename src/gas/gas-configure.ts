import Properties = GoogleAppsScript.Properties.Properties;

import { Configure } from '../interfaces';

export default class GASConfigure implements Configure {
  /**
   * @param properties
   */
  constructor(private properties: Properties) {}

  get(key: string): string | null {
    return this.properties.getProperty(key);
  }

  set(key: string, value: string) {
    this.properties.setProperty(key, value);
  }

  getSheetID(): string | null {
    return this.get('SheetID');
  }
  setSheetID(sheetID: string) {
    this.set('SheetID', sheetID);
  }

  getIgnoreUsers(): string {
    return (
      this.get('IgnoreUsers') || 'miyamoto,hubot,slackbot,incoming-webhook,timesheets,time-sheets'
    );
  }

  setIgnoreUsers(ignoreUsers: string) {
    this.set('IgnoreUsers', ignoreUsers);
  }

  getResponseURL(): string | any {
    return this.get('ResponseURL');
  }

  setResponseURL(responseURL: string) {
    this.set('ResponseURL', responseURL);
  }
}
