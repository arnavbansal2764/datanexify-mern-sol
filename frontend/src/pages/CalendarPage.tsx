import { useState } from 'react';
import { Event } from '../types/Event';
import EventForm from '../components/EventForm';
import EventsTable from '../components/EventsTable';

const CalendarPage: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);

    const addEvent = (newEvent: Event) => {
        setEvents([...events, newEvent]);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-200 via-pink-200 to-red-200 p-4">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-xl w-full">
                <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">Create Calendar Event</h2>
                <EventForm onAddEvent={addEvent} />
            </div>

            <div className="mt-6 w-full max-w-3xl">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Upcoming Events</h3>
                <EventsTable events={events} />
            </div>
        </div>
    );
};

export default CalendarPage;
