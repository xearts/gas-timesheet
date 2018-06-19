import * as Polyglot from 'node-polyglot';
import * as dayjs from 'dayjs';
import Dayjs = dayjs.Dayjs;
import _ from 'lodash';

import Messages from './messages';


export default class I18n extends Polyglot {

    constructor(locale: string, private messages: {[key: string]:{}}) {
        super({phrases: messages, locale: locale});
    }

    public getCommands(): {[key:string]:string} {
        return this.messages.commands;
    }

    public getColumns(): string[] {
        const columns = this.messages.columns;
        return Object.keys(columns).map(key => columns[key]);
    }

    public template(key: string, option?: {}) {
        return  this.t('template.' + key, option);
    }


    public parseTime(str: string): Dayjs | null {

        const reg = new RegExp('((\\d{1,2})\\s*[:'
            + this.t('dateTimeSettings.oclock')
            + ']{1}\\s*(\\d{1,2})\\s*('
            + this.t('dateTimeSettings.am')
            + '|'
            + this.t('dateTimeSettings.pm')
            + '|)|(\\d{1,2})('
            + this.t('dateTimeSettings.am') + '|'
            + this.t('dateTimeSettings.pm')
            + ')|(\\d{1,2})\\s*'
            + this.t('dateTimeSettings.oclock')
            + ')',
            'i');
        const matches = str.match(reg);

        if (matches) {
            let hour = 0, min = 0;

            // 10:30, 17:30, 8:30am, 5:00pm, etc
            if (matches[2] != null) {
                hour = parseInt(matches[2]);
                min = parseInt(matches[3] ? matches[3] : '0');
            }

            // 9am, 5pm, etc
            if (matches[5] != null) {
                hour = parseInt(matches[5]);
            }

            // 5pm, 3:30pm, etc -> 17:00, 15:30, etc
            if (matches.indexOf(this.t("dateTimeSettings.pm")) > -1) {
                if (hour !== 12)
                    hour += 12;
            }

            // 9oclock, 18oclock, etc
            if (matches[7] != null) {
                hour = parseInt(matches[7]);
            }
            return dayjs().set('hour', hour).set('minute', min).set('second', 0);
        }
        return null;
    };

    // get date from string
    public parseDate(str: string): Dayjs | null {

        const regTomorrow = new RegExp(this.t('dateTimeSettings.tomorrow'), 'i');
        if (str.match(regTomorrow)) {
            return dayjs().add(1, 'day').startOf('day');
        }

        const regToday = new RegExp(this.t('dateTimeSettings.today'), 'i');
        if (str.match(regToday)) {
            return dayjs().startOf('day');
        }

        const regYesterday = new RegExp(this.t('dateTimeSettings.yesterday'), 'i');
        if (str.match(regYesterday)) {
            return dayjs().subtract(1, 'day').startOf('day');
        }

        const reg = /((\d{4})[-\/年]{1})(\d{1,2})[-\/月]{1}(\d{1,2})/;
        const matches = str.match(reg);
        if (matches) {
            let year = parseInt(matches[2]);
            let month = parseInt(matches[3]);
            let day = parseInt(matches[4]);
            const now = dayjs();
            if (_.isNaN(year) || year < 1970) {
                //
                if ((now.month() + 1) >= 11 && month <= 2) {
                    year = now.year() + 1;
                }
                else if ((now.month() + 1) <= 2 && month >= 11) {
                    year = now.year() - 1;
                }
                else {
                    year = now.year();
                }
            }

            return dayjs(`${year}-${month}-${day}`);
        }

        return null;
    };


    public parseHours(str: string): number | null {
        const regex = new RegExp('(\\d*\\.?\\d)\\s*' + this.t('dateTimeSettings.hours'), 'i');
        const matches = str.match(regex);
        if (matches) {
            return Number(matches[1]);
        }
        return null;
    }

}

export class I18nFactory {
    private messages: Messages;
    constructor(private defaultLocale: string) {
        this.messages = new Messages;
    }
    factory(locale: string) {
        if (!locale) {
            return new I18n(this.defaultLocale, this.messages.get(this.defaultLocale));
        }
        return new I18n(locale, this.messages.get(locale));
    }
}
