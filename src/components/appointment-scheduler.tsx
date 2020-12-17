import React, {useEffect, useState} from 'react';
import {
    DateUtil
} from "../DateUtil/date";

interface props {
    currentDate?: Date;
    timeSlots: Array<TimeSlot>;
    appointments: Array<Date>;
    setAppointments(appointments: Array<Date>): void;
}

export interface TimeSlot {
    time: Date;
    slotWindow: 15 | 30;
    numOccupied: number;
    numMaxOccupied: number;
}

const AppointmentScheduler: React.FC<props> = ({currentDate, timeSlots, appointments, setAppointments}) => {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [displayedDates, setDisplayedDates] = useState<Array<Date>>([]);
    const [timeSlotsOfSelectedDate, setTimeSlotsOfSelectedDate] = useState<Array<TimeSlot>>(timeSlots);

    useEffect(() => {
        currentDate && setSelectedDate(currentDate);
    }, [currentDate]);

    useEffect(() => {
        setDisplayedDates(DateUtil.getDaysOfWeekFromDate(selectedDate));
        setTimeSlotsOfSelectedDate(timeSlots.filter(s => DateUtil.withInDay(selectedDate, [s.time])));
    }, [selectedDate]);

    const moveDate = (days: number) => {
        setSelectedDate(new Date(selectedDate.getTime() + days * 60 * 60 * 1000 * 24));
    };

    const handleSlotClick = (slot: TimeSlot, ind: number) => {
        let timeSlotsCpy = [...timeSlotsOfSelectedDate];
        if (DateUtil.datesIncludeDate(appointments, slot.time)) {
            timeSlotsCpy[ind].numOccupied--;
            setTimeSlotsOfSelectedDate(timeSlotsCpy);
            let newApp = DateUtil.removeDateFromDates(appointments, slot.time);
            setAppointments(newApp);
        } else {
            timeSlotsCpy[ind].numOccupied++;
            setTimeSlotsOfSelectedDate(timeSlotsCpy);
            setAppointments(DateUtil.addDateToDates(appointments, slot.time));
        }
    };

    const getDateClassName = (d: Date): string => {
        let baseName = 'scheduler-date';
        if (DateUtil.pastDay(d)) {
            return baseName + ' disabled';
        }

        return baseName + (DateUtil.equalDates(d, selectedDate) ? ' selected' : '')
    };

    return (
        <div className={'scheduler'}>
            <div className={'scheduler-title'}>
                <p>
                    {selectedDate.toDateString()}
                </p>
            </div>
            <div className={'scheduler-dates'}>
                <div className={'scheduler-arrow'}
                     onClick={() => {
                         moveDate(-7);
                     }}
                >
                    {'<'}
                </div>
                {
                    displayedDates.map((d, ind) =>
                        <div key={ind}
                             onClick={() => {
                                 if (DateUtil.pastDay(d)) {
                                     return;
                                 }
                                 setSelectedDate(d);
                             }}
                             className={getDateClassName(d)}>
                            <div className={'scheduler-date-day-of-month'}>
                                {DateUtil.getDayOfMonth(d)}
                            </div>
                            <div className={'scheduler-date-day-of-week'}>
                                {DateUtil.getDayOfWeek(d)}
                            </div>
                        </div>)
                }
                <div className={'scheduler-arrow'}
                     onClick={() => {
                         moveDate(7);
                     }}>
                    {'>'}
                </div>
            </div>

            <div className={'scheduler-time-slots'}>
                {
                    timeSlotsOfSelectedDate && timeSlotsOfSelectedDate.map((slot, ind) =>
                        <div key={ind}
                             onClick={() => {
                                 handleSlotClick(slot, ind);
                             }}
                             className={'scheduler-time-slot' + (slot.numOccupied >= slot.numMaxOccupied ? ' selected' : '')}>
                            <p className={'scheduler-time selected'}>
                                {DateUtil.hoursAndMinutesFromDate(slot.time)}
                            </p>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default AppointmentScheduler as any;
