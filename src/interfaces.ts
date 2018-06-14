import {Moment} from "moment";

import Request from './request';
import Response from './response';
import I18n from "./i18n";

export interface Configure {
    get(key: string): string | null;
    set(key: string, value: string);
    getSheetID(): string | null;
    setSheetID(sheetID: string);
    getIgnoreUsers(): string;
    setIgnoreUsers(ignoreUsers: string);
    getResponseURL(): string | null;
    setResponseURL(responseURL: string);
}


export interface Row {
    getUsername(): string;

    getDate(): Moment;
    setDate(date: Moment);

    getSignIn(): Moment;
    setSignIn(signIn: Moment);

    getSignOut(): Moment;
    setSignOut(signIn: Moment);

    getNote(): string;
    setNote(note: string);

    getRestTimeHours(): number;
    setRestTimeHours(restTime: number);

    getWorkedHours(): number;
    setWorkedHours(workedHour: number);

    getOvertimeHours(): number;
    setOvertimeHours(workedHour: number);

    getLatetimeHours(): number;
    setLatetimeHours(workedHour: number);

}

export interface Sheets {
    getTimesheet(username: string): Timesheet;
    getUsernames(): string[];
}

export interface Timesheet {
    getUserName(): string;
    getLocale(): string;
    setLocale(locale: string);
    getStartDate(): Moment;
    setStartDate(startDate: Moment);
    getRow(date: Moment): Row;
}

export interface RequestFactory {
    factory({
                queryString,
                parameter,
                parameters,
                contextPath,
                contentLength,
                postData
            }: {
        queryString?: string | null;
        parameter: { [key: string]: string };
        parameters: { [key: string]: string[] };
        contextPath: string;
        contentLength: number;
        postData?: {};
    }): Request;
}

export interface Command {
    execute(request: Request, i18n: I18n): Response;
}

export interface ResponseHandler {
    handle(response: Response);
}

export interface TimeRounder {
    round(time: Moment): Moment;
}

export interface TimeCalculator {
    calculate(signIn: Moment, signOut: Moment, restTime: number): number;
}
