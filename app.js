require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const admin = require('./firebaseAdmin');

const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://trafy-websiteclone-865611889264.us-central1.run.app',
    'https://trafy-blogclone-865611889264.us-central1.run.app',
    'https://trafy.ai',
    'https://blog.trafy.ai',
    'https://trafy-newbackend-255821839155.us-central1.run.app',
    'https://trafy-newbackend.vercel.app', 
    'https://script.google.com/macros/s/AKfycbz1SFjut9u2HtS3B2NAvBjdlegBgMH5yauwav-qkc4mqeutq4Tn31y4g09nmCv6P1JAEg/exec',
];

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};

app.use(cors(corsOptions));

// ✅ Improve OPTIONS Handling
app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.sendStatus(204);
});

app.use(cookieParser());
app.use(express.json());

// Routes
app.use('/api', require('./routes/mailRoute'));

// Middleware to verify session cookies - Make this optional for endpoints that don't need auth
app.use('/protected/*', async (req, res, next) => {
    const sessionCookie = req.cookies.session || '';
    try {
        const decodedClaims = await admin.auth().verifySessionCookie(sessionCookie, true);
        req.user = decodedClaims;
        next();
    } catch (error) {
        res.status(401).send('Unauthorized');
    }
}); 

// Only start the server if this file is run directly (local dev)
// In production, server.js will start it
if (require.main === module) {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server running locally on port ${PORT}`);
    });
}

// Export app for server.js (and tests if needed)
module.exports = app;
