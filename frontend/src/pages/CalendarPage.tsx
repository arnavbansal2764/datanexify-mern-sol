import { useEffect, useState } from 'react';
import { Event as CalendarEvent } from '../types/Event';
import EventForm from '../components/EventForm';
import EventsTable from '../components/EventsTable';
import axios from 'axios';

const CalendarPage: React.FC = () => {
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);

    const addEvent = (newEvent: CalendarEvent) => {
        setEvents([...events, newEvent]);
    };

    const updateEvent = async (updatedEvent: CalendarEvent) => {
        try {
            const { data } = await axios.put(
                `http://localhost:4000/api/update-event/${updatedEvent.id}`,
                updatedEvent,
                { withCredentials: true }
            );
            setEvents(events.map(event => (event.id === updatedEvent.id ? data : event)));
            setEditingEvent(null);
        } catch (error) {
            console.error('Error updating event:', error);
        }
    };

    const deleteEvent = async (eventId: string) => {
        try {
            await axios.delete(`http://localhost:4000/api/delete-event/${eventId}`, { withCredentials: true });
            setEvents(events.filter(event => event.id !== eventId));
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    const fetchEvents = async () => {
        try {
            const { data } = await axios.get('http://localhost:4000/api/events', { withCredentials: true });
            setEvents(data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    useEffect(() => {
        fetchEvents();
        const interval = setInterval(fetchEvents, 60000); // Fetch events every minute

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-200 via-pink-200 to-red-200 p-4">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-xl w-full">
                <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
                    {editingEvent ? 'Edit Calendar Event' : 'Create Calendar Event'}
                </h2>
                <EventForm onAddEvent={addEvent} onUpdateEvent={updateEvent} editingEvent={editingEvent} />
            </div>

            <div className="mt-6 w-full max-w-3xl">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Upcoming Events</h3>
                <EventsTable events={events} onUpdateEvent={setEditingEvent} onDeleteEvent={deleteEvent} />
            </div>
        </div>
    );
};

export default CalendarPage;
