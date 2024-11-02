import { useState, useEffect } from 'react';
import axios from 'axios';
import { Event } from '../types/Event';

interface EventFormProps {
    onAddEvent: (newEvent: Event) => void;
    editingEvent?: Event | null;
    onUpdateEvent?: (updatedEvent: Event) => void;
}

const EventForm: React.FC<EventFormProps> = ({ onAddEvent, editingEvent, onUpdateEvent }) => {
    const [eventName, setEventName] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    useEffect(() => {
        if (editingEvent) {
            setEventName(editingEvent.summary);
            setDate(editingEvent.start.dateTime.split('T')[0]);
            setTime(editingEvent.start.dateTime.split('T')[1].substring(0, 5));
        }
    }, [editingEvent]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingEvent && onUpdateEvent) {
                const updatedEvent = { ...editingEvent, summary: eventName, start: { dateTime: `${date}T${time}:00` }, end: { dateTime: `${date}T${time}:00` } };
                await onUpdateEvent(updatedEvent);
            } else {
                const { data } = await axios.post(
                    'http://localhost:4000/api/create-event',
                    { eventName, date, time },
                    { withCredentials: true }
                );
                onAddEvent(data);
            }
            setEventName('');
            setDate('');
            setTime('');
        } catch (error) {
            console.error('Error creating/updating event:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                {editingEvent ? 'Edit Event' : 'Create a New Event'}
            </h3>
            <div className="space-y-2">
                <input
                    type="text"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    placeholder="Event Name"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                />
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                />
                <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                />
            </div>
            <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md transition duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
                {editingEvent ? 'Update Event' : 'Create Event'}
            </button>
        </form>
    );
};

export default EventForm;
