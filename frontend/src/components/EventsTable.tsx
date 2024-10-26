import { Event } from '../types/Event';

interface EventsTableProps {
    events: Event[];
}

const EventsTable: React.FC<EventsTableProps> = ({ events }) => (
    <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead className="bg-blue-600 text-white">
                <tr>
                    <th className="py-3 px-4 text-left text-sm font-semibold">Event Name</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold">Start</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold">End</th>
                </tr>
            </thead>
            <tbody>
                {events.map((event, index) => (
                    <tr key={index} className="transition duration-200 hover:bg-gray-100">
                        <td className="py-4 px-4 border-b border-gray-200">{event.summary}</td>
                        <td className="py-4 px-4 border-b border-gray-200">{event.start.dateTime}</td>
                        <td className="py-4 px-4 border-b border-gray-200">{event.end.dateTime}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

export default EventsTable;
