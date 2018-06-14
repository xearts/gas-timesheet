import Properties = GoogleAppsScript.Properties.Properties;
import Spreadsheet = GoogleAppsScript.Spreadsheet.Spreadsheet;
import * as Bottle from "bottlejs";

import {Configure, RequestFactory, ResponseHandler, Sheets, TimeCalculator, TimeRounder} from "./interfaces";
import CommandHelp from "./commands/command-help";
import CommandRegistry from "./commands/command-registry";
import CommandResolver from "./commands/command-resolver";
import CommandSignIn from "./commands/command-sign-in";
import CommandSignOut from "./commands/command-sign-out";
import GASConfigure from "./gas/gas-configure";
import GASSheets from "./gas/gas-sheets";
import Installer from "./installer";
import SlackRequestFactory from "./slack/slack-request-factory";
import SlackResponseHandler from "./slack/slack-response-handler";
import I18n, {I18nFactory} from "./i18n";
import UserResolver from "./user-resolver";
import QuoterHourTimeRounder from "./time-calculator/quoter-hour-time-rounder";
import NormalWorkedHoursCalculator from "./time-calculator/normal-worked-hours-calculator";
import NormalOvertimeHoursCalculator from "./time-calculator/normal-orvertime-hours-calculator";
import NormalLatetimeHoursCalculator from "./time-calculator/normal-latetime-hours-calculator";
import Calculator from "./calculator";
import CommandDayTotal from "./commands/command-day-total";
import CommandRestHours from "./commands/command-rest-hours";
import CommandNoRest from "./commands/command-no-rest";


declare var process: any;

export default class Application extends Bottle {

    boot() {

        this.constant('LOCALE', process.env.LOCALE);
        this.constant('SLACK_INCOMING_URL', process.env.SLACK_INCOMING_URL);
        this.constant('SLACK_OUTGOING_TOKEN', process.env.SLACK_OUTGOING_TOKEN);

        this.factory('ScriptProperties', (container) => {
            return PropertiesService.getScriptProperties();
        });

        this.serviceFactory<Configure>('Configure', (propertyes:Properties) => {
            return new GASConfigure(propertyes)
        }, 'ScriptProperties');

        this.serviceFactory<Spreadsheet>('Spreadsheet', (configure:Configure) => {
            return SpreadsheetApp.openById(configure.getSheetID());
        }, 'Configure');

        this.serviceFactory<I18nFactory>('I18nFactory', (defaultLocale: string) => {
            return new I18nFactory(defaultLocale);
        }, 'LOCALE');

        this.serviceFactory<I18n>('DefaultI18n', (factory:I18nFactory, locale: string) => {
            return factory.factory(locale);
        }, 'I18nFactory', 'LOCALE');



        this.serviceFactory<Sheets>('Sheets', (spreadsheet: Spreadsheet, defaultI18n: I18n) => {
            return new GASSheets(spreadsheet, defaultI18n);
        }, 'Spreadsheet', 'DefaultI18n');

        this.serviceFactory<UserResolver>('UserResolver', (sheets: Sheets, configure: Configure) => {
            return new UserResolver(sheets, configure);
        }, 'Sheets', 'Configure');

        this.serviceFactory<RequestFactory>('RequestFactory', (userResolver: UserResolver, token: string) => {
            return new SlackRequestFactory(userResolver, token);
        }, 'UserResolver', 'SLACK_OUTGOING_TOKEN');


        this.factory('CommandRegistry', (container) => {
            return new CommandRegistry(container);
        });

        this.serviceFactory<CommandResolver>('CommandResolver', (commandRegistry: CommandRegistry, i18nFacotry: I18nFactory) => {
            return new CommandResolver(commandRegistry, i18nFacotry);
        }, 'CommandRegistry', 'I18nFactory');




        this.serviceFactory<CommandHelp>('CommandHelp', () => {
            return new CommandHelp();
        });
        this.serviceFactory<CommandSignIn>('CommandSignIn', () => {
            return new CommandSignIn();
        });
        this.serviceFactory<CommandSignOut>('CommandSignOut', (commandDayTotal: CommandDayTotal) => {
            return new CommandSignOut(commandDayTotal);
        }, 'CommandDayTotal');
        this.serviceFactory<CommandDayTotal>('CommandDayTotal', (calculator: Calculator) => {
            return new CommandDayTotal(calculator);
        }, 'Calculator');
        this.serviceFactory<CommandRestHours>('CommandRestHours', (commandDayTotal: CommandDayTotal) => {
            return new CommandRestHours(commandDayTotal);
        }, 'CommandDayTotal');
        this.serviceFactory<CommandNoRest>('CommandNoRest', (commandDayTotal: CommandDayTotal) => {
            return new CommandNoRest(commandDayTotal);
        }, 'CommandDayTotal');





        this.serviceFactory<ResponseHandler>('ResponseHandler', (slackIncomingURL: string) => {
            return new SlackResponseHandler(slackIncomingURL);
        }, 'SLACK_INCOMING_URL');



        this.serviceFactory<TimeRounder>('TimeRounder', () => {
            return new QuoterHourTimeRounder();
        });
        this.serviceFactory<TimeCalculator>('WorkedHoursCalculator', () => {
            return new NormalWorkedHoursCalculator();
        });
        this.serviceFactory<TimeCalculator>('OvertimeHoursCalculator', (workedHoursCalculator: NormalWorkedHoursCalculator) => {
            return new NormalOvertimeHoursCalculator(workedHoursCalculator);
        }, 'WorkedHoursCalculator');
        this.serviceFactory<TimeCalculator>('LatetimeHoursCalculator', () => {
            return new NormalLatetimeHoursCalculator();
        });
        this.serviceFactory<Calculator>('Calculator', (timeRounder: TimeRounder, workedCalc: TimeCalculator, overtimeCalc: TimeCalculator, latetimeCalc: TimeCalculator) => {
            return new Calculator(timeRounder, workedCalc, overtimeCalc, latetimeCalc);
        }, 'TimeRounder', 'WorkedHoursCalculator', 'OvertimeHoursCalculator', 'LatetimeHoursCalculator');





        this.serviceFactory<Installer>('Installer', (configure: Configure) => {
            return new Installer(configure);
        }, 'Configure');


    }

    run() {

    }
};
