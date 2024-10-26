import express from 'express';
import User from '../models/User';
import axios from 'axios';

const router = express.Router();

router.post('/create-event', async (req:any, res:any) => {
    const { eventName, date, time } = req.body;
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

    const user = await User.findById(req.user._id);
    if (!user) return res.status(401).json({ message: 'Unauthorized' });

    const eventDateTime = `${date}T${time}:00`;
    const event = {
        summary: eventName,
        start: { dateTime: eventDateTime, timeZone: 'America/Los_Angeles' },
        end: { dateTime: eventDateTime, timeZone: 'America/Los_Angeles' },
    };

    try {
        const response = await axios.post(
            'https://www.googleapis.com/calendar/v3/calendars/primary/events',
            event,
            {
                headers: { Authorization: `Bearer ${user.accessToken}` },
            }
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create event', error });
    }
});

export default router;
