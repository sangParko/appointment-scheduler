import React, {useState} from 'react';
import './App.css';
import AppointmentScheduler, {TimeSlot} from './components/appointment-scheduler';

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
    return (
        <div className="App">
            <AppointmentScheduler
                currentDate={new Date()}
                appointments={appointments}
                setAppointments={setAppointments}
                timeSlots={defaultSlots}
            />
        </div>
    );
}

export default App;
