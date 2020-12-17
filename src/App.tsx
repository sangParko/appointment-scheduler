import React, {useState} from 'react';
import './App.css';
import AppointmentScheduler, {TimeSlot} from './components/appointment-scheduler';
import AppointmentSchedulerAdmin from './components/appointment-scheduler-admin';

const defaultSlots: Array<TimeSlot> = [
    {
        time: new Date(new Date().getTime()),
        slotWindow: 30,
        numOccupied: 0,
        numMaxOccupied: 1,
    },
    {
        time: new Date(new Date().getTime() + 3600 * 1000),
        slotWindow: 30,
        numOccupied: 0,
        numMaxOccupied: 1,
    },
    {
        time: new Date(new Date().getTime() + 3600 * 1000 * 2),
        slotWindow: 30,
        numOccupied: 0,
        numMaxOccupied: 1,
    },
    {
        time: new Date(new Date().getTime() + 3600 * 1000 * 3),
        slotWindow: 30,
        numOccupied: 0,
        numMaxOccupied: 1,
    },
    {
        time: new Date(new Date().getTime() + 3600 * 1000 * 4),
        slotWindow: 30,
        numOccupied: 0,
        numMaxOccupied: 1,
    },
];

function App() {
    const [appointments, setAppointments] = useState<Array<Date>>([]);
    const [timeSlots, setTimeSlots] = useState<Array<TimeSlot>>(defaultSlots);
    const [adminTimeSlots, setAdminTimeSlots] = useState<Array<TimeSlot>>(defaultSlots);
    const handleAdminTimeSlots = (slots: Array<TimeSlot>): void => {
        setAdminTimeSlots(slots);
        setTimeSlots([...slots.filter(s => s.numOccupied === 1)]);
    };

    return (
        <div className="App">
            <AppointmentScheduler
                currentDate={new Date()}
                appointments={appointments}
                setAppointments={setAppointments}
                timeSlots={timeSlots}
            />
            <AppointmentSchedulerAdmin
                currentDate={new Date()}
                appointments={appointments}
                setAppointments={setAppointments}
                timeSlots={adminTimeSlots}
                setTimeSlots={handleAdminTimeSlots}
            />
        </div>
    );
}

export default App;
