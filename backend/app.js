const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const pastPaperRoutes = require('./routes/pastPaperRoutes');
const cors = require('cors');

const app = express();

app.use(express.json());

app.use(cors());

app.use('/api', authRoutes);
app.use('/api/past-papers', pastPaperRoutes);

module.exports = app;