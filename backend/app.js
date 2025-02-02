const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const pastPaperRoutes = require('./routes/pastPaperRoutes');
const topical = require('./routes/topicalRoutes');
const cors = require('cors');

const app = express();

app.use(express.json());

app.use(cors());

app.use('/api', authRoutes);
app.use('/api/past-papers', pastPaperRoutes);
app.use('/api/topical', topical);

module.exports = app;