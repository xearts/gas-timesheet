import {Dayjs} from "dayjs";

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

    getDate(): Dayjs;
    setDate(date: Dayjs);

    getSignIn(): Dayjs;
    setSignIn(signIn: Dayjs);

    getSignOut(): Dayjs;
    setSignOut(signIn: Dayjs);

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
    getStartDate(): Dayjs;
    setStartDate(startDate: Dayjs);
    getRow(date: Dayjs): Row;
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
    round(time: Dayjs): Dayjs;
}

export interface TimeCalculator {
    calculate(signIn: Dayjs, signOut: Dayjs, restTime: number): number;
}
