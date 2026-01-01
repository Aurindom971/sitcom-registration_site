import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, 'server', '.env') });

const uri = process.env.MONGODB_URI;
console.log('--- Database Diagnostic Tool ---');
console.log('Target URI:', uri?.replace(/:([^@]+)@/, ':****@'));

if (!uri) {
    console.error('ERROR: MONGODB_URI is missing from server/.env');
    process.exit(1);
}

// Set a shorter timeout for diagnostic purposes
const options = {
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 5000,
};

console.log('Status: Attempting connection (5s timeout)...');

mongoose.connect(uri, options)
    .then(() => {
        console.log('SUCCESS: Handshake complete. Connected to MongoDB Atlas.');
        console.log('Connection State:', mongoose.connection.readyState);
        process.exit(0);
    })
    .catch(err => {
        console.error('\nFAILURE: Connection Failed');
        console.error('Error Name:', err.name);
        console.error('Error Message:', err.message);

        if (err.name === 'MongooseServerSelectionError') {
            console.log('\nPossible causes:');
            console.log('1. IP NOT WHITELISTED: Even if it shows "Active", double-check if your current public IP matches 180.151.16.203.');
            console.log('2. CREDENTIALS: Verify if the username/password in the URI are correct and the user has "readWrite" permissions.');
            console.log('3. FIREWALL/PROXY: Your network might be blocking port 27017.');
        }
        process.exit(1);
    });
