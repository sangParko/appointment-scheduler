import React from 'react';
import {
    DateUtil
} from "./date";
import {TimeSlot} from "../components/appointment-scheduler";

test('gets day of week', () => {
    expect(DateUtil.getDayOfWeek(new Date('12/13/2020'))).toEqual('SUN');
    expect(DateUtil.getDayOfWeek(new Date('12/14/2020'))).toEqual('MON');
    expect(DateUtil.getDayOfWeek(new Date('12/15/2020'))).toEqual('TUE');
    expect(DateUtil.getDayOfWeek(new Date('12/16/2020'))).toEqual('WED');
    expect(DateUtil.getDayOfWeek(new Date('12/17/2020'))).toEqual('THU');
    expect(DateUtil.getDayOfWeek(new Date('12/18/2020'))).toEqual('FRI');
    expect(DateUtil.getDayOfWeek(new Date('12/19/2020'))).toEqual('SAT');
});

test('gets day of the month', () => {
    expect(DateUtil.getDayOfMonth(new Date(2020, 12, 13))).toEqual('13');
});

test('gets days of week from date', () => {
    expect(DateUtil.getDaysOfWeekFromDate(new Date()).length).toEqual(7);
    expect(new Date(2020, 12, 13)).toEqual(new Date(2020, 12, 13));
    expect(DateUtil.getDaysOfWeekFromDate(new Date('12/13/2020'))).toEqual([
        new Date('12/13/2020'),
        new Date('12/14/2020'),
        new Date('12/15/2020'),
        new Date('12/16/2020'),
        new Date('12/17/2020'),
        new Date('12/18/2020'),
        new Date('12/19/2020'),
    ]);

    //Still same week, this should return same days.
    expect(DateUtil.getDaysOfWeekFromDate(new Date('12/15/2020'))).toEqual([
        new Date('12/13/2020'),
        new Date('12/14/2020'),
        new Date('12/15/2020'),
        new Date('12/16/2020'),
        new Date('12/17/2020'),
        new Date('12/18/2020'),
        new Date('12/19/2020'),
    ]);
});

test('dates with same year, month, day, hour, minutes are equal', () => {
    const a = new Date(2020, 7, 5, 15, 23);
    const b = new Date(2020, 7, 5, 15, 23);
    expect(DateUtil.equalDates(a, b)).toBe(true);
});

test('withinDay correctly confirms passed in date objects are within the day', () => {
    const day = new Date(2020, 7, 5);
    const dateObject1 = new Date(2020, 7, 5, 11, 0);
    const dateObject2 = new Date(2020, 7, 5, 15, 50);
    expect(DateUtil.withInDay(day, [dateObject1, dateObject2])).toBe(true);
});

test('withinDay correctly detects passed in date objects are not within the day', () => {
    const day = new Date(2020, 7, 5);
    const dateObject1 = new Date(2020, 7, 2, 11, 0);
    const dateObject2 = new Date(1990, 7, 5, 15, 50);
    expect(DateUtil.withInDay(day, [dateObject1, dateObject2])).toBe(false);
});

test('withinDay correctly returns false when dates are empty', () => {
    const day = new Date(2020, 7, 5);
    expect(DateUtil.withInDay(day, [])).toBe(false);
});

test('hoursAndMinutesFromDate correctly extracts hour and minutes from the date', () => {
    const date = new Date(2020, 7, 5, 10, 30);
    expect(DateUtil.hoursAndMinutesFromDate(date)).toBe("10:30");
});

test('removeDateFromDates addDateToDates', () => {
    const date = new Date(2020, 7, 5, 10, 30);
    const date2 = new Date(1234, 5, 5, 10, 30);
    expect(DateUtil.removeDateFromDates([date], date).length).toBe(0);
    expect(DateUtil.addDateToDates([], date).length).toBe(1);
    let dates: Array<Date> = [];
    let dates2 = DateUtil.addDateToDates(dates, date);
    expect(dates.length).toBe(0);
    expect(dates2.length).toBe(1);
    let dates3 = DateUtil.addDateToDates(dates2, date2);
    expect(dates3.length).toBe(2);
    let dates4 = DateUtil.removeDateFromDates(dates3, date2);
    expect(dates3.length).toBe(2);
    expect(dates4.length).toBe(1);
});

test('datesIncludeDate', () => {
    const date = new Date(2020, 7, 5, 10, 30);
    const dates = [new Date(2020, 7, 5, 10, 30, 23, 12)];
    expect(DateUtil.datesIncludeDate(dates, date)).toBe(true);
});


test('pastDay tells if the day is in the past or not', () => {
    const date = new Date(2020, 7, 5, 10, 30);
    expect(DateUtil.pastDay(date)).toBe(true);
    const date2 = new Date(3000, 7, 5, 10, 30);
    expect(DateUtil.pastDay(date2)).toBe(false);
});

test('generateTimeSlots generates time slots for a given day', () => {
    const timeInterval = 30;
    let timeSlots: Array<TimeSlot> = DateUtil.generateTimeSlots(new Date(), timeInterval);
    expect(timeSlots.length).toBe(24 * 2);
    expect((timeSlots[24 * 2 - 1].time).getHours()).toBe(23);
    expect((timeSlots[24 * 2 - 1].time).getMinutes()).toBe(30);
    expect((timeSlots[0].time).getTime() + 47 * 30 * 60 * 1000).toEqual((timeSlots[47].time).getTime());
});

test('generateTimeSlotsForDays generates time slots for days', () => {
    const timeInterval = 30;
    let startDay = new Date();
    let timeSlots: Array<TimeSlot> = DateUtil.generateTimeSlotsForDays(startDay, timeInterval, 14);
    expect(timeSlots.length).toBe(24 * 2 * 14);
    expect((timeSlots[24 * 2 - 1].time).getHours()).toBe(23);
    expect((timeSlots[24 * 2 - 1].time).getMinutes()).toBe(30);
    expect((timeSlots[24 * 2 * 14 - 1].time).getHours()).toBe(23);
    expect((timeSlots[24 * 2 * 14 - 1].time).getMinutes()).toBe(30);
    expect((timeSlots[24 * 2 * 14 - 1].time).getTime()).toEqual((timeSlots[24 * 2 * 14 - 2].time).getTime() + timeInterval * 60 * 1000);
    expect((timeSlots[24 * 2 * 14 - 1].time).getTime()).toEqual((timeSlots[24 * 2 * 2 - 1].time).getTime() + 12 * 24 * 3600 * 1000);
    expect((timeSlots[24 * 2 * 14 - 1].time).getDate()).toBe(startDay.getDate() + 13);
});

test('getCopyOf returns a copy of given date', () => {
    let day = new Date(1999, 5, 10);
    expect(day.getTime()).toEqual(DateUtil.getCopyOf(day).getTime());
    day = new Date(1999, 5, 10, 13);
    expect(day.getTime()).toEqual(DateUtil.getCopyOf(day).getTime());
    day = new Date(1999, 5, 10, 17, 30);
    expect(day.getTime()).toEqual(DateUtil.getCopyOf(day).getTime());
});


//@todo use moment.js instead?


