const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Import routes
const authRoutes = require('./routes/authRoutes');
const dealRoutes = require('./routes/dealRoutes');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/deals', dealRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(5000, () => console.log('Server running on port 5000'));
    })
    .catch(err => console.error('Mongo error:', err));
