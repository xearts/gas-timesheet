
import {Row, TimeCalculator, TimeRounder} from "./interfaces";

export default class Calculator {


    constructor(private timeRounder: TimeRounder, private workedHoursCalculator: TimeCalculator, private orvertimeHoursCalculator: TimeCalculator, private latetimeHoursCalculator: TimeCalculator){}

    calculate(row: Row) {

        if (!row.getSignIn() || !row.getSignOut()) {
            return;
        }


        const signIn = this.timeRounder.round(row.getSignIn());
        const signOut = this.timeRounder.round(row.getSignOut());
        const restTime = row.getRestTimeHours() || 0;

        row.setWorkedHours(this.workedHoursCalculator.calculate(signIn, signOut, restTime));
        row.setOvertimeHours(this.orvertimeHoursCalculator.calculate(signIn, signOut, restTime));
        row.setLatetimeHours(this.latetimeHoursCalculator.calculate(signIn, signOut, restTime));

    }
}
