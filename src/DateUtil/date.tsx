export class DateUtil {
    /**
     * Given a date object,
     * return three letter string representing day of the week.
     * e.g., SUN or MON
     * @param day
     */
    static getDayOfWeek = (day: Date): string => {
        let res = 'SUN';
        switch (day.getDay()) {
            case 0:
                res = 'SUN';
                break;
            case 1:
                res = 'MON';
                break;
            case 2:
                res = 'TUE';
                break;
            case 3:

                res = 'WED';
                break;
            case 4:
                res = 'THU';
                break;
            case 5:
                res = 'FRI';
                break;
            case 6:
                res = 'SAT';
                break;
        }
        return res;
    };

    /**
     * Give a date object,
     * returns what day of the month it is.
     * e.g., 17 or 23
     * @param d
     */
    static getDayOfMonth = (d: Date): string => {
        return String(d.getDate()).padStart(2, '0');
    };

    /**
     * Returns 7 dates starting from sunday to saturday,
     * including the passed in date.
     * @param d
     */
    static getDaysOfWeekFromDate = (d: Date): Array<Date> => {
        let dates: Array<Date> = [];
        let startingDay = 0 - d.getDay();

        for (let day = startingDay; day < startingDay + 7; day++) {
            let newD = new Date(d.getTime() + day * (60 * 60 * 1000 * 24));
            dates.push(newD);
        }

        return dates;
    };

    /**
     * Returns true if the dates have same year, month, day, hours, minutes
     * @param date1
     * @param date2
     */
    static equalDates = (date1: Date, date2: Date) => {
        if (date1.getFullYear() !== date2.getFullYear() ||
            date1.getMonth() !== date2.getMonth() ||
            date1.getDay() !== date2.getDay() ||
            date1.getHours() !== date2.getHours() ||
            date1.getMinutes() !== date2.getMinutes()) {
            return false;
        }
        return true;
    };

    /**
     * Returns true if the dates are within the same day
     * @param day
     * @param dates
     */
    static withInDay = (day: Date, dates: Date[]) => {
        if (dates.length === 0) {
            return false;
        }

        let ret = true;
        let from = new Date(day.getTime());
        from.setHours(0, 0, 0, 0);
        let to = new Date(day.getTime());
        to.setHours(23, 59, 59, 999);
        dates.forEach(d => {
            if (!d) ret = false;
            if (Object.prototype.toString.call(d) !== Object.prototype.toString.call(new Date())) ret = false;
            if (d < from || d > to) ret = false;
        });
        return ret;
    };

    /**
     * Returns hh:mm from date
     * e.g., 10:30
     * @param date
     */
    static hoursAndMinutesFromDate = (date: Date) => {
        return date.getHours() + ":" + date.getMinutes();
    };

    /**
     * Returns a date array excluding the date
     *
     * @param dates
     * @param date
     */
    static removeDateFromDates = (dates: Date[], date: Date): Array<Date> => {
        return dates.filter(d => !DateUtil.equalDates(d, date));
    };

    /**
     * Returns a date array including the new date
     *
     * @param dates
     * @param date
     */
    static addDateToDates = (dates: Date[], date: Date): Array<Date> => {
        let datesCpy = [...dates];
        datesCpy.push(date);
        return datesCpy;
    };

    /**
     * Returns true if the date array contains a date that has the same y,m,d,h,minutes
     *
     * @param dates
     * @param date
     */
    static datesIncludeDate = (dates: Date[], date: Date) => {
        return dates.filter(d => DateUtil.equalDates(d, date)).length > 0;
    };

    /**
     * Returns true if the passed in date is in the past.
     * Anytime today is not considered to be in the past.
     * @param d
     */
    static pastDay = (d: Date) : boolean => {
        return d < new Date() && !DateUtil.withInDay(new Date(), [d]);
    };
}