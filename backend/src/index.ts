import express from 'express';
import session from 'express-session';
import passport from 'passport';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import './config/passport';
import calendarRoutes from './routes/calendar';

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO_URI!);


app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(
    session({
        secret: 'arnaviscool',
        resave: false,
        saveUninitialized: true,
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['profile', 'https://www.googleapis.com/auth/calendar'] })
);

app.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('http://localhost:5173/calendar');
    }
);

app.use('/api', calendarRoutes);

app.listen(4000, () => console.log('Server running on http://localhost:4000'));
