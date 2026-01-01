// Server Entry Point
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health Check
app.get('/', (req, res) => {
    res.json({ status: 'Server is running', database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected' });
});

// MongoDB Connection
if (!process.env.MONGODB_URI) {
    console.error('CRITICAL ERROR: MONGODB_URI is not defined in .env file');
    process.exit(1);
}

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Successfully connected to MongoDB Atlas'))
    .catch(err => {
        console.error('FAILED to connect to MongoDB Atlas:', err.message);
        console.error('Please check your MONGODB_URI in the .env file.');
    });

// Routes
const registrationSchema = new mongoose.Schema({
    personal: {
        name: String,
        age: Number,
    },
    contact: {
        email: String,
        phone: String,
    },
    academic: {
        batch: String,
        enrollmentNo: String,
        degree: String,
        course: String,
    },
    institute: {
        instituteName: String,
    },
    submittedAt: { type: Date, default: Date.now }
});

const Registration = mongoose.model('Registration', registrationSchema);

app.post('/api/register', async (req, res) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            throw new Error('Database is not connected');
        }
        const newRegistration = new Registration(req.body);
        await newRegistration.save();
        res.status(201).json({ message: 'Registration successful!' });
    } catch (error) {
        console.error('SERVER ERROR (POST /api/register):', error.message);
        res.status(500).json({
            error: 'Failed to save registration',
            details: error.message,
            dbStatus: mongoose.connection.readyState
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} `);
});
