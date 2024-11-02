import { Event } from '../types/Event';
import { FaEdit, FaTrash, FaLink } from 'react-icons/fa';

interface EventsTableProps {
    events: Event[];
    onUpdateEvent: (event: Event) => void;
    onDeleteEvent: (eventId: string) => void;
}

const EventsTable: React.FC<EventsTableProps> = ({ events, onUpdateEvent, onDeleteEvent }) => (
    <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead className="bg-blue-600 text-white">
                <tr>
                    <th className="py-3 px-4 text-left text-sm font-semibold">Event Name</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold">Start</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold">End</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold">Description</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold">Location</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold">Link</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold">Actions</th>
                </tr>
            </thead>
            <tbody>
                {events.map((event, index) => (
                    <tr key={index} className="transition duration-200 hover:bg-gray-100">
                        <td className="py-4 px-4 border-b border-gray-200">{event.summary}</td>
                        <td className="py-4 px-4 border-b border-gray-200">{event.start.dateTime}</td>
                        <td className="py-4 px-4 border-b border-gray-200">{event.end.dateTime}</td>
                        <td className="py-4 px-4 border-b border-gray-200">{event.description}</td>
                        <td className="py-4 px-4 border-b border-gray-200">{event.location}</td>
                        <td className="py-4 px-4 border-b border-gray-200">
                            {event.htmlLink && (
                                <a
                                    href={event.htmlLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline"
                                >
                                    <FaLink />
                                </a>
                            )}
                        </td>
                        <td className="py-4 px-4 border-b border-gray-200 flex space-x-2">
                            <button
                                onClick={() => onUpdateEvent(event)}
                                className="text-yellow-500 hover:text-yellow-700"
                            >
                                <FaEdit />
                            </button>
                            <button
                                onClick={() => onDeleteEvent(event.id)}
                                className="text-red-500 hover:text-red-700"
                            >
                                <FaTrash />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

export default EventsTable;
